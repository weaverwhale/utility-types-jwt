import express, { Request, Response } from 'express'
import ViteExpress from 'vite-express'
import * as dotenv from 'dotenv'
import chalk from 'chalk'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import { expressjwt, Request as JWTRequest } from 'express-jwt'
import { v4 as uuidv4 } from 'uuid'

// -----------------------
// express app
// -----------------------
const app = express()
const port = 3000
const appName = chalk.blue('[🐳🐳🐳] ')
app.use(express.json())

dotenv.config()
const { NODE_ENV } = process.env

// -----------------------
// jwt secret
// how do we handle this in production?
// -----------------------
const secret = uuidv4()

// -----------------------
// jwt login
// -----------------------
app.post('/login', (req: JWTRequest, res: express.Response) => {
  const { username = '' } = req.body
  if (username === '') return res.sendStatus(401)

  jwt.sign({ username }, secret, (err: any, token: any) => {
    if (err) {
      return res.sendStatus(500)
    }

    res.json({ token, secret })
  })
})

// -----------------------
// jwt protected route
// -----------------------
app.get(
  '/protected',
  expressjwt({ secret, algorithms: ['HS256'] }),
  function (req: JWTRequest, res: express.Response) {
    res.json({
      message: `🤫 the password is ${secret}`,
      data: {
        secret,
      },
    })
  }
)

// -----------------------
// are we authed?
// -----------------------
app.get('/day', (req: Request, res: Response) => {
  res.json({ token: moment().startOf('day').format('YYYY-MM-DD') })
})

const loggy = () => {
  console.log(
    appName +
      chalk.blue(
        `listening http://localhost:${NODE_ENV === 'production' ? '80' : port}`
      )
  )
}

NODE_ENV === 'production' ? app.use(express.static('dist')) : null
NODE_ENV === 'production'
  ? app.listen('80', loggy)
  : ViteExpress.listen(app, port, loggy)
