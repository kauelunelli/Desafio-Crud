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

// src/routes/signup.ts
var signup_exports = {};
__export(signup_exports, {
  createUser: () => createUser
});
module.exports = __toCommonJS(signup_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/signup.ts
var import_bcrypt = require("bcrypt");

// src/errors/client-error.ts
var ClientError = class extends Error {
};

// src/routes/signup.ts
var jwt = __toESM(require("jsonwebtoken"));

// src/env.ts
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  DATABASE_URL: import_zod.z.string(),
  JWT_SECRET: import_zod.z.string()
});
var env = envSchema.parse(process.env);

// src/routes/signup.ts
var import_zod2 = require("zod");
async function createUser(app) {
  app.withTypeProvider().post(
    "/singup",
    {
      schema: {
        body: import_zod2.z.object({
          email: import_zod2.z.string().email(),
          senha: import_zod2.z.string().min(6)
        })
      }
    },
    async (request) => {
      const { email, senha } = request.body;
      const usuario = await prisma.usuario.findFirst({ where: { email } });
      if (usuario) {
        throw new ClientError("Email j\xE1 cadastrado");
      }
      const newUser = await prisma.usuario.create({
        data: {
          email,
          senha: (0, import_bcrypt.hashSync)(senha, 10)
        }
      });
      return { user: newUser, token: jwt.sign({ userId: newUser.id }, env.JWT_SECRET) };
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUser
});
