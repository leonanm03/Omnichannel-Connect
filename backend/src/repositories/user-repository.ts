import { prisma } from '@/config'
import { Prisma } from '@prisma/client'

async function create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data })
}

async function findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
}

export const userRepository = {
    create,
    findByEmail
}
