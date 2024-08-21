import { prisma } from '../lib/prisma';
import { hashSync } from 'bcrypt';
import { ClientError } from '../errors/client-error';
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
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body;

      const user = await prisma.user.findFirst({ where: { name } });
      if (user) {
        throw new ClientError("Usuario já cadastrado");
      }

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashSync(password, 10)
        }
      });


      return { newUser };
    }
  );
}