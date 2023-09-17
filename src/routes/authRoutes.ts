import { FastifyInstance } from 'fastify';
import z from 'zod'
import { prisma } from '../lib/prisma';
import { hash } from 'argon2'
import { Hash } from 'crypto';
export async function authRoutes(app: FastifyInstance) {

  app.get('/api/sessions', async (request, response) => {
    const sessions = await prisma.session.findMany();
    return response.status(200).send(sessions)
  })

  app.post('/api/sessions', async (request, response) => {
    const authSchema = z.object({
      username: z.string(),
      password: z.string(),
    })

    const { username, password } = authSchema.parse(request.body);

    const user = await prisma.user.findFirstOrThrow({
      where: {
        username,
        password,
      },
    })

    if (!user) {
      return response.status(404).send({ message: 'User not found' })
    }

    const hashCode = await hash(`${username}${password}${new Date().toString()}`)


    await prisma.session.create({
      data: {
        hash: hashCode,
        userId: user.id
      }
    })

    return response.status(200).send({ hashCode })
  })

}