/**
 * Integrations tests for the people resolver. HTTP Responses are mocked so we
 * don't actually send HTTP Requests.
 */
import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import {jest} from '@jest/globals'

import { typeDefs, resolvers } from '../src/schema.js';
import StarWarsApi from '../src/starwars-api.js';

const mockResponse = {
    count: 1,
    next: null,
    results: [{
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        birth_year: "19BBY",
        homeworld: "https://swapi.dev/api/planets/1/",
        },
]};

const query = gql`
    query {
        people {
            count
            next
            results {
                name
                height
                mass
                birth_year
                homeworld
            }
        }
    }
`;

describe('people resolver', () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const starwarsApi = new StarWarsApi();
    const contextValue = { dataSources: { starwarsApi } };

    test('returns people data', async () => {
        starwarsApi.get = jest.fn(() => mockResponse);
        const res = await server.executeOperation({ query }, { contextValue },);

        expect(res.body.singleResult.data.people).toBeDefined();
        expect(res.body.singleResult.data.people).toEqual(mockResponse);
    });

    test('should throw an error if the Starwars Api request fails', async () => {
        starwarsApi.get = jest.fn(() => {
            throw new Error('Error in HTTP Request/Response');
        });
        const res = await server.executeOperation({ query }, { contextValue },);

        /**
         * Note that when testing, any errors in parsing, validating, and executing your GraphQL
         * operation are returned in the nested errors field of the result. As with any GraphQL
         * response, these errors are not thrown.
         * https://www.apollographql.com/docs/apollo-server/testing/testing/#executing-queries-and-mutations
         */
        expect(res.body.singleResult.errors).toBeDefined();
    });
});
