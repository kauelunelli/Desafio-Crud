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

// src/routes/login.ts
var login_exports = {};
__export(login_exports, {
  login: () => login
});
module.exports = __toCommonJS(login_exports);
var jwt = __toESM(require("jsonwebtoken"));
var import_bcrypt = require("bcrypt");

// src/errors/client-error.ts
var ClientError = class extends Error {
};

// src/routes/login.ts
var import_zod2 = require("zod");

// src/env.ts
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  DATABASE_URL: import_zod.z.string(),
  JWT_SECRET: import_zod.z.string()
});
var env = envSchema.parse(process.env);

// src/routes/login.ts
async function login(app) {
  app.withTypeProvider().post(
    "/login",
    {
      schema: {
        body: import_zod2.z.object({
          email: import_zod2.z.string().email(),
          password: import_zod2.z.string().min(6)
        })
      }
    },
    async (request, reply) => {
      const { email, password } = request.body;
      const user = await (void 0).user.findFirst({ where: { email } });
      if (!user) {
        throw new ClientError("User not found");
      }
      if (!(0, import_bcrypt.compareSync)(password, user.password)) {
        throw new ClientError("Invalid password");
      }
      const token = jwt.sign({ userId: user.id }, env.JWT_SECRET);
      return { user, token };
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  login
});
