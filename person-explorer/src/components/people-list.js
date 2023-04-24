import React from 'react';

const PeopleList = ({props}) => (
    <ol>{props.people?.map(person => 
        (<li key={person.name}>{person.name}</li>)
    )}</ol>
);

export default PeopleList;
