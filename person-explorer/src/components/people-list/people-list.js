import React from 'react';

import PersonCard from '../person-card/person-card';
import styles from './people-list.module.css';

const PeopleList = ({
    hasMorePages,
    isLoading,
    onClickLoadMore,
    people
}) => (
    <div className={styles.peopleList}>
        <h1>Star Wars</h1>
        <ul className={styles.cards}>{people.map(person => 
            (<li className={styles.card} key={person.name}>
                <PersonCard person={person} />
            </li>)
        )}</ul>
        {isLoading && <p>Loading...</p>}
        {!isLoading
            && hasMorePages
            && (<button onClick={onClickLoadMore}>Load More</button>)
        }
    </div>
);

export default PeopleList;
