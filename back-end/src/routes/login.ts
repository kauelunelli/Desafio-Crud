import * as jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { FastifyInstance } from 'fastify';
import { compareSync } from 'bcrypt';
import { ClientError } from '../errors/client-error';
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "../env";

export async function login(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/login",
    {
      schema: {
        body: z.object({
          user: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request) => {
      const { email, password } = request.body;

      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) {
        throw new ClientError("Usuario não encontrado");
      }

      if (!compareSync(password, user.password)) {
        throw new ClientError("Senha inválida");
      }

      const token = jwt.sign({ userId: user.id }, env.JWT_SECRET);

      return { user, token };
    }
  );
}