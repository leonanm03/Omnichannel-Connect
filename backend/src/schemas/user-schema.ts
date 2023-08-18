import Joi from 'joi'
import { CreateUserParams } from '@/services'

export const createUserSchema = Joi.object<CreateUserParams>({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    address: Joi.string().min(2).required(),
    phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .required()
})
