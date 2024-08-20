import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { authenticate } from "../middleware/authenticate";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";



export async function removePeople(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/remove-people/:id",
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

      const people = await prisma.pessoa.findUnique({ where: { id } });

      if (!people) {
        throw new ClientError("Pessoa não encontrada");
      }

      await prisma.pessoa.delete({ where: { id } });

      return { message: "Pessoa removida com sucesso" };
    }
  )

}