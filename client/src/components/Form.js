import { useState } from 'react';

export default function Form(props) {

  const [task, setTask] = useState({});

  const handleSubmit = props.handleSubmit;
  const handleChange = (e, type) => {
    setTask(prev => {
      return { ...prev, [type]: e.target.value }
    });
  };
  
  return (
    <>
      <h2>Create New Task</h2>
      <form onSubmit={e => e.preventDefault()}>
        <label>Start Location:</label>
        <input 
          type='text'
          value={task.start || ''}
          onChange={e => handleChange(e, 'start')}
        ></input>
        <label>End Location:</label>
        <input 
          type='text' 
          value={task.end || ''}
          onChange={e => handleChange(e, 'end')}
        ></input>
        <label>Freight Description:</label>
        <input 
          type='text' 
          value={task.freight || ''}
          onChange={e => handleChange(e, 'freight')}
        ></input>
        <button 
          onClick={() => handleSubmit(task)}
        >Create</button>
      </form>
    </>
  );
}