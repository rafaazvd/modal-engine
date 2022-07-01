import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import UserDoesNotAuth from './UserDoesNotAuth'
export const AuthRequest = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let token = request.headers.authorization

    if (
      token !== undefined &&
      token != null &&
      typeof token === 'string' &&
      token.startsWith('Bearer ')
    ) {
      token = token.slice(7, token.length).trim()
    }

    if (token) {
      jwt.verify(token, process.env.JWT_KEY as string, (err, decode) => {
        if (err) {
          throw new UserDoesNotAuth()
        } else {
          next()
        }
      })
    } else {
      throw new UserDoesNotAuth()
    }
  } catch (err) {
    throw new UserDoesNotAuth()
  }
}
