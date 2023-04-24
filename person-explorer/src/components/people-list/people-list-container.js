import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPage } from './peopleSlice';
import PeopleList from './people-list';

const PeopleListContainer = () => {
    const isLoading = useSelector(state => state.people.isLoading);
    const currentPage = useSelector(state => state.people.currentPage);
    const people = useSelector(state => state.people.results);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPage());
    }, []);

    const handleClickLoadMore = () => {
        dispatch(getPage(currentPage));
    }

    return (
        <PeopleList
            isLoading={isLoading}
            onClickLoadMore={handleClickLoadMore}
            people={people}
        />
    );
};

export default PeopleListContainer;
