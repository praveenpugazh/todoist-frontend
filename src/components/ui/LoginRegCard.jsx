import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { API_URL } from '@/lib/constants'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'

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
  const { toast } = useToast()

  const loginHandler = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/user/login`, {
        email: postData.email,
        password: postData.password
      })
      localStorage.setItem('auth', data.accessToken)
      setIsLoggedIn(true)

      toast({
        variant: 'success',
        title: 'Success',
        description: 'Login successful'
      })
    } catch (error) {
      console.log(error)
      setPostData({
        ...postData,
        password: ''
      })
      toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Login failed, Please try again'
      })
    }
  }
  const registerHandler = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/user/register`, postData)
      toast({
        variant: 'success',
        title: 'Success',
        description: 'Login successful'
      })
      console.log(data)
      navigate('/login')
    } catch (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: 'Failed',
        description: 'Register unsuccessful'
      })
    }
  }
  return (
    <>
      <Card className='w-[380px] md:w-[500px]'>
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
              onChange={(e) =>
                setPostData({ ...postData, name: e.target.value })
              }
            />
          ) : (
            <></>
          )}
          <Input
            type='email'
            placeholder='Email'
            onChange={(e) =>
              setPostData({ ...postData, email: e.target.value })
            }
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

        <CardFooter>
          {action !== 'register' ? (
            <p>
              Don&apos;t have an account?{' '}
              <a onClick={() => navigate('/register')}>Register</a>
            </p>
          ) : (
            <p>
              Have an account already?{' '}
              <a onClick={() => navigate('/register')}>Login</a>
            </p>
          )}
        </CardFooter>
      </Card>
      <Toaster />
    </>
  )
}

