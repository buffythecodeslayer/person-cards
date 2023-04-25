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
            name: 'Luke Skywalker',
            height: '172',
            mass: '77',
            birth_year: '19BBY',
            origin: 'Tatooine',
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

const ROLE_BUTTON = 'button';
const LOADING_MESSAGE = 'Loading...';
const LOAD_MORE_MESSAGE = 'Load More';


describe('PeopleList', () => {
    test('renders people data and asks to load more', () => {
        const { queryByRole, queryByText } = render(
            <PeopleList {...NOT_LOADING_AND_HAS_MORE_PAGES} />
        )

        expect(queryByText('Luke Skywalker')).toBeTruthy();
        expect(queryByText('172')).toBeTruthy();
        expect(queryByText('77')).toBeTruthy();
        expect(queryByText('19BBY')).toBeTruthy();
        expect(queryByText('Tatooine')).toBeTruthy();

        expect(queryByText(LOADING_MESSAGE)).toBeFalsy();
        expect(queryByRole(ROLE_BUTTON, { name: LOAD_MORE_MESSAGE })).toBeTruthy();
    });
    test('does not ask to load more', () => {
        const { queryByRole, queryByText } = render(
            <PeopleList {...NOT_LOADING_AND_DOES_NOT_HAVE_MORE_PAGES} />
        )

        expect(queryByText('Luke Skywalker')).toBeTruthy();
        expect(queryByText(LOADING_MESSAGE)).toBeFalsy();
        expect(queryByRole(ROLE_BUTTON, { name: LOAD_MORE_MESSAGE })).toBeFalsy();
    });
    test('shows loading', () => {
        const { queryByRole, queryByText } = render(
            <PeopleList {...IS_LOADING} />
        )

        expect(queryByText('Luke Skywalker')).toBeTruthy();
        expect(queryByText(LOADING_MESSAGE)).toBeTruthy();
        expect(queryByRole(ROLE_BUTTON, { name: LOAD_MORE_MESSAGE })).toBeFalsy();
    });
});