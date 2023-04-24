/**
 * Reducers for people state.
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPeople } from '../../api/swapi-client';

const initialState = {
  hasMorePages: true,
  isLoading: false,
  currentPage: 1,
  results: []
}

export const getPage = createAsyncThunk('get-people', getPeople);

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPage += 1;
        state.results.push(...action.payload.data.people.results);

        state.hasMorePages = action.payload.data.people.next
          ? true
          : false;
      });
  }
});

export default peopleSlice.reducer;
