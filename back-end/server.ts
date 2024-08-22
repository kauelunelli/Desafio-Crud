import fastify from 'fastify'
import cors from "@fastify/cors";
import { login } from './src/routes/login';
import { createUser } from './src/routes/signup';
import { getPerson } from './src/routes/get-person';
import { createPerson } from './src/routes/create-person';
import { removePerson } from './src/routes/remove-person';
import { updatedPerson } from './src/routes/update-person';

import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';


export function createServer() {
  const server = fastify()

  server.register(cors, {
    origin: '*',
  });

  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  server.register(createUser)
  server.register(login)
  server.register(createPerson)
  server.register(updatedPerson)
  server.register(getPerson)
  server.register(removePerson)
  return server
}

const server = createServer();
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})