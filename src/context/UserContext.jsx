import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const UserContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    authToken: '',
    isLoggedIn: false
  })

  const setUserLogin = (user) => {
    console.log('context fun called')
    console.log(user)
    setUserData({
      username: user.name,
      email: user.email,
      authToken: user.accessToken,
      isLoggedIn: true
    })
    localStorage.setItem('auth', user.accessToken)
  }

  const logoutUser = () => {
    setUserData({
      username: '',
      email: '',
      authToken: '',
      isLoggedIn: false
    })
    localStorage.removeItem('auth')
  }

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserLogin,
        logoutUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.prototype = {
  children: PropTypes.node
}

export default UserContext

