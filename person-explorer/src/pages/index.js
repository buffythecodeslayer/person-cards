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

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <div>Welcome to Next.js with React, ApolloClient and Redux!</div>
                <PeopleListContainer />
            </Provider>
        </ApolloProvider>
    );
};

export default App;
