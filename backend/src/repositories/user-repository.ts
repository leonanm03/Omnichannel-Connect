import { prisma } from '@/config'
import { Prisma } from '@prisma/client'

async function create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({ data })
}

export const userRepository = {
    create
}

async function findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
}
