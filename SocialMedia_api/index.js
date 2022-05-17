const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const helmet=require("helmet")
const morgan=require("morgan")
const UserRoutes=require("../SocialMedia_api/routes/users")
const fs = require('fs')
const { promisify } = require('util')


const AuthRoutes=require("./routes/auth")
const ThreadRoutes=require("./routes/threads")
const PostRoutes=require("./routes/posts")
const GroupRoutes=require("./routes/groups")

const path = require('path')
const multer = require('multer')
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()


dotenv.config()

const app=express()
mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
       })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));


 app.use("/images", express.static(path.join(__dirname, "public/images")));

 const unlinkAsync = promisify(fs.unlink)

 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
  app.post("/api/deletepic",jsonParser,async (req,res)=>{
      
     await unlinkAsync('public/images/'+req.body.picname)
     res.status(200).json("delete file successfully")
      
      
  })
  
  
//middle ware





app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use('/api/users',UserRoutes)
app.use('/api/auth',AuthRoutes)
app.use('/api/threads',ThreadRoutes)
app.use('/api/posts',PostRoutes)
app.use('/api/groups',GroupRoutes)





app.listen(8800,()=>{
    console.log("server is running")
})