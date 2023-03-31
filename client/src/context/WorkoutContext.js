import React, {createContext} from "react"

export const WorkoutContext=createContext()

export const workoutReducer=(state,action)=>{
    switch(action.type){
        case 'SET_WORKOUTS':
            return{
                workouts:action.payload
            }
        case 'CREATE_WORKOUTS':
            return{
                workouts:[...state.workouts,action.payload]
            }
        case 'DELETE_WORKOUTS':
            return{
                workouts: state.workouts.filter((w)=>w._id!==action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutContextProvider=({children})=>{

    const[state,dispatch]=React.useReducer(workoutReducer,{
        workouts:null
    })


    return(
        <WorkoutContext.Provider value={{...state,dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}