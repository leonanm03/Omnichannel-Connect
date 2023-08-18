import { ApplicationError } from '@/protocols'
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'

export function handleApplicationErrors(
    err: ApplicationError | Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    switch (err.name) {
        default:
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                error: 'InternalServerError',
                message: 'Internal Server Error'
            })
    }
}
