/**
 * Server that hosts GraphQL endpoint for Star Wars API.
 */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs, resolvers } from './schema.js';
import StarWarsApi from './starwars-api.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    starwarsApi: new StarWarsApi()
  })
});

const { url } = await startStandaloneServer(server, {
    context: async () => {
        const { cache } = server;
        return {
            // We create new instances of our data sources with each request,
            // passing in our server's cache.
            dataSources: {
                starwarsApi: new StarWarsApi({ cache }),
            },
        };
    },
});
  
console.log(`🚀  Server ready at: ${url}`);
