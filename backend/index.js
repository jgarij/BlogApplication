const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
//const bodyParser = require("body-parser")
require('dotenv').config({path: '.env'});

const port = process.env.PORT || 5000
 const DB = "mongodb://127.0.0.1:27017/BlogApp";


console.log("string",DB)
const app = express();
//var ObjectId = require('mongodb').ObjectID;
app.use(cors())


//app.use(bodyParser.urlencoded({ extended: true }));
//mongoose.connect(("mongodb://localhost:27017/blog-app-new"+"-replicaSet=rs")
mongoose.connect(DB).then(()=> console.log("MongoDB connected")).catch((err)=> console.log(err))

app.use(express.json())

app.get('/', (req, res) => {
    res.json("Server Heroku started")
})



const userRouter = require('./routes/User.route')
app.use('/api/user',userRouter)

const blogRouter = require('./routes/Blog.route')
app.use('/api/blog',blogRouter)

const CommentRouter = require("./routes/Comment.route")
app.use("/api/comment",CommentRouter)

app.listen(port, () => {
    console.log("Server Started at Port " + port)
})