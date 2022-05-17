// get post
//query post

const User=require("../models/user")
const Thread= require("../models/thread")
const Follows= require("../models/follower")
const Post=require("../models/post")

const Comment=require("../models/comment")
const router = require("express").Router()

//crud
// create a post
router.post('/createpost',async (req,res)=>{
    try{
        const thread=await Thread.findById(req.body.threadId)
        const prevPost= await Post.findById(req.body.prevPostId)
        
        
        const newPost= await new Post({
            body:req.body.postbody,
            creator_id:req.body.userId,
            thread_id:thread._id,
            create_at: new Date(),
            update_at:new Date(),
            

        })

        if(prevPost){
            if(!prevPost.nextpost_id)
            {
            prevPost.nextpost_id=newPost._id
            prevPost.save()
            }
            else res.status(400).send("Cant add post")

        }
        
        if(!thread.firstpost_id){
            thread.firstpost_id=newPost._id
        }
        await newPost.save()
        await thread.save()
        res.status(200).json(newPost)

    }catch(err){
        console.log(err)

    }
})
//get post comment
router.get('/:postId/getcomment',async (req,res)=>{
    try{
        const Comments= await Comment.find({post_id:req.params.postId})
        res.status(200).json(Comments)

    }catch(err){
        console.log(err)

    }
})
//create comment
router.post('/:postId/createcomment',async (req,res)=>{
    try{
        const comment= await new Comment({
            comment:req.body.commentbody,
            user_id: req.body.userId,
            post_id: req.params.postId,
            create_at: new Date(),
            update_at: new Date()
        })
        comment.save()
        res.status(200).json('comment saved')

    }catch(err){

    }
})
//delete comment

router.delete('/:commentId/deletecomment',async (req,res)=>{
    await Comment.findByIdAndDelete(req.params.commentId)
    res.send("delete successfully")
})

//get curr thread
router.get('/:postId/getthread',async (req,res)=>{
    try{
        const post=Post.findOne({_id:req.params.postId})
        const thread=Thread.findById(post.thread_id)
        res.status(200).json(thread)

    }catch(err){

    }
})

//get post
router.get('/:postId',async (req,res)=>{
    try{
        const curPost=await Post.findById(req.params.postId)
        res.status(200).json(curPost)


    }catch(err){

    }
})
// get posts
router.get('/getByThread/:threadId', async(req,res)=>{
    try{
        const posts = await Post.find( {thread_id: req.params.threadId})
        // TODO limmit of 20 post
        res.status(200).json(posts)

    }catch(err){
        console.log(err)
    }

})
// /posts/getposts
router.get('/getposts',async (req,res)=>{
    try{
        const postsid=req.body.post_ids 
        const arr=[]
        for( let i =0;i<postsid.length;i++)
        {
            let curPost=await Post.findById(postsid[i])
            arr.push(curPost)
        }
  
        res.status(200).json(arr)

    }catch(err){

    }

})
//get timeline posts
router.get('/timeline/:userId',async (req,res)=>{
    try{
        const currentUser = User.find({_id: req.params.userId})

        const posts=await Post.find({creator_id:req.params.userId})
        const followings = await Follows.find({sourceId: req.params.userId})


        const friendPosts = await Promise.all(
            followings.map((follows) => {
              return Post.find({ creator_id: follows.targetId });
            })
          );
        res.status(200).json(posts.concat(...friendPosts))


    }catch(err){

    }
})

//get user post

router.get('/getbyUsername/:username',async (req,res)=>{
    try{
        const user= await User.findOne({username: req.params.username})
        

        const posts=await Post.find({creator_id: user._id})
       
        res.status(200).json(posts)


    }catch(err){

    }
})


//delete post
// TODO: add vertification
function deletePost(post){
    const currPost=post
    
    for(let i=0;i<currPost.nextPost_idList.length;i++)
    {
        const posts = Post.findById(currPost.nextPost_idList[i])
        deletePost(posts) 

    }

    Post.findByIdAndDelete(post._id)

}

router.delete('/:post_id/delete',async(req,res)=>{
    try{
        const comments = await Comment.find({post_id:req.params.post_id})

        comments.forEach(async (element) => {
            await Comment.findByIdAndDelete(element._id)
            
        });

        await Post.findByIdAndDelete(req.params.post_id)     
        
        res.json("delete successful")
    }catch(err){
        console.log(err)
    }
})
module.exports = router