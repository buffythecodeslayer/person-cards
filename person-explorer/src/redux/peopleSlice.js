import { createSlice } from '@reduxjs/toolkit';

export const peopleSlice = createSlice({
  name: 'people',
  initialState: {
    currentPage: 1,
    people: []
  },
  reducers: {
    getPage: state => {
        state.people = [...state.people, { name: "John"}];
    },
    incrementPage: state => {
        state.currentPage += 1;
    }
  }
});

export const { getPage, incrementPage } = peopleSlice.actions;

export default peopleSlice.reducer;
