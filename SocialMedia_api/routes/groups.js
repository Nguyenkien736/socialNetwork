// query group info

const router=require("express").Router()
const Info=require("../models/info")
const User = require("../models/user")
const bcrypt=require("bcrypt")
const Follower=require("../models/follower")
const Group = require('../models/group')
const GroupMember = require('../models/groupmember')
const Grouprequestmember = require('../models/grouprequestmember')
const GroupThread= require('../models/groupthreads')
const Thread = require('../models/thread')
const { route } = require("./users")

// create group
router.post("/creategroup",async (req,res)=>{
    try{
        const createdTime = new Date()
        const newGroup =await new Group({
            created_by: req.body.userId,
            tittle: req.body.tittle,
            create_at: createdTime

        })
        await newGroup.save()
       // const group = await Group.findOne({created_by:req.body.userId,create_at: createdTime})
        const newGroupmember = new GroupMember({
            group_Id:newGroup._id,
            User_Id: req.body.userId,
            Role: 'admin'

        }) 
        await newGroupmember.save()
        
        res.status(200).json(newGroup)

    }catch(err){
        console.log(err)
    }
    
})
// get groups by user 
router.get('/:userId/getUserGroups',async(req,res)=>{
    try{
        const groups = await GroupMember.find({User_Id: req.params.userId})
        res.status(200).json(groups)

    }catch(err)
    {
        console.log(err)
    }
})
//get groups by name
router.get('/getbyname/:groupname',async (req,res)=>{
    try{
        const groups =await Group.find({tittle: req.params.groupname})
        res.status(200).json(groups)

    }catch(err){

    }

})
// get group by id

router.get('/:group_id',async (req,res)=>{
    try{
        const group = await Group.findById(req.params.group_id)
        res.status(200).json(group)

    }catch(err){
        console.log(err)
    }
    
})

//get role 
router.get('/:group_id/getRole/:user_id',async (req,res)=>{
    try{
        const groupmem = await GroupMember.findOne({group_Id:req.params.group_id,User_Id:req.params.user_id})
        if(groupmem)
        {
            res.status(200).json(groupmem.Role)
        }
        else {
            res.status(200).json('guest')
        }

    }catch(err){

    }
})

// get threads
router.get('/:groupId/getthreads',async (req,res)=>{
    try{
        const groupThreads = await GroupThread.find({group_Id:req.params.groupId})
        res.status(200).json(groupThreads)

    }catch(err){

    }

})

// get member

router.get('/:groupId/getmembers',async (req,res)=>{
    try{
        const groupmembers = await GroupMember.find({group_Id:req.params.groupId})
        res.status(200).json(groupmembers)      
    }catch(err){
        console.log(err)
    }
})


// add member

router.post('/:groupId/addmember',async (req,res)=>{
    try{
        const grouprequest = await Grouprequestmember.findOne({group_Id:req.params.groupId,User_Id:req.body.userId})
        if(grouprequest){
            const member = new GroupMember({
                group_Id: grouprequest.group_Id,
                User_Id: grouprequest.User_Id,
                Role: 'member'
            })
            await member.save()
            res.status(200).json(member)
            Grouprequestmember.findByIdAndDelete(grouprequest._id)
        }
        else res.status.json('not request yet')
        
    }catch(err){
        console.log(err)

    }
})



// delete member
router.post('/:groupId/deletemember',async (req,res)=>{
    await GroupMember.findOneAndDelete({group_Id:req.params.groupId,User_Id:req.body.userId})
    res.status(200).json("delete succesfully")
})


// get requests

router.get('/:groupId/getrequestmembers',async (req,res)=>{
    try{
        const groupmembers = await Grouprequestmember.find({group_Id:req.params.groupId})
        res.status(200).json(groupmembers)      
    }catch(err){
        console.log(err)
    }
})


// add request

router.post('/:groupId/addrequestmember',async (req,res)=>{
    try{
       
            const member = new Grouprequestmember({
                group_Id: req.params.groupId,
                User_Id: req.body.userId 
            })
           await member.save()
           res.status(200).json('request successfully')
       
        
    }catch(err){
        console.log(err)

    }
})


// delete request

router.post('/:groupId/deleterequestmember',async (req,res)=>{
    await Grouprequestmember.findOneAndDelete({group_Id:req.params.groupId,User_Id:req.body.userId})
    res.status(200).json("delete succesfully")
})



// add  thread in group

router.post('/:groupId/addthreadtogroup',async (req,res)=>{
    try{
        const newThread = new Thread({
            creator_id: req.body.userId,
            tittle: req.body.tittle,
            create_at: new Date(),
            update_at: new Date()
        })
        await newThread.save()
        const newGroupThread = new GroupThread({
            group_Id: req.params.groupId,
            thread_id: newThread._id
        })
        newGroupThread.save()
        res.status(200).json('added thread')

    }catch(err){

    }

})



// delete group


module.exports = router