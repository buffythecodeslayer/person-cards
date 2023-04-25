/**
 * TypeDefs and Resolvers for Star Wars API data.
 */
import gql from 'graphql-tag';

// There are many more properties available, but we are intentionally not including
// any that are not immediately required.
export const typeDefs = gql`
  type Person {
    name: String
    height: String
    mass: String
    birth_year: String
    origin: String
  }

  type People {
    count: Int
    next: String
    results: [Person]
  }

  type Query {
    people(page: Int!): People
  }
`;

/**
 * The Schema is defined such that the property names match those coming from
 * the Star Wars API.
 * 
 * "If you don't define a resolver for a particular field, Apollo Server
 * automatically defines a default resolver for it."
 * https://www.apollographql.com/docs/apollo-server/data/resolvers/#default-resolvers
 */
export const resolvers = {
  Query: {
    async people(_, { page }, { dataSources }) {
      return await dataSources.starwarsApi.getPeople(page);
    },
  },
  Person: {
    async origin(person, _, { dataSources }) {
      const planetId = person.homeworld.split('/').at(-2);
      const homeworld = await dataSources.starwarsApi.getHomeworld(planetId);
      return homeworld.name;
    },
  },
};
