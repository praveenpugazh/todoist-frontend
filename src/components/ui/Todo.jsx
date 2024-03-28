import { Alert, AlertTitle } from '@/components/ui/alert'
import { Toggle } from '@/components/ui/toggle'
import { API_URL } from '@/lib/constants'
import { CheckIcon, TrashIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const Todo = ({ todo, todos, setTodos }) => {
  const authToken = localStorage.getItem('auth')

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const completeTodo = async (todoId, completed) => {
    const { data } = await axios.put(
      `${API_URL}/todo/${todoId}`,
      {
        completed: completed
      },
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    console.log(data)
    const updatedTodos = todos.map((todo) =>
      todo._id === data._id ? data : todo
    )
    console.log(updatedTodos)
    setTodos(updatedTodos)
  }
  const deleteTodo = async (todoId) => {
    await axios.delete(`${API_URL}/todo/${todoId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    const updatedTodos = todos.filter((todo) => todo._id !== todoId)
    setTodos(updatedTodos)
    setIsVisible(false)
  }
  const [isVisible, setIsVisible] = useState(true)
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{
            duration: 1.5
          }}
        >
          <Alert className={`my-2`}>
            <div className='my-2 flex justify-between items-center'>
              <AlertTitle
                className={`${todo.completed ? 'text-slate-500/30' : ''} my-2`}
              >
                {capitalizeFirstLetter(todo.todo)}
              </AlertTitle>
              <div>
                <Toggle
                  className={`${
                    todo.completed ? 'bg-green-400/90' : 'hover:bg-green-400/90'
                  } data-[state=${
                    todo.completed ? 'on' : 'off'
                  }]:bg-green-400  mx-1 border border-black/10`}
                  onClick={() => completeTodo(todo._id, !todo.completed)}
                >
                  <CheckIcon />
                </Toggle>
                <Toggle
                  className='data-[state=off]:bg-red-400 border border-black/10'
                  onClick={() => deleteTodo(todo._id)}
                >
                  <TrashIcon />
                </Toggle>
              </div>
            </div>
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Todo

