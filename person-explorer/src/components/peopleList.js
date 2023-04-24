import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNextPage } from '../redux/peopleSlice';

const PeopleList = () => {
    const currentPage = useSelector(state => state.currentPage);
    const dispatch = useDispatch();
    dispatch(getNextPage());

    return (<>
        <h1>CurrentPage</h1>
        <div>{currentPage}</div>
        <ol>
            <li>Person 1</li>
        </ol>
    </>);
};

export default PeopleList;