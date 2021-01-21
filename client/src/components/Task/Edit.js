import useTask from '../../hooks/useTask';

export default function Edit(props) {

  const { task, handleTaskChange } = useTask(props.task);
  
  return (
    <>
      <h2>Edit Task</h2>
      <form onSubmit={e => e.preventDefault()}>
        <label>Start Latitude:</label>
        <input 
          type='text'
          name='start-lat'
          value={task.start.lat || ''}
          onChange={e => handleTaskChange(e)}
        ></input>
        <label>Start Longitude:</label>
        <input 
          type='text'
          name='start-lng'
          value={task.start.lng || ''}
          onChange={e => handleTaskChange(e)}
        ></input>
        <br />
        <label>End Latitude:</label>
        <input 
          type='text'
          name='end-lat'
          value={task.end.lat || ''}
          onChange={e => handleTaskChange(e)}
        ></input>
        <label>End Longitude:</label>
        <input 
          type='text'
          name='end-lng'
          value={task.end.lng || ''}
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
        >Save Changes</button>
      </form>
    </>
  );
}