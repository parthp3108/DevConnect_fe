import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // Initial state can be null to signify no data initially
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // Replace the state with the fetched feed data
    },
    removeUserFromFeed: (state, action) => {
      // Filter out the user from the feed
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
