import React, { useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Button } from './component-library/Button/Button'
import { InputBase, Stack, Text, Space, Card, Container } from '@mantine/core'

export default function JWTComponent() {
  const [token, setToken] = useState('')
  const [protectedData, setProtectedData] = useState('')
  const [username, setUsername] = useState('')

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

  const decodedToken: any = token ? jwt_decode(token) : null

  return (
    <Container size="xs">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {token ? (
          <>
            <Text fz="lg" fw="bold">
              Welcome, {decodedToken.username}!
            </Text>
            {protectedData && (
              <>
                <Text fz="md">Protected Data:</Text>
                <Text fs="italic">{protectedData}</Text>
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
