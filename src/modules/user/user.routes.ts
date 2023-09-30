import { FastifyInstance } from 'fastify';
import z from 'zod'
import userService from '../user/user.service'
export async function userRoutes(app: FastifyInstance) {

  app.get('/api/users', async (request, response) => {
    let users = await userService.getAll();
    return response.status(200).send(users);
  })

  app.get('/api/users/:userId/sessions', async (request, response) => {
    let paramSchema = z.object({
      userId: z.string().uuid(),
    })
    let { userId } = paramSchema.parse(request.params)

    let user = await userService.getUserWithSessions(userId)

    return response.status(200).send(user);
  })
  app.post('/api/users', async (request, response) => {
    const userSchema = z.object({
      name: z.string().min(3),
      username: z.string(),
      password: z.string(),
    })
    let { name, username, password } = userSchema.parse(request.body);

    let createdUser = await userService.create({ name, username, password });

    return response.status(201).send(createdUser)
  })


  app.put('/api/users', async (request, response) => {
    const userSchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      username: z.string(),
      password: z.string(),
    })
    let { name, username, password, id } = userSchema.parse(request.body);

    let updatedUser = await userService.update({id, name, username, password });

    return response.status(201).send(updatedUser)
  })

}