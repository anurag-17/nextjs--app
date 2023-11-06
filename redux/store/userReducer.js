import { createSlice } from '@reduxjs/toolkit';

const someSlice = createSlice({
  name: 'some',
  initialState: [],
  reducers: {
    // Define your reducer actions here
  },
});

export const { actions, reducer } = someSlice;

