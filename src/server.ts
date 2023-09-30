import { fastify } from 'fastify'
import z from 'zod'
import { userRoutes } from './modules/user/user.routes'
import { authRoutes } from './modules/auth/auth.routes'

import { errorResponseMiddleware } from './services/request-handlers/middlewares/error-response.middleware';

const port = Number(process.env.PORT) || 3334;
const app = fastify();

app.register(userRoutes)
app.register(authRoutes)
app.setErrorHandler(errorResponseMiddleware)
app.listen({
  port,
}).then(() => {
  console.log(`Server listening on port ${port}`)
})