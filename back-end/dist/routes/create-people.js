"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/create-people.ts
var create_people_exports = {};
__export(create_people_exports, {
  createPeople: () => createPeople
});
module.exports = __toCommonJS(create_people_exports);
var import_zod2 = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/errors/client-error.ts
var ClientError = class extends Error {
};

// src/middleware/authenticate.ts
var jwt = __toESM(require("jsonwebtoken"));

// src/env.ts
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  DATABASE_URL: import_zod.z.string(),
  JWT_SECRET: import_zod.z.string()
});
var env = envSchema.parse(process.env);

// src/middleware/authenticate.ts
async function authenticate(request, reply) {
  try {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) {
      return reply.status(401).send({ error: "Token not provided" });
    }
    const decoded = jwt.verify(token, env.JWT_SECRET);
    request.userId = decoded.userId;
  } catch (error) {
    return reply.status(403).send({ error: "Invalid or expired token" });
  }
}

// src/routes/create-people.ts
async function createPeople(app) {
  app.withTypeProvider().post(
    "/create-people",
    {
      preHandler: [authenticate],
      schema: {
        body: import_zod2.z.object({
          cpf: import_zod2.z.string().length(11),
          nome: import_zod2.z.string(),
          rg: import_zod2.z.string(),
          cep: import_zod2.z.string(),
          endereco: import_zod2.z.string(),
          numero: import_zod2.z.string(),
          bairro: import_zod2.z.string(),
          complemento: import_zod2.z.string(),
          municipio: import_zod2.z.string(),
          uf: import_zod2.z.string()
        })
      }
    },
    async (request) => {
      const { cpf, nome, rg, cep, endereco, numero, bairro, complemento, municipio, uf } = request.body;
      const userAlreadyExists = await prisma.pessoa.findFirst({ where: { cpf } });
      if (userAlreadyExists) {
        throw new ClientError("Usuario j\xE1 existe");
      }
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
          uf
        }
      });
      return { pessoa: people };
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPeople
});
