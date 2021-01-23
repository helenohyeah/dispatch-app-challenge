import Button from "../Button";

export default function Show(props) {
  // console.log('Show props:', props);
  const task = props.task;

  return (
    <>
      <p>
        Start: {task.start.lat}, {task.start.lng} End: {task.end.lat},{" "}
        {task.end.lng}
      </p>
      <p>Freight: {task.freight}</p>
      {props.canEdit && (
        <>
          <Button onClick={props.onEdit}>Edit</Button>
          <Button onClick={() => props.onDelete(task.id)}>Delete</Button>
        </>
      )}
    </>
  );
}
