import React from 'react';

const PeopleList = ({people}) => (
    <ol>{people.map(person => 
        (<li key={person.name}>{person.name}</li>)
    )}</ol>
);

export default PeopleList;
