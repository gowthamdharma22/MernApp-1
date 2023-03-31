import React from "react";
import { WorkoutContext } from "../context/WorkoutContext";

export const useWorkoutContext=()=>{
    const context=React.useContext(WorkoutContext)
    if(!context){
        throw Error('useWorkoutContext needs to be inside WorkoutConext.Provider')
    }
    return context
}