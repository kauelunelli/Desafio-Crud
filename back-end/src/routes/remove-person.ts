import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { authenticate } from "../middleware/authenticate";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";



export async function removePerson(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/remove-person/:id",
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
        throw new ClientError("Pessoa não encontrada");
      }

      await prisma.person.delete({ where: { id } });

      return { message: "Pessoa removida com sucesso" };
    }
  )

}