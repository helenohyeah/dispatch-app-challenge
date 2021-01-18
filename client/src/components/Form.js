export default function Form() {
  return (
    <>
      <h2>Create New Task</h2>
      <form>
        <label htmlFor="start-loc">Start Location:</label>
        <input type="text" name="start-loc"></input>
        <label htmlFor="end-loc">End Location:</label>
        <input type="text" name="end-loc"></input>
        <label htmlFor="freight">Freight Description:</label>
        <input type="text" name="freight"></input>
        <input type="submit" value="Create"></input>
      </form>
    </>
  );
}