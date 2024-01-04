import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
// TODO: more methods needed to be added like locked visible etc

type PlatformType = "windows" | "mac" | "unknown";

type InitialStateType = {
  position: { x: number; y: number };
  url: string;
  locked: boolean;
  visible: boolean;
  platform: PlatformType;
  positionChanged: boolean;
  sizeChanged: boolean;
  size: { width: number; height: number };
};

const initialState: InitialStateType = {
  position: { x: 0, y: 0 },
  positionChanged: false,
  sizeChanged: false,
  size: { width: 0, height: 0 },
  url: "/mac.png",
  locked: true,
  visible: true,
  platform: "unknown",
};

export const baseIconSlice = createSlice({
  name: "baseIconConfig",
  initialState,
  reducers: {
    updateBaseIconUrl: (state, action) => {
      state.url = action.payload;
    },
    updateBaseIconPosition: (state, action) => {
      state.position = action.payload;
    },
    updateBaseIconVisibility: (state, action) => {
      state.visible = action.payload;
    },
    updateBaseIconLocked: (state, action) => {
      state.locked = action.payload;
    },
  },
});

export const {
  updateBaseIconUrl,
  updateBaseIconPosition,
  updateBaseIconVisibility,
  updateBaseIconLocked,
} = baseIconSlice.actions;
export const selectBaseIconConfig = (state: RootState) => state.baseIconSlice;
export default baseIconSlice.reducer;
