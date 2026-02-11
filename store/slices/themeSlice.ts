import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ThemeSetting = {
  Menu: undefined,
  Pages: [],
  pixelId: "",
  theme: undefined,
  tikTokId: "",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    updateSetting(state, action: PayloadAction<Partial<ThemeSetting>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateSetting } = themeSlice.actions;
export default themeSlice.reducer;
