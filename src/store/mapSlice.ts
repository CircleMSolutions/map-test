import { createSlice } from '@reduxjs/toolkit'

export interface MapState {
  
}

const initialState: MapState = {
  
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    test: (state) => {

    }
  },
})

// Action creators are generated for each case reducer function
export const { test } = mapSlice.actions

export default mapSlice.reducer