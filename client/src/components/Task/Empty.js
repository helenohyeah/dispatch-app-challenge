import Button from './Button';

export default function Empty(props) {
  return (
    <Button
      onClick={props.onCreate}
    >
      Create New Task
    </Button>
  );
}