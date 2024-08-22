import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { authenticate } from "../middleware/authenticate";
import { prisma } from "../lib/prisma";


export async function getPersons(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/get-persons",
    {
      preHandler: [authenticate],
      schema: {
        querystring: z.object({
          name: z.string().optional(),
          cpf: z.string().optional(),
          limit: z.number().min(1).max(100).default(50).optional(),
          offset: z.number().min(0).default(0).optional(),
        }),
      }
    },

    async (request) => {
      const { name, cpf, limit = 50, offset = 0 } = request.query;
      let person;
      if (name) {
        person = await prisma.person.findMany({
          where: { name: { contains: name } },
          take: limit,
          skip: offset,
        });
      } else if (cpf) {
        console.log(cpf)
        person = await prisma.person.findMany({ where: { cpf: { contains: cpf } } });
        console.log(person)
      } else {
        person = await prisma.person.findMany({ take: limit, skip: offset });
      }

      return { person };
    }
  )
}