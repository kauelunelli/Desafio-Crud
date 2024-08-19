
import * as jwt from 'jsonwebtoken';
import { env } from "../env";
import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";

interface JwtPayload {
  userId: string;
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const token = request.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
      return reply.status(401).send({ error: 'Token not provided' });
    }
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    (request as any).userId = decoded.userId;
  } catch (error) {
    return reply.status(403).send({ error: 'Invalid or expired token' });
  }
}

export default async function authenticateRoute(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/authenticate',
    handler: authenticate
  });
}
