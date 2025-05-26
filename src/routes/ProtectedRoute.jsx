import {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../context/authContext'

const ProtectedRoute = ({children, allowedRoles}) => {
  const {token, role} = useContext(authContext)

  // If no token, redirect to login
  if (!token) {
    return <Navigate to='/login' replace={true} />
  }

  // If token exists but role is not allowed, redirect to home
  if (!allowedRoles.includes(role)) {
    return <Navigate to='/home' replace={true} />
  }

  // If token exists and role is allowed, render the protected content
  return children
}

export default ProtectedRoute