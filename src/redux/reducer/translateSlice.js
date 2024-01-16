import { createSlice } from '@reduxjs/toolkit';

const TranslateSlice = createSlice({
  name: 'Translator',
  initialState: {
    history: {
      translate: [], // Your translation history data
      itemsPerPage: 10,
      currentPage: 1, // You can set your default page here
      totalItems: 0, // Total number of items in history
    },
    bookmark: [],
    singleHistory: {},
    isArchived: false,
    translatedUuid: '',
    original: {
      text: '',
      lang: '',
      context:'',
      isLoading: false
    },
    translated: {
      text: '',
      context:'',
      lang: '',
      isLoading: false
    },
  },

  reducers: {
    // swapContents: (state) => {
    //   const temp = { ...state.original };
    //   state.original.text = state.translated.text;
    //   state.original.lang = state.translated.lang;
    //   state.original.isLoading = state.translated.isLoading;
    //   state.translated.text = temp.text;
    //   state.translated.lang = temp.lang;
    //   state.translated.isLoading = temp.isLoading;
    // },
    swapContents: (state) => {
      const { original, translated } = state;
    
      // Create a new state object with swapped contents
      const newState = {
        ...state,
        original: {
          text: translated.text,
          lang: translated.lang,
          context: translated.context,
          isLoading: translated.isLoading,
        },
        translated: {
          text: original.text,
          lang: original.lang,
          context: original.context,
          isLoading: original.isLoading,
        },
      };
    
      return newState;
    },
// Reducer to update pagination-related properties
updatePagination: (state, action) => {
  state.history = {
    ...state.history,
    ...action.payload,
  };
},
    setTranslatedUuid: (state, action) => {
      state.translatedUuid = action.payload;
    },
    setOriginal: (state, action) => {
      state.original = action.payload;
    },
    setTranslated: (state, action) => {
      state.translated = action.payload;
    },
    setTranslatedLoading: (state, action) => {
      state.translated.isLoading = action.payload;
    },
    setTranslateContext: (state, action) => {
      state.translated.context = action.payload;
    },
    setOriginalLoading: (state, action) => {
      state.original.isLoading = action.payload;
    },
    setOriginalText: (state, action) => {
      state.original.text = action.payload;
    },
    setOriginalLang: (state, action) => {
      state.original.lang = action.payload;
    },
    setTranslatedText: (state, action) => {
      state.translated.text = action.payload;
    },
    setTranslatedLang: (state, action) => {
      state.translated.lang = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setBookmark: state => {
      state.bookmark = state?.history?.translate.filter(el => el.bookmark);
    },
    setSingleHistory: (state, action) => {
      state.singleHistory = action.payload;
    },
    setToggleArchive: state => {
      state.isArchived = !state.isArchived;
    },
    toggleTextSwap: state => {
      state.isSwapped = !state.isSwapped;
    }
  }
});

export const {
  setTranslatedDataText,
  setOriginalLoading,
  setTranslatedLoading,
  setOriginal,
  setTranslated,
  toggleTextSwap,
  seTranslatedData,
  setHistory,
  setToggleArchive,
  setSingleHistory,
  setBookmark,
  setOriginalText,
  setOriginalLang,
  swapContents,
  setTranslatedText,
  setTranslatedLang,
  setTranslateContext,
  setTranslatedUuid,
  updatePagination
} = TranslateSlice.actions;

export default TranslateSlice.reducer;
