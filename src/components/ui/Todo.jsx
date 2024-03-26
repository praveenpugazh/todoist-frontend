/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const Todo = ({ todo }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return (
    <div className='px-4 py-2 border border-black/20 my-0.5 rounded-md'>
      <p className='text-xl'>{capitalizeFirstLetter(todo.todo)}</p>
      <p>Completed: {todo.completed ? 'True' : 'False'}</p>
    </div>
  )
}

export default Todo

