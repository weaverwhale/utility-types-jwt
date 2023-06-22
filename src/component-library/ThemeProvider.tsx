import { MantineProvider } from '@mantine/core'
import { theme } from './theme'
import React, { PropsWithChildren } from 'react'
import App from '../App'

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <MantineProvider {...{ children, theme }}>
      <App />
    </MantineProvider>
  )
}
