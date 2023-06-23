import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Button } from '../component-library/Button/Button'
import { InputBase, Stack, Text, Space, Card, Container } from '@mantine/core'

export default function JWTComponent() {
  const [protectedData, setProtectedData] = useState({} as any)
  const [username, setUsername] = useState('')
  const [token, setToken] = useState('')

  // localstorage
  useEffect(() => {
    if (token === '') return
    localStorage.setItem('token', JSON.stringify(token))
  }, [token])

  useEffect(() => {
    const lsToken = JSON.parse(localStorage.getItem('token') as any)
    if (lsToken) {
      setToken(lsToken)
    }
  }, [])

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', {
        username,
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
      setProtectedData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    setProtectedData({})
  }

  const decodedToken: any = token ? jwt_decode(token) : null

  return (
    <Container size="xs" p="xs">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {token ? (
          <>
            <Text fz="lg" fw="bold">
              Welcome, {decodedToken.username}!
            </Text>
            {Object.keys(protectedData).length > 0 && (
              <>
                <Text fz="md">Protected Data:</Text>
                <Text fs="italic">{protectedData.message}</Text>
                <Text fz="sm">Requested at: {protectedData.time}</Text>
              </>
            )}
            <Space h="md" />
            <Stack>
              <Button onClick={handleGetProtectedData}>
                Get Protected Data
              </Button>
              <Button variant="secondary" color="red.5" onClick={handleLogout}>
                Logout
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <Text fz="lg">Please login to view protected data!</Text>
            <Space h="md" />
            <Stack>
              <InputBase
                onChange={(e) => setUsername(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin()
                  }
                }}
                placeholder="Enter your name"
              />
              <Button disabled={username === ''} onClick={handleLogin}>
                Login
              </Button>
            </Stack>
          </>
        )}
      </Card>
    </Container>
  )
}
