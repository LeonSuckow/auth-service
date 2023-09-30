import { FastifyInstance } from 'fastify';
import z from 'zod'
import { prisma } from '../../lib/prisma';
import authService from '../auth/auth.service';
export async function authRoutes(app: FastifyInstance) {

  app.get('/api/sessions', async (request, response) => {
    const sessions = await authService.getAll();
    return response.status(200).send(sessions)
  })

  app.post('/api/sessions', async (request, response) => {
    const authSchema = z.object({
      username: z.string(),
      password: z.string(),
    })

    const { username, password } = authSchema.parse(request.body);

    const hashCode = await authService.create({ username, password });

    return response.status(201).send({ hashCode })
  })
}