const User=require("../models/user")
const Thread= require("../models/thread")
const Post=require("../models/post")

const router = require("express").Router()
const Comment = require("../models/comment")
const SavedThread = require("../models/saved_thread")
const GroupThread = require('../models/groupthreads')
// get thread

// query thread

//crud
// create a thread
router.post('/createthread',async (req,res)=>{
    try{
        const newThread= await new Thread({
            creator_id:req.body.userId,
            tittle:req.body.tittle,
            create_at: new Date(),
            update_at:new Date()

        })
        await newThread.save()
        res.status(200).json(newThread)

    }catch(err){
        console.log(err)

    }
})
router.get('/getThread',async (req,res)=>{

    try {
        const thread = Thread.findById(req.body.threadId)
        res.status(200).json(threadId)

        
    } catch (error) {
        console.log(error)
    }
})
// get thread by id
router.get('/:threadId',async (req,res)=>{
    try{
        const thread = await Thread.findById(req.params.threadId)
        res.status(200).json(thread)

    }catch(err)
    {
        console.log(err)
    }
})
// get all user Thread
router.get('/:userId/getallthread',async (req,res)=>{
    try{
        const threadList=await Thread.find({creator_id:req.params.userId})
        
        res.status(200).json(threadList)

    }catch(err)

    {
        console.log(err)
    }
})
//delete thread


router.delete('/:thread_id/delete',async(req,res)=>{
    try{
       
        const posts = await Post.find({thread_id:req.params.thread_id})
        const savedthreads = await SavedThread.find({thread_id:req.params.thread_id})
        const groupthreads =await GroupThread.find({thread_id:req.params.thread_id})
        groupthreads.forEach(async(element)=>{
            await GroupThread.findByIdAndDelete(element._id)
        })
        savedthreads.forEach(async(element)=>{
            await SavedThread.findByIdAndDelete(element._id)

        }
        )
        posts.forEach( async (element) => {
            const comments = await Comment.find({post_id:element._id})

            comments.forEach(async (ele) => {
                await Comment.findByIdAndDelete(ele._id)
                
            });
    
            await Post.findByIdAndDelete(element._id)   
        });
        
        
        await Thread.findByIdAndDelete(req.params.thread_id)
        res.status(200).json('delete')

    }catch(err){
        console.log(err)
    }
})
// saved thread
router.post('/:thread_Id/savethread',async (req,res)=>{

    const savedthr = await SavedThread.findOne({
        user_id: req.body.userId,
        thread_id: req.params.thread_Id
    })
    const newSavedThread = await new SavedThread({
        user_id: req.body.userId,
        thread_id: req.params.thread_Id,
        create_at: new Date()

    })
    if(savedthr) res.status(200).json('already saved')
    else{
        await newSavedThread.save()
        res.status(200).json('saved')

    }
    

})
// get saved thread
router.get('/:id/getsavedthread',async (req,res)=>{
    try{
    const savedThreads = await SavedThread.find({user_id: req.params.id})
   res.status(200).json(savedThreads)
    }catch(err){
        console.log(err)
    }
    
})
//check saved thread
router.get('/:threadId/checksaved/:userId',async (req,res)=>{
    const savedThread = await SavedThread.findOne({thread_id:req.params.threadId,user_id:req.params.userId})

    if(savedThread) {
        res.status(200).json(true)
    }else res.status(200).json(false)
})
// unsaved thread
router.post('/:thread_id/unsavethread',async (req,res)=>{
    await SavedThread.findOneAndDelete({user_id:req.body.userId, thread_id:req.params.thread_id})
    res.status(200).json('unsaved')
})
module.exports = router

//

