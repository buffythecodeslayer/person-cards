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
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        birth_year: '19BBY',
        origin: 'Tatooine',
        },
]};

const mockPeopleResponse = {
    ...mockResponse,
    results: [{
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        birth_year: '19BBY',
        homeworld: 'https://swapi.dev/api/planets/1/',
        },
]};

const mockHomeworldResponse = {
    name: 'Tatooine',
}

const query = gql`
    query GetPeople ($page: Int!) {
        people (page: $page) {
            count
            next
            results {
                name
                height
                mass
                birth_year
                origin
            }
        }
    }
`;

const variables = {
    page: 1,
}

describe('people resolver', () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    const starwarsApi = new StarWarsApi();
    const contextValue = { dataSources: { starwarsApi } };

    test('returns people data', async () => {
        starwarsApi.get = jest.fn()
            .mockReturnValueOnce(mockPeopleResponse)
            .mockReturnValueOnce(mockHomeworldResponse);
        const res = await server.executeOperation(
            { query, variables },
            { contextValue },
        );

        expect(res.body.singleResult.data.people).toBeDefined();
        expect(res.body.singleResult.data.people).toEqual(mockResponse);
    });

    test('should throw an error if the Starwars Api people request fails', async () => {
        starwarsApi.get = jest.fn(() => {
            throw new Error('Error in HTTP Request/Response');
            });
        const res = await server.executeOperation(
            { query, variables },
            { contextValue },
        );

        /**
         * Note that when testing, any errors in parsing, validating, and executing your GraphQL
         * operation are returned in the nested errors field of the result. As with any GraphQL
         * response, these errors are not thrown.
         * https://www.apollographql.com/docs/apollo-server/testing/testing/#executing-queries-and-mutations
         */
        expect(res.body.singleResult.errors).toBeDefined();
    });

    test('should throw an error if the Starwars Api homeworld request fails', async () => {
        starwarsApi.get = jest.fn()
            .mockReturnValueOnce(mockPeopleResponse)
            .mockImplementationOnce(() => {
                throw new Error('Error in HTTP Request/Response');
            });
        const res = await server.executeOperation(
            { query, variables },
            { contextValue },
        );

        /**
         * Note that when testing, any errors in parsing, validating, and executing your GraphQL
         * operation are returned in the nested errors field of the result. As with any GraphQL
         * response, these errors are not thrown.
         * https://www.apollographql.com/docs/apollo-server/testing/testing/#executing-queries-and-mutations
         */
        expect(res.body.singleResult.errors).toBeDefined();
    });
});
