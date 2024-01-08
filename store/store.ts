import { configureStore } from "@reduxjs/toolkit";
import baseIconReducer from "./features/playground/baseIconSlice";
import iconsArrayReducer from "./features/playground/iconsArraySlice";
import convertedIconsReducer from "./features/playground/convertedIconsSlice";
import iconModalReducer from "./features/playground/iconModalSlice";
export const store = configureStore({
  reducer: {
    baseIconSlice: baseIconReducer,
    iconsArraySlice: iconsArrayReducer,
    convertedIconsSlice: convertedIconsReducer,
    iconModalSlice: iconModalReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
