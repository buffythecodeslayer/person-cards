import React from 'react';

const PeopleList = ({
    isLoading,
    onClickLoadMore,
    people
}) => (
    <>
        <h1>Star Wars</h1>
        <ol>{people.map(person => 
            (<li key={person.name}>{person.name}</li>)
        )}</ol>
        {isLoading
            ? (<div>Loading...</div>)
            : (<button onClick={onClickLoadMore}>Load More</button>)
        }
    </>
);

export default PeopleList;
