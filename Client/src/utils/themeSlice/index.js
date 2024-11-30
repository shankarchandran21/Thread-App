import { createSlice } from '@reduxjs/toolkit';



const initialState = {
  themeMode:localStorage.getItem('theme')?localStorage.getItem('theme'):"light",
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      localStorage.setItem('theme',state.themeMode === 'light' ? 'dark' : 'light' )
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
