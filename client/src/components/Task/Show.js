import Button from './Button';

export default function Show(props) {
  const { task } = props;

  return (
    <>
      <p>Start: {task.startLat}, {task.startLng} End: {task.endLat}, {task.endLng}</p>
      <p>Freight: {task.freight}</p>
      <Button>Map</Button>
      <Button onClick={props.onEdit}>Edit</Button>
    </>
  );
}