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
          limit: z.string().optional(),
          offset: z.string().optional(),
        }),
      }
    },


    async (request) => {
      const { name, cpf, limit = "50", offset = "0" } = request.query;
      const parsedLimit = parseInt(limit);
      const parsedOffset = parseInt(offset);
      let person;
      let count;
      if (name) {
        person = await prisma.person.findMany({
          where: { name: { contains: name } },
          take: parsedLimit,
          skip: parsedOffset,
        });
        count = await prisma.person.count({
          where: { name: { contains: name } },
        });
      } else if (cpf) {
        person = await prisma.person.findMany({ where: { cpf: { contains: cpf } } });
        count = await prisma.person.count({ where: { cpf: { contains: cpf } } });
      } else {
        person = await prisma.person.findMany({ take: parsedLimit, skip: parsedOffset });
        count = await prisma.person.count();
      }

      return { person, count };
    }
  )
}