import { ApplicationError } from '../../error/application-error';
import { NotFoundError } from '../../error/not-found.error';

export const errorResponseMiddleware = (error, request, response) => {
  if (error instanceof ApplicationError) {
    return response.status(error.status).send({ message: error.message });
  }

  return response.status(500).send({ message: 'Internal server error' });
}