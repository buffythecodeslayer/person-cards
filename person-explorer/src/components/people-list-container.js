import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPage } from '../redux/peopleSlice';
import PeopleList from './people-list';

const PeopleListConainer = () => {
    const currentPage = useSelector(state => state.currentPage);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('useEffect');
        dispatch(getPage());
    }, []);

    const people = useSelector(state => state.people);

    return (<>
        <h1>CurrentPage</h1>
        <ol>
            <PeopleList props={people}/>
        </ol>
    </>);
};

export default PeopleListConainer;
