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

// src/routes/get-people.ts
var get_people_exports = {};
__export(get_people_exports, {
  getPeople: () => getPeople
});
module.exports = __toCommonJS(get_people_exports);
var import_zod2 = require("zod");

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

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/get-people.ts
async function getPeople(app) {
  app.withTypeProvider().get(
    "/get-people",
    {
      preHandler: [authenticate],
      schema: {
        querystring: import_zod2.z.object({
          nome: import_zod2.z.string().optional(),
          cpf: import_zod2.z.string().optional()
        })
      }
    },
    async (request) => {
      const { nome, cpf } = request.query;
      let people;
      if (nome) {
        people = await prisma.pessoa.findMany({ where: { nome } });
      } else if (cpf) {
        people = await prisma.pessoa.findMany({ where: { cpf } });
      } else {
        people = await prisma.pessoa.findMany();
      }
      return { people };
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPeople
});
