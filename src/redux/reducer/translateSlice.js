import { createSlice } from "@reduxjs/toolkit";

const TranslateSlice = createSlice({
  name: "Translator",
  initialState: {
    translatedData:null,
    history: [],
    isArchived: false,
  },
  reducers: {
    seTranslatedData: (state, action) => {
      state.translatedData = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setToggleArchive: (state) => {
      state.isArchived = !state.isArchived;
    },
  },
});

export const {
    seTranslatedData,
    setHistory,
    setToggleArchive,
  
} = TranslateSlice.actions;

export default TranslateSlice.reducer;