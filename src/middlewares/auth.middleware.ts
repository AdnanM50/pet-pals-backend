import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken'

const secret = process.env.SECRET

export const decodeToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        if (secret) {
            if (token) {
                res.locals.user = jwt.verify(token, secret)
            } else {
                throw new Error('Token is not defined')
            }
        } else {
            throw new Error('Secret is not defined')
        }
        next()
        return
    } catch (err) {
        next()
    }
}


export const isUser = (req: Request, res: Response, next: NextFunction) => {
    let { user } = res.locals
    if (!!user && !!user?.uid && user.role === 'user') {
        next()
    } else {
        res.status(401).send({
            error: true,
            msg: 'Unauthorized'
        })
    }
}


export const isAnyUser = (req: Request, res: Response, next: NextFunction) => {
    let { user } = res.locals
    if (!!user && !!user?.uid && (user.role === 'user' || user.role === 'admin' || user.role === 'seller')) {
        next()
    } else {
        res.status(401).send({
            error: true,
            msg: 'Unauthorized'
        })
    }
}


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    let { user } = res.locals
    if (!!user && !!user?.uid && user.role === 'admin') {
        next()
    } else {
        res.status(401).send({
            error: true,
            msg: 'Unauthorized'
        })
    }
}


export const isAdminOrseller = (req: Request, res: Response, next: NextFunction) => {
    let { user } = res.locals
    if (!!user && !!user?.uid && (user.role === 'admin' || user.role === 'seller')) {
        next()
    } else {
        res.status(401).send({
            error: true,
            msg: 'Unauthorized'
        })
    }
}