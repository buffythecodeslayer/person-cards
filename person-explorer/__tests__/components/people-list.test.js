/**
 * Tests the PeopleList component. 
 */
import { render } from '@testing-library/react'

import PeopleList from '../../src/components/people-list/people-list'

const props = {
    hasMorePages: true,
    isLoading: false,
    currentPage: 1,
    people: [{
            name: "Luke Skywalker",
            height: "172",
            mass: "77",
            birth_year: "19BBY",
            homeworld: "https://swapi.dev/api/planets/1/",
        },
    ]
}

const NOT_LOADING_AND_HAS_MORE_PAGES = props;
const NOT_LOADING_AND_DOES_NOT_HAVE_MORE_PAGES = {
    ...props,
    hasMorePages: false
};
const IS_LOADING = {
    ...props,
    isLoading: true
};


describe('PeopleList', () => {
    test('renders people data and asks to load more', () => {
        const { queryByRole, queryByText } = render(
            <PeopleList {...NOT_LOADING_AND_HAS_MORE_PAGES} />
        )

        expect(queryByText('Luke Skywalker')).toBeTruthy();
        expect(queryByText('Loading...')).toBeFalsy();
        expect(queryByRole('button', { name: 'Load More' })).toBeTruthy();
    });
    test('does not ask to load more', () => {
        const { queryByRole, queryByText } = render(
            <PeopleList {...NOT_LOADING_AND_DOES_NOT_HAVE_MORE_PAGES} />
        )

        expect(queryByText('Luke Skywalker')).toBeTruthy();
        expect(queryByText('Loading...')).toBeFalsy();
        expect(queryByRole('button', { name: 'Load More' })).toBeFalsy();
    });
    test('shows loading', () => {
        const { queryByRole, queryByText } = render(
            <PeopleList {...IS_LOADING} />
        )

        expect(queryByText('Luke Skywalker')).toBeTruthy();
        expect(queryByText('Loading...')).toBeTruthy();
        expect(queryByRole('button', { name: 'Load More' })).toBeFalsy();
    });
});