import React, { useEffect } from 'react';
import axios from 'axios';
import { WORKOUTS_URL } from './url';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { toast, Toaster } from 'react-hot-toast';

function WorkoutForm() {
  const [title, setTitle] = React.useState('');
  const [reps, setReps] = React.useState('');
  const [load, setLoad] = React.useState('');
  const [error, setError] = React.useState(null);
  const { dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(WORKOUTS_URL);
        dispatch({ type: 'SET_WORKOUTS', payload: response.data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const toggle = async (e) => {
    e.preventDefault();
    const Workout = { title, reps, load };
    try {
      const response = await axios.post(WORKOUTS_URL, Workout);
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
      dispatch({type:'CREATE_WORKOUT',payload:response.data})
      toast.success('Created',{
        style:{
          padding:"18px",
          fontSize:"15px"
        }
      })

    } catch (error) {
      setError("Fill all the fields");
    }
  };
  

  return (
    <form className="create" onSubmit={toggle}>
      <div>
          <Toaster
            position="top-left"
            reverseOrder={false}
          />
      </div>
      <h2 className='form-tit'>Create your Workout</h2>
      <label>Workout Name : </label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
      <label>No. Reps : </label>
      <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} />
      <label>Loads (KG) : </label>
      <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} />
      <button className='form-btn'>Create</button>
      {error && <div className='form-err'>{error}</div>}
    </form>
  );
}

export default WorkoutForm;
