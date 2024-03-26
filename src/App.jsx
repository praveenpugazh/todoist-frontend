import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import axios from 'axios'
import { CardComp } from './components/ui/CardComp'

function App() {
  const [todo, setTodo] = useState({
    todo: '',
    completed: false
  })
  const { toast } = useToast()
  const submitTodo = async () => {
    try {
      const data = await axios.post('http://localhost:8000/api/todos', todo)
      console.log(data)
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Added todo successfully'
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
      <h1 className='text-2xl font-bold text-center mt-5 mb-10'>Todoist!</h1>
      <div className='flex w-full max-w-sm items-center space-x-2 m-auto'>
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
      <div className='w-96 m-auto my-10'>
        <CardComp />
      </div>
    </>
  )
}

export default App

