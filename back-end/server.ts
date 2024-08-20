import fastify from 'fastify'
import cors from "@fastify/cors";
import { login } from './src/routes/login';
import { createUser } from './src/routes/signup';
import { createPeople } from './src/routes/create-people';
import { removePeople } from './src/routes/remove-people';
import { updatePeople } from './src/routes/update-people';

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
  server.register(createPeople)
  server.register(updatePeople)
  server.register(removePeople)
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