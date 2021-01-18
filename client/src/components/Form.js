export default function Form() {
  const url = 'http://localhost:8080/api/tasks';
  return (
    <>
      <h2>Create New Task</h2>
      <form action={url} method='POST'>
        <label htmlFor='start'>Start Location:</label>
        <input type='text' name='start'></input>
        <label htmlFor='end'>End Location:</label>
        <input type='text' name='end'></input>
        <label htmlFor='freight'>Freight Description:</label>
        <input type='text' name='freight'></input>
        <input type='submit' value='Create'></input>
      </form>
    </>
  );
}