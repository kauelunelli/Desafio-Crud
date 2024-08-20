import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { ClientError } from "../errors/client-error";



export async function updatePeople(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/update-people/:id",
    {
      // preHandler: [authenticate],
      schema: {
        params: z.object({
          id: z.string().uuid()
        }),
        body: z.object({
          cpf: z.string().length(11),
          nome: z.string(),
          rg: z.string(),
          cep: z.string(),
          endereco: z.string(),
          numero: z.string(),
          bairro: z.string(),
          complemento: z.string(),
          municipio: z.string(),
          uf: z.string(),
        }),
      },
    },

    async (request) => {
      const { id } = request.params;
      const { cpf, nome, rg, cep, endereco, numero, bairro, complemento, municipio, uf } = request.body;

      const people = await prisma.pessoa.findUnique({ where: { id } });

      if (!people) {
        throw new ClientError("Pessoa não encontrada");
      }

      const updatedPeople = await prisma.pessoa.update({
        where: { id },
        data: {
          cpf,
          nome,
          rg,
          cep,
          endereco,
          numero,
          bairro,
          complemento,
          municipio,
          uf,
        }
      });

      return { pessoa: updatedPeople };
    }
  )
}