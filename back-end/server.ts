import fastify from 'fastify'
import cors from "@fastify/cors";
import { login } from './src/routes/login';
import { createUser } from './src/routes/signup';
import { createPeople } from './src/routes/create-people';


export function createServer() {
  const server = fastify()

  server.register(cors, {
    origin: '*',
  });

  server.register(login)
  server.register(createUser)
  server.register(createPeople)

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