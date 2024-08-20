import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";;
import { ClientError } from "../errors/client-error";
import { env } from "../env";
import { authenticate } from "../middleware/authenticate";
import { validateCpf } from "../lib/validateCpf";

export async function createPeople(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/create-people",
    {
      // preHandler: [authenticate],
      schema: {
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
      const { cpf, nome, rg, cep, endereco, numero, bairro, complemento, municipio, uf } = request.body;

      const userAlreadyExists = await prisma.pessoa.findFirst({ where: { cpf } });

      if (userAlreadyExists) {
        throw new ClientError("Usuario já existe");
      }

      validateCpf(cpf);

      const people = await prisma.pessoa.create({
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
        },
      });



      return { pessoa: people };
    }
  );


}
