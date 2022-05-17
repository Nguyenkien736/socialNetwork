const router = require("express").Router()
const User=require("../models/user")
const Info= require("../models/info")
const Follower=require("../models/follower")




//CRUD
//update
router.put('/updateinfo', async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        const userinfo= await Info.findOne({user_id : user._id},async (err,info)=>{
            if(err) console.log(err)
            else{
                info.name = req.body.name
                info.dob = req.body.dob
                info.gender = req.body.gender
                info.phonenumber= req.body.phonenumber
                info.email = req.body.email
                await info.save()                        
            }
        }
        ).clone().catch(function(err){ console.log(err)})
        

        res.send("update successful")

    }catch(err){
        console.log(err)
    }
})
router.get('/admin/getAllUser',async(req,res)=>{
    const users = await User.find({})
    res.status(200).json(users)

})
router.post('/updateprofilepic',async (req,res)=>{
    try{
        const user = await User.findById(req.body.userId)
        user.profile_picture = req.body.profilepic
        await user.save()
        res.status(200).json('sucess')

    }catch(err){
        console.log(err)
    }
})



router.post('/updatecoverphoto',async (req,res)=>{
    try{
        const user = await User.findById(req.body.userId)
        user.cover_photo = req.body.coverphoto
        await user.save()
        res.status(200).json('success')

    }catch(err){
        console.log(err)
    }
})
//delete

router.post("/:id/deleteUser", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });

//get user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, update_at, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get user info
router.get("/:userId/info",async (req,res)=>{
    const userId=req.params.userId
    try{
        const userInfo= await Info.findOne({user_id:userId})
        res.status(200).json(userInfo)
    }catch(err) {
        res.status(500).json(err)
    }
})


//get user friends

//get user follower
router.get('/:id/getfollower',async (req,res)=>{
    try{
        const followerList = await Follower.find({sourceId: req.params.id})
        res.json(followerList)
    }catch(err) {

    }
})
// check if follow
router.get("/:username/checkfollow/:sourceId",async (req,res)=>{
    try {
        const user = await User.findOne({username:req.params.username})
        const follow = await Follower.findOne({sourceId:req.params.sourceId,targetId:user._id })

        if(follow)
        res.json(true)
        else res.json(false)
       
    }catch(err){
        console.log(err)
    }
})

//get user following
router.get('/:id/getfollowing',async (req,res)=>{
    try{
        const followinglist=await Follower.find({targetId:req.params.id})
        res.json(followinglist)

    }catch(err){
        console.log(err)
    }
})
//follow
router.put('/:username/follow',async (req,res)=>{
    try{
        const user = await User.findOne({username:req.params.username})
        const follow= await new Follower({
            sourceId:req.body.userId,
            targetId:user._id,
            create_at: new Date(),
            update_at: new Date()
            
        })
        await follow.save()
        res.status(200).json("followed")

    }catch(err){
        console.log(err)

    }


})

//unfollow
router.put('/:username/unfollow',async (req,res)=>{
    try{
        const user = await User.findOne({username:req.params.username})
        await Follower.findOneAndDelete({sourceId:req.body.userId, targetId:user._id})
        res.status(200).json("unfollowed")
    }catch(err){
        console.log(err)

    }



})


module.exports = router