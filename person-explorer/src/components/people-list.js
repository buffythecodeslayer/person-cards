import React from 'react';

const PeopleList = ({props}) => (
    <ol>{props?.people.map(person => 
        (<li>{person.name}</li>)
    )}</ol>
);

export default PeopleList;
