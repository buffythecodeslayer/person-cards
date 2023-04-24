import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const DEFAULT_SWAPI_GRAPHQL_URI = 'http://localhost:4000/';

export const client = new ApolloClient({
    uri: DEFAULT_SWAPI_GRAPHQL_URI,
    cache: new InMemoryCache(),
});

const query = gql`
    query GetPeople($page: Int!) {
        people (page: $page) {
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

export const getPeople = (page = 1) => client.query({
    query,
    variables: { page }
});
