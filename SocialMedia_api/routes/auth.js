const router=require("express").Router()
const Info=require("../models/info")
const User = require("../models/user")
const bcrypt=require("bcrypt")
const Follower=require("../models/follower")
const { route } = require("./users")

router.get('/',(req,res)=>{
    res.send('welcome to authentication')
})
router.post('/register',async (req,res)=>{
    
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(req.body.password,salt)
        const newUser= await new User({
            username: req.body.username,
            password: hashedPassword,
            create_at: new Date(),
            update_at: new Date()
        })
        const newUserInfo= await new Info({
            user_id: newUser._id

        })
        const newUserFollower = new Follower({
            

        })
        await newUserInfo.save()
        const user = await newUser.save()
        res.status(200).json(user)

    }catch(err){
        console.log(err)
        
    }
    
    



})

//LOGIN


router.post('/login',async (req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username})                        //query from database await required
        !user && res.status(404).json("User not found")
        const validPassword=await bcrypt.compare(req.body.password,user.password)   // everything in bcrypt is await
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)


    }catch(err)
    {
        console.log(err)
    }
})

module.exports = router