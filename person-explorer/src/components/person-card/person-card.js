import React from 'react';

import styles from './person-card.module.css';

const PersonCard = ({ person }) => (
    <ul className={styles.personCard}>
        <li>
            <span>Name:</span>
            <p>{person.name}</p>
        </li>
        <li>
            <span>Origin:</span>
            <p>{person.origin}</p>
        </li>
        <li>
            <span>Height:</span>
            <p>{person.height}</p>
        </li>
        <li>
            <span>Mass:</span>
            <p>{person.mass}</p>
        </li>
        <li>
            <span>Birth Year:</span>
            <p>{person.birth_year}</p>
        </li>
    </ul>
);

export default PersonCard;
