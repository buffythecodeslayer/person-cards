import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import wretch from 'wretch';

const typeDefs = `#graphql
  type Person {
    name: String
    height: String
    mass: String
    birth_year: String
    homeworld: String
  }

  type People {
    count: Int
    next: String
    previous: String
    results: [Person]
  }

  type Query {
    people(page: Int = 1): People
  }
`;

/**
 * "If you don't define a resolver for a particular field, Apollo Server
 * automatically defines a default resolver for it."
 * https://www.apollographql.com/docs/apollo-server/data/resolvers/#default-resolvers
 */
const resolvers = {
  Query: {
    async people(parent, { page }) {
      const data = await wretch(`https://swapi.dev/api/people/?page=${page}`)
        .get()
        .json()
        .catch(error => {
            throw new Error('Failed to get people data');
        });
      return data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
console.log(`🚀  Server ready at: ${url}`);
