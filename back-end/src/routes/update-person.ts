import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";
import { authenticate } from "../middleware/authenticate";



export async function updatedPerson(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/update-person/:id",
    {
      preHandler: [authenticate],
      schema: {
        params: z.object({
          id: z.string().uuid()
        }),
        body: z.object({
          cpf: z.string().length(11),
          name: z.string(),
          rg: z.string(),
          zipCode: z.string(),
          address: z.string(),
          number: z.string(),
          neighborhood: z.string(),
          complement: z.string(),
          city: z.string(),
          state: z.string(),
        }),
      },
    },

    async (request) => {
      const { id } = request.params;
      const { cpf, name, rg, zipCode, address, number, neighborhood, complement, city, state } = request.body;

      const person = await prisma.person.findUnique({ where: { id } });

      if (!person) {
        throw new ClientError("Person not found");
      }

      const existingPerson = await prisma.person.findFirst({
        where: {
          cpf: cpf,
          NOT: {
            id: id
          }
        }
      });

      if (existingPerson) {
        throw new ClientError("CPF is already in use");
      }

      const updatedPerson = await prisma.person.update({
        where: { id },
        data: {
          cpf,
          name,
          rg,
          zipCode,
          address,
          number,
          neighborhood,
          complement,
          city,
          state,
        }
      });

      return { person: updatedPerson };
    }
  )
}