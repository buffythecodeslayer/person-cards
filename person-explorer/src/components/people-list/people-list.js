import React from 'react';

import PersonCard from '../person-card/person-card';

const PeopleList = ({
    hasMorePages,
    isLoading,
    onClickLoadMore,
    people
}) => (
    <>
        <h1>Star Wars</h1>
        <ol>{people.map(person => 
            (<li key={person.name}>
                <PersonCard person={person}/>
            </li>)
        )}</ol>
        {isLoading && <div>Loading...</div>}
        {!isLoading
            && hasMorePages
            && (<button onClick={onClickLoadMore}>Load More</button>)
        }
    </>
);

export default PeopleList;
