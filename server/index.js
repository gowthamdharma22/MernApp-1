require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const workoutRouter=require("./routes/workouts")
const cors=require('cors')
//express
const app=express()

//middleware
app.use(express.json())
app.use(cors())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

//api
app.use("/api/workouts",workoutRouter)

//connect mongodb
mongoose.connect(process.env.MON_URL)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("Server is running in",process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error);
    })

