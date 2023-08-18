import { CreateUserParams } from '@/services'
import { userService } from '@/services'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export async function createUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const data = req.body as CreateUserParams

    try {
        const { id, name, email } = await userService.create(data)
        return res.status(httpStatus.CREATED).send({ id, name, email })
    } catch (error) {
        next(error)
    }
}
