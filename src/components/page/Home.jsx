import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { Toaster } from '@/components/ui/toaster'
import axios from 'axios'
import { CardComp } from '../ui/CardComp'
import { API_URL } from '../../lib/constants'
import { useNavigate } from 'react-router-dom'
import { SkeletonCard } from '../ui/SkeletonCard'
import { ButtonLoading } from '../ui/ButtonWithLoading'

function Home() {
  const [todo, setTodo] = useState({
    todo: '',
    completed: false
  })
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const navigate = useNavigate()

  const authToken = localStorage.getItem('auth')
  useEffect(() => {
    if (!authToken) {
      navigate('/login')
    }
  }, [authToken, navigate])

  const getTodos = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${API_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      setTodos(data)
      setLoading(false)
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
      setButtonLoading(true)
      const { data } = await axios.post(`${API_URL}/todos`, todo, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
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
      setButtonLoading(false)
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
      <div className='text-2xl font-bold text-center p-5 bg-slate-100 flex justify-between'>
        <h1>Todoist!</h1>
        <Button
          onClick={() => {
            localStorage.removeItem('auth')
            navigate('/login')
          }}
        >
          Logout
        </Button>
      </div>
      <div className='w-[380px] md:w-[450px] m-auto my-10 flex justify-between items-center space-x-2'>
        <Input
          type='text'
          placeholder='Todo'
          value={todo.todo}
          onChange={(e) => setTodo({ ...todo, todo: e.target.value })}
        />
        {!buttonLoading ? (
          <Button type='submit' onClick={submitTodo}>
            Add Todo
          </Button>
        ) : (
          <ButtonLoading />
        )}
        <Toaster />
      </div>
      <div className='w-[380px] md:w-[450px] m-auto my-10'>
        {loading ? (
          <SkeletonCard />
        ) : (
          <CardComp todos={todos} setTodos={setTodos} />
        )}
      </div>
    </>
  )
}

export default Home

