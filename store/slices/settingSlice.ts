import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultSetting: SettingGlobale = {
  openSideBar: false,
  searchOpen: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState: defaultSetting,
  reducers: {
    updateSetting(state, action: PayloadAction<Partial<ThemeSetting>>) {
      Object.assign(state, action.payload);
    },
    openSearchDraw: (state, action: PayloadAction<boolean>) => {
      state.searchOpen = action.payload;
    },
  },
});

export const { updateSetting,openSearchDraw } = settingSlice.actions;
export default settingSlice.reducer;
