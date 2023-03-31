const Workout=require('../models/workoutModel')
const mongoose=require('mongoose')

//get all
const getWorkouts=async(req,res)=>{
    const workouts=await Workout.find({}).sort({createdAt:-1})
    res.status(200).json(workouts)
}

//get single
const getSingle=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"404 not found"})
    }
    const workout=await Workout.findById(id)
    res.status(200).json(workout)
}

//post 
const create = async(req,res)=>{
    const {title,reps,load}=req.body
    try{
        const workout = await Workout.create({title,reps,load})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete

const workoutDelete=async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"404 not found"})
    }
    const workout=await Workout.findByIdAndDelete({_id:id})
    if(!workout){
        res.status(404).json({error:"404 not found"})
    }
    res.status(200).json(workout)
}

//Update

const workoutUpdate=async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"404 not found"})
    }
    const workout=await Workout.findByIdAndUpdate({_id:id},{
        ...req.body
    })
    res.status(200).json(workout)
}



module.exports={
    create,
    getWorkouts,
    getSingle,
    workoutDelete,
    workoutUpdate
}