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
        }),
      }
    },

    async (request) => {
      const { nome, cpf } = request.query;

      let people;
      if (nome) {
        people = await prisma.pessoa.findMany({ where: { nome: nome } });
      } else if (cpf) {
        people = await prisma.pessoa.findMany({ where: { cpf } });
      } else {
        people = await prisma.pessoa.findMany();
      }

      return { people };
    }
  )
}