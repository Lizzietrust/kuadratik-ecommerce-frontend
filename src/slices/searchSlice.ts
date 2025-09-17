import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string;
  selectedCategory: string | null;
  selectedBrands: string[];
  selectedTags: string[];
}

const initialState: SearchState = {
  query: '',
  selectedCategory: null,
  selectedBrands: [],
  selectedTags: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
    toggleSelectedBrand(state, action: PayloadAction<string>) {
      const brand = action.payload;
      if (state.selectedBrands.includes(brand)) {
        state.selectedBrands = state.selectedBrands.filter((b) => b !== brand);
      } else {
        state.selectedBrands.push(brand);
      }
    },
    toggleSelectedTag(state, action: PayloadAction<string>) {
      const tag = action.payload;
      if (state.selectedTags.includes(tag)) {
        state.selectedTags = state.selectedTags.filter((t) => t !== tag);
      } else {
        state.selectedTags.push(tag);
      }
    },
  },
});

export const { setSearchQuery, setSelectedCategory, toggleSelectedBrand, toggleSelectedTag } = searchSlice.actions;
export default searchSlice.reducer;
