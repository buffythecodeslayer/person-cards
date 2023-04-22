/**
 * Tests the people resolver.
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

    test('returns people data', async () => {
        const starwarsApi = new StarWarsApi();
        starwarsApi.get = jest.fn(() => mockResponse);
        
        const res = await server.executeOperation(
            { query },
            { 
                contextValue: {
                    dataSources: { starwarsApi }
                }
            },
        );

        expect(res.body.singleResult.data.people).not.toBeNull();
        expect(res.body.singleResult.data.people).toEqual(mockResponse);
    });

    test('should throw an error if the swapi request fails', async () => {
        const starwarsApi = new StarWarsApi();
        starwarsApi.get = jest.fn(() => {
            throw new Error('Failed to get people data');
        });

        const res = await server.executeOperation(
            { query },
            { 
                contextValue: {
                    dataSources: { starwarsApi }
                }
            },
        );

        expect(res.body.singleResult.errors).toBeDefined();
    });
});
