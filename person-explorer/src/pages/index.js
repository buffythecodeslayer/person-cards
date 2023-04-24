import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from '../redux/peopleSlice';
import PeopleList from '../components/peopleList';

const DEFAULT_SWAPI_GRAPHQL_URI = 'http://localhost:4000/';

const client = new ApolloClient({
    uri: DEFAULT_SWAPI_GRAPHQL_URI,
    cache: new InMemoryCache(),
});

const store = configureStore({
    reducer: {
        people: peopleReducer
    }
})

const HomePage = () => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <div>Welcome to Next.js with React, ApolloClient and Redux!</div>
                <PeopleList />
            </Provider>
        </ApolloProvider>
    );
};

export default HomePage;
