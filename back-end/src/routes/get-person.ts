import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { authenticate } from "../middleware/authenticate";


export async function getPerson(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/get-person/:id",
    {
      preHandler: [authenticate],
      schema: {
        params: z.object({
          id: z.string().uuid()
        })
      }
    },
    async (request) => {
      const { id } = request.params;

      const person = await prisma.person.findUnique({ where: { id } });

      if (!person) {
        throw new ClientError("Person not found");
      }

      return { person };
    }
  )
}
