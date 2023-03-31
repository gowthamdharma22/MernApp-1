const express=require('express')
const { model } = require('mongoose')
const {create,getWorkouts,getSingle,workoutDelete,workoutUpdate}=require("../controllers/workoutController")

const router=express.Router()




router.get('/',getWorkouts)

router.post('/',create)

router.delete('/:id',workoutDelete)

router.get('/:id',getSingle)

router.patch('/:id',workoutUpdate)

module.exports=router