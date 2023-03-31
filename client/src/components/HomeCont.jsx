import React from 'react';
import axios from 'axios';
import { WORKOUTS_URL } from './url';
import {useWorkoutContext} from "../hooks/useWorkoutContext"
import {RiDeleteBin2Line} from "react-icons/ri"
import { toast, Toaster } from 'react-hot-toast';
import formatDistanceToNow from "date-fns/formatDistanceToNow"

function HomeCont() {
  const {workouts,dispatch}=useWorkoutContext()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(WORKOUTS_URL);
        const json = res.data;
        if (res.status === 200) {
          dispatch({type:'SET_WORKOUTS',payload:json})
        }
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, [workouts]); 

  const handleClick = async (id) => {
    try {
      const response = await axios.delete(`${WORKOUTS_URL}/${id}`);
      const json = response.data;
      if (response.status === 200) {
        dispatch({ type: 'DELETE_WORKOUT', payload: json });
        toast.error('Deleted',{
          style:{
            padding:"18px",
            fontSize:"15px"
          }
        })
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  

  return (
    <div className="workouts">
      <div>
          <Toaster
            position="top-left"
            reverseOrder={false}
          />
      </div>
      {workouts &&
        workouts.map((props) => (
          <div className='cont-wrap'>
            <div className="cont" key={props._id}>
              <h2 className='prevent-select'>{props.title}</h2>
              <h4 className='prevent-select'>Number of Reps: <span className='cont-in prevent-select'>{props.reps}</span></h4>
              <h4 className="cont-h4 prevent-select">Loads in KG: <span className='cont-in prevent-select'>{props.load}</span></h4>
              <p className='cont-time prevent-select'>{formatDistanceToNow(new Date(props.createdAt), {addSuffix : true})}</p>
            </div>
            <span onClick={() => handleClick(props._id)}><RiDeleteBin2Line className="cont-del"/></span>
          </div>
        ))}
    </div>
  );
}

export default HomeCont;
