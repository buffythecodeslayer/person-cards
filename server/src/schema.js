/**
 * TypeDefs and Resolvers for Star Wars API data.
 */
import wretch from 'wretch';

export const typeDefs = `#graphql
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
 * The Schema is defined such that the property names match those coming from
 * the Star Wars API.
 * 
 * "If you don't define a resolver for a particular field, Apollo Server
 * automatically defines a default resolver for it."
 * https://www.apollographql.com/docs/apollo-server/data/resolvers/#default-resolvers
 */
export const resolvers = {
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
