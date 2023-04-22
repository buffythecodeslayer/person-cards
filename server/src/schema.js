/**
 * TypeDefs and Resolvers for Star Wars API data.
 */
import gql from 'graphql-tag';

export const typeDefs = gql`
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
    people(page: Int): People
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
};
