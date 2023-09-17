import { fastify } from 'fastify'
import z from 'zod'
import { userRoutes } from './routes/userRoutes';
import { authRoutes } from './routes/authRoutes';

const port = Number(process.env.PORT) || 3334;
const app = fastify();

app.register(userRoutes)
app.register(authRoutes)

app.listen({
  port,
}).then(() => {
  console.log(`Server listening on port ${port}`)
})