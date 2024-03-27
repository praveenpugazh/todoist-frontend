import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import axios from 'axios'
import { CardComp } from './components/ui/CardComp'

function App() {
  const [todo, setTodo] = useState({
    todo: '',
    completed: false
  })
  const [todos, setTodos] = useState([])
  const getTodos = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/todos')
      setTodos(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getTodos()
  }, [])
  const { toast } = useToast()
  const submitTodo = async () => {
    try {
      const { data } = await axios.post('http://localhost:8000/api/todos', todo)
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Added todo successfully'
      })
      setTodos([...todos, data])
      setTodo({
        todo: '',
        completed: false
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Failed to add todo'
      })
      console.log(error)
    }
  }
  return (
    <>
      <h1 className='text-2xl font-bold text-center py-5 bg-slate-100'>
        Todoist!
      </h1>
      <div className='w-[450px] m-auto my-10 flex justify-between items-center space-x-2'>
        <Input
          type='text'
          placeholder='Todo'
          value={todo.todo}
          onChange={(e) => setTodo({ ...todo, todo: e.target.value })}
        />
        <Button type='submit' onClick={submitTodo}>
          Add Todo
        </Button>
        <Toaster />
      </div>
      <div className='w-[450px] m-auto my-10'>
        <CardComp todos={todos} setTodos={setTodos} />
      </div>
    </>
  )
}

export default App

