/**
 * Entry point for the App.
 */
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { client } from '../api/swapi-client';
import peopleReducer from '../components/people-list/peopleSlice';
import PeopleListContainer from '../components/people-list/people-list-container';

const store = configureStore({
    reducer: {
        people: peopleReducer
    }
})

const App = () => (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <PeopleListContainer />
        </Provider>
    </ApolloProvider>
);

export default App;
