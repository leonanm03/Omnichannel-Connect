import { Prisma, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { conflictError } from '@/errors'
import { userRepository } from '@/repositories'
import { exclude } from '@/utils'

async function create(data: CreateUserParams) {
    const { email, password } = data
    await validateUniqueEmailOrFail(email)

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await userRepository.create({
        ...data,
        password: hashedPassword
    })
    return exclude(user, 'password')
}

async function validateUniqueEmailOrFail(email: string) {
    const userWithSameEmail = await userRepository.findByEmail(email)
    if (userWithSameEmail) {
        throw conflictError('Email already in use')
    }
}

export type CreateUserParams = Prisma.UserCreateInput

export const userService = {
    create
}
