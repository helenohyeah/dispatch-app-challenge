import useTask from '../../hooks/useTask';

export default function AddTask(props) {

  const { task, handleTaskChange } = useTask({});
  console.log(task);

  return (
    <>
      <h2>Create Task</h2>
      <form onSubmit={e => e.preventDefault()}>
        <label>Start Latitude:</label>
        <input 
          type='number'
          name='start-lat'
          value={task.startLat || ''}
          onChange={e => handleTaskChange(e)}
        ></input>
        <label>Start Longitude:</label>
        <input 
          type='number'
          name='start-lng'
          value={task.startLng || ''}
          onChange={e => handleTaskChange(e)}
        ></input>
        <br />
        <label>End Latitude:</label>
        <input 
          type='number'
          name='end-lat'
          value={task.endLat || ''}
          onChange={e => handleTaskChange(e)}
        ></input>
        <label>End Longitude:</label>
        <input 
          type='number'
          name='end-lng'
          value={task.endLng || ''}
          onChange={e => handleTaskChange(e)}
        ></input>
        <br />
        <label>Freight Description:</label>
        <input 
          type='text'
          name='freight'
          value={task.freight || ''}
          onChange={e => handleTaskChange(e)}
        ></input>
        <button 
          onClick={() => props.onSave(task)}
        >Create</button>
      </form>
    </>
  );
}