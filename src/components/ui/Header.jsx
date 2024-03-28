import { Button } from '@/components/ui/button'
import UserContext from '../../context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { userData, logoutUser } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <div className='text-2xl font-bold text-center p-5 bg-slate-100 flex justify-between'>
      <h1>Todoist!</h1>
      <div className='flex space-x-4'>
        <p>Hello {userData.username}</p>
        <Button
          onClick={() => {
            logoutUser()
            navigate('/login')
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Header

