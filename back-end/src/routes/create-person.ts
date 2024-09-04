import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";;
import { ClientError } from "../errors/client-error";
import { env } from "../env";
import { authenticate } from "../middleware/authenticate";
import { validateCpf } from "../lib/validateCpf";

export async function createPerson(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/create-person",
    {
      preHandler: [authenticate],
      schema: {
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
      const { cpf, name, rg, zipCode, address, number, neighborhood, complement, city, state } = request.body;

      const userAlreadyExists = await prisma.person.findFirst({ where: { cpf } });

      if (userAlreadyExists) {
        throw new ClientError("Usuário já cadastrado");
      }

      validateCpf(cpf);

      const person = await prisma.person.create({
        data: {
          cpf,
          name: name,
          rg,
          zipCode: zipCode,
          address: address,
          number: number,
          neighborhood: neighborhood,
          complement: complement,
          city: city,
          state: state,
        },
      });

      return { person: person };
    }
  );
}
