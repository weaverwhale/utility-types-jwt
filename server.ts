import express, { Request, Response } from 'express'
import ViteExpress from 'vite-express'
import * as dotenv from 'dotenv'
import chalk from 'chalk'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import { expressjwt, Request as JWTRequest } from 'express-jwt'
import { v4 as uuidv4 } from 'uuid'
import { LocalStorage } from 'node-localstorage'

// -----------------------
// express app
// -----------------------
const app = express()
const port = 3000
const appName = chalk.blue('[🐳🐳🐳] ')
app.use(express.json())

// -----------------------
// env vars
// -----------------------
dotenv.config()
const { NODE_ENV } = process.env

// -----------------------
// jwt secret functionality
// @TODO generate and validate secret based on user instead of global??
// -----------------------
const localStorage = new LocalStorage('./scratch')
let secret = localStorage.getItem('secret') ?? uuidv4()
localStorage.setItem('secret', secret)

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

    res.json({ token, secret, time: moment().format() })
  })
})

// -----------------------
// jwt protected route
// -----------------------
app.get(
  '/protected',
  expressjwt({
    secret,
    algorithms: ['HS256'],
  }),
  function (req: JWTRequest, res: express.Response) {
    res.json({
      message: `🤫 the password is ${secret}`,
      time: moment().format(),
      secret,
    })
  }
)

// -----------------------
// are we alive?
// -----------------------
app.get('/ping', (req: Request, res: Response) => {
  res.json({
    message: 'pong',
    status: 200,
    time: moment().format(),
  })
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
