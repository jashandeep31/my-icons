import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

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

export const updateBaseIconUrl = createAsyncThunk(
  "updateBaseIconUrl",
  async (url: string) => {
    const base64 = fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise((res) => {
          reader.onloadend = () => {
            res(reader.result);
          };
        });
      });
    return await base64;
  }
);

export const baseIconSlice = createSlice({
  name: "baseIconConfig",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder.addCase(updateBaseIconUrl.fulfilled, (state, action) => {
      state.url = action.payload as string;
    });
  },
});

export const {
  updateBaseIconPosition,
  updateBaseIconVisibility,
  updateBaseIconLocked,
} = baseIconSlice.actions;
export const selectBaseIconConfig = (state: RootState) => state.baseIconSlice;
export default baseIconSlice.reducer;
