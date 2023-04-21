/**
 * Server that hosts GraphQL endpoint for Star Wars API.
 */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs, resolvers } from './schema.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
console.log(`🚀  Server ready at: ${url}`);
