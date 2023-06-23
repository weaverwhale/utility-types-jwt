import express, { Request, Response } from 'express'
import ViteExpress from 'vite-express'
import * as dotenv from 'dotenv'
import chalk from 'chalk'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import {
  expressjwt,
  Request as JWTRequest,
  GetVerificationKey,
} from 'express-jwt'
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
// localstorage
// -----------------------
const localStorage = new LocalStorage('./scratch')

// -----------------------
// jwt login
// -----------------------
app.post('/login', (req: JWTRequest, res: express.Response) => {
  const { username = '' } = req.body
  if (username === '') return res.sendStatus(401)

  const secret = localStorage.getItem(username) ?? uuidv4()
  localStorage.setItem(username, secret)

  jwt.sign({ username }, secret, (err: any, token: any) => {
    if (err) {
      return res.sendStatus(500)
    }

    res.json({ token, secret, time: moment().format() })
  })
})

// -----------------------
// jwt get secret
// -----------------------
const getSecret = async (req: JWTRequest, payload: any) => {
  const { username = '' } = payload.payload
  const secret = localStorage.getItem(username)
  if (!secret) throw new Error('missing_secret')
  return secret
}

// -----------------------
// jwt protected route
// -----------------------
app.get(
  '/protected',
  expressjwt({
    secret: getSecret,
    algorithms: ['HS256'],
  }),
  function (req: JWTRequest, res: express.Response) {
    const { username = '' } = req.auth ?? {}
    const secret = localStorage.getItem(username)

    res.json({
      message: `🤫 your secret is ${secret}`,
      time: moment().format(),
      secret,
    })
  }
)

// -----------------------
// what's my secret?
// in our case, secret = "API token"
// -----------------------
app.get('/secret', function (req: JWTRequest, res: express.Response) {
  const { username = '' } = req.auth ?? {}
  const secret = localStorage.getItem(username)
  if (!secret) throw new Error('missing_secret')

  res.json({
    secret,
    status: 200,
    time: moment().format(),
  })
})

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
