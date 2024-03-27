import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { API_URL } from '@/lib/constants'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
export function LoginRegCard({ action }) {
  const [postData, setPostData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const authToken = localStorage.getItem('auth')

    if (authToken) {
      setIsLoggedIn(true)
    }
    if (isLoggedIn) {
      console.log('logged in')
      navigate('/')
    }
  }, [isLoggedIn, navigate])
  const loginHandler = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/user/login`, {
        email: postData.email,
        password: postData.password
      })
      localStorage.setItem('auth', data.accessToken)
      setIsLoggedIn(true)
    } catch (error) {
      console.log(error)
    }
  }
  const registerHandler = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/user/register`, postData)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card className='w-[500px]'>
      <CardHeader>
        <CardTitle>{action === 'register' ? 'Register' : 'Login'}</CardTitle>
        <CardDescription>
          {action === 'register'
            ? 'Register below to continue'
            : 'Login below to continue'}
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col space-y-4'>
        {action === 'register' ? (
          <Input
            type='text'
            placeholder='Name'
            onChange={(e) => setPostData({ ...postData, name: e.target.value })}
          />
        ) : (
          <></>
        )}
        <Input
          type='email'
          placeholder='Email'
          onChange={(e) => setPostData({ ...postData, email: e.target.value })}
        />
        <Input
          type='password'
          placeholder='Password'
          onChange={(e) =>
            setPostData({ ...postData, password: e.target.value })
          }
        />
        <Button
          onClick={() => {
            console.log('clicked')
            action === 'register' ? registerHandler() : loginHandler()
          }}
        >
          {action === 'register' ? 'Register' : 'Login'}
        </Button>
      </CardContent>
    </Card>
  )
}

