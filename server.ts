import express, { Request, Response } from 'express'
import ViteExpress from 'vite-express'
import * as dotenv from 'dotenv'
import chalk from 'chalk'
import moment from 'moment'

// -----------------------
// express app
// -----------------------
const app = express()
const port = 3000
const appName = chalk.hex('#1877f2')('[triple-whale] ')
app.use(express.json())

dotenv.config()
const { NODE_ENV } = process.env

// -----------------------
// are we authed?
// -----------------------
app.get('/logged-in', (req: Request, res: Response) => {
  res.json({ token: moment().startOf('day').format('YYYY-MM-DD') })
})

const loggy = () => {
  console.log(
    appName +
      chalk.green(
        `🐳🐳🐳 listening http://localhost:${
          NODE_ENV === 'production' ? '80' : port
        }`
      )
  )
}

NODE_ENV === 'production' ? app.use(express.static('dist')) : null
NODE_ENV === 'production'
  ? app.listen('80', loggy)
  : ViteExpress.listen(app, port, loggy)
