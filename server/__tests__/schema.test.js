/**
 * Tests the people resolver.
 */
import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import {jest} from '@jest/globals'

import { typeDefs, resolvers } from '../src/schema.js';
import StarWarsApi from '../src/starwars-api.js';

const mockResponse = () => ({
    count: 1,
    results: [
        {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        birth_year: "19BBY",
        homeworld: "https://swapi.dev/api/planets/1/"
        }
]});

const query = gql`
    query {
        people {
            count
            next
            previous
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
    test('returns people data', async () => {
        const starwarsApi = new StarWarsApi();
        const server = new ApolloServer({
            typeDefs,
            resolvers,
        });
        starwarsApi.get = jest.fn(mockResponse);
        await starwarsApi.getPeople();
        
        expect(starwarsApi.get).toBeCalledWith('people/?page=1');

        const res = await server.executeOperation({query}, {contextValue: {dataSources: {starwarsApi}}});
        console.log(res.body.singleResult.data.people);
        expect(res.body.singleResult.data.people).not.toBeNull();
    })
})