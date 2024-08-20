import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { authenticate } from "../middleware/authenticate";
import { prisma } from "../lib/prisma";


export async function getPeople(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/get-people",
    {
      preHandler: [authenticate],
      schema: {
        querystring: z.object({
          nome: z.string().optional(),
          cpf: z.string().optional(),
          limit: z.number().min(1).max(100).default(50).optional(),
          offset: z.number().min(0).default(0).optional(),
        }),
      }
    },

    async (request) => {
      const { nome, cpf, limit = 50, offset = 0 } = request.query;

      let people;
      if (nome) {
        people = await prisma.pessoa.findMany({
          where: { nome: nome },
          take: limit,
          skip: offset,
        });
      } else if (cpf) {
        people = await prisma.pessoa.findUnique({ where: { cpf } }); //So existe um usuario com o cpf
      } else {
        people = await prisma.pessoa.findMany({ take: limit, skip: offset });
      }

      return { people };
    }
  )
}