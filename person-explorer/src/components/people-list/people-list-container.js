import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPage } from './peopleSlice';
import PeopleList from './people-list';

const PeopleListContainer = () => {
    const currentPage = useSelector(state => state.people.currentPage);
    const people = useSelector(state => state.people.results);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPage());
    }, []);

    const handleClickLoadMore = () => {
        dispatch(getPage(currentPage));
    }

    return (<>
        <h1>CurrentPage</h1>
        <PeopleList people={people}/>
        <button onClick={(handleClickLoadMore)}>Load More</button>
    </>);
};

export default PeopleListContainer;
