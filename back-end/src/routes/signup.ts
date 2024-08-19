import { prisma } from '../lib/prisma';
import { hashSync } from 'bcrypt';
import { ClientError } from '../errors/client-error';
import * as jwt from 'jsonwebtoken';
import { env } from "../env";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { FastifyInstance } from 'fastify';

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/singup",
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          senha: z.string().min(6),
        }),
      },
    },
    async (request) => {
      const { email, senha } = request.body;

      const usuario = await prisma.usuario.findFirst({ where: { email } });
      if (usuario) {
        throw new ClientError("Email já cadastrado");
      }

      const newUser = await prisma.usuario.create({
        data: {
          email,
          senha: hashSync(senha, 10)
        }
      });


      return { user: newUser, token: jwt.sign({ userId: newUser.id }, env.JWT_SECRET) };
    }
  );
}