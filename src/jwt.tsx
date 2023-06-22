import React, { useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Button } from './component-library/Button/Button'

export default function JWTComponent() {
  const [token, setToken] = useState('')
  const [protectedData, setProtectedData] = useState('')

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', {
        username: 'mike',
        password: 'password',
      })
      const { token } = response.data
      setToken(token)
    } catch (error) {
      console.error(error)
    }
  }

  const handleGetProtectedData = async () => {
    try {
      const response = await axios.get('/protected', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const { message } = response.data
      setProtectedData(message)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    setToken('')
    setProtectedData('')
  }

  const decodedToken = token ? jwt_decode(token) : null

  return (
    <div className="App">
      {token ? (
        <div>
          <p>Welcome, {JSON.stringify(decodedToken)}!</p>
          <p>Protected Data: {protectedData}</p>
          <Button onClick={handleGetProtectedData}>Get Protected Data</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <Button onClick={handleLogin}>Login</Button>
      )}
    </div>
  )
}
