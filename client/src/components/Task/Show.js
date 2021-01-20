import Button from './Button';

export default function Show(props) {
  // console.log('Show props:', props);
  const task = props.task;

  return (
    <>
      <p>Start: {task.startLat}, {task.startLng} End: {task.endLat}, {task.endLng}</p>
      <p>Freight: {task.freight}</p>
      <Button>View on Map(WIP)</Button>
      {/* <Button onClick={props.onEdit}>Edit</Button> */}
      {/* <Button onClick={() => props.onDelete(task.id)}>Delete</Button> */}
    </>
  );
}