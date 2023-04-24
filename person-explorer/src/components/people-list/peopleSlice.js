import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPeople } from '../../api/swapi-client';

const initialState = {
  currentPage: 1,
  results: []
}

export const getPage = createAsyncThunk('get-people', getPeople);

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    incrementPage: state => {
        state.currentPage += 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPage.fulfilled, (state, action) => {
        state.currentPage += 1;
        state.results.push(...action.payload.data.people.results);
      });
  }
});

export const { incrementPage } = peopleSlice.actions;

export default peopleSlice.reducer;
