import { FastifyInstance } from 'fastify';
import z from 'zod'
import { prisma } from '../lib/prisma';

export async function userRoutes(app: FastifyInstance) {

  app.get('/api/users', async (request, response) => {
    const users = await prisma.user.findMany();
    return response.status(200).send(users);
  })

  app.post('/api/users', async (request, response) => {
    const userSchema = z.object({
      name: z.string().min(3),
      username: z.string(),
      password: z.string(),
    })
    let { name, username, password } = userSchema.parse(request.body);

    let findUser = await prisma.user.findFirst({
      where: {
        username
      }
    })

    if (findUser) {
      return response.status(400).send({ message: `This username is already in use` })
    }

    let newUser = await prisma.user.create({
      data: {
        name,
        username,
        password,
      }
    })
    return response.status(201).send(newUser)
  })

  app.get('/api/users/:userId/sessions', async (request, response) => {
    let paramSchema = z.object({
      userId: z.string().uuid(),
    })
    let { userId } = paramSchema.parse(request.params)


    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        Session: true
      }
    });

    if(!user){
      return response.status(404).send({ message:"User not found"})
    }
    
    return response.status(200).send(user);
  })
}