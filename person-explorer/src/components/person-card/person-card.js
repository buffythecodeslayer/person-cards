import React from 'react';

const PersonCard = ({ person }) => (
    <ol>
        <li>{person.name}</li>
        <li>{person.origin}</li>
        <li>{person.height}</li>
        <li>{person.mass}</li>
        <li>{person.birth_year}</li>
    </ol>
);

export default PersonCard;
