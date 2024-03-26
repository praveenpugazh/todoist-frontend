import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Todo from './Todo'

export function CardComp() {
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
  return (
    <Card className='w-[400px]'>
      <CardHeader>
        <CardTitle>Your Todo</CardTitle>
        <CardDescription>Please find your todo&apos;s below</CardDescription>
      </CardHeader>
      <CardContent>
        {todos.map((todo) => (
          <Todo key={todo._id} todo={todo} />
        ))}
      </CardContent>
    </Card>
  )
}

