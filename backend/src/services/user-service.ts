import { Prisma, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { conflictError } from '@/errors'
import { userRepository } from '@/repositories'

async function createUser(data: CreateUserParams): Promise<User> {
    const { email, password } = data
    await validateUniqueEmailOrFail(email)

    const hashedPassword = await bcrypt.hash(password, 12)
    return await userRepository.create({
        ...data,
        password: hashedPassword
    })
}

async function validateUniqueEmailOrFail(email: string) {
    const userWithSameEmail = await userRepository.findByEmail(email)
    if (userWithSameEmail) {
        throw conflictError('Email already in use')
    }
}

export type CreateUserParams = Prisma.UserCreateInput

export const userService = {
    createUser
}
