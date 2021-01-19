import Button from './Button';

export default function Empty(props) {
  return (
    <Button
      onClick={props.onAddNew}
    >
      Create New Task
    </Button>
  );
}