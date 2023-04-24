import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const DEFAULT_SWAPI_GRAPHQL_URI = 'http://localhost:4000/';

const client = new ApolloClient({
    uri: DEFAULT_SWAPI_GRAPHQL_URI,
    cache: new InMemoryCache(),
});

const HomePage = () => (
    <ApolloProvider client={client}>
        <div>Welcome to Next.js!</div>
    </ApolloProvider>
);

export default HomePage;
