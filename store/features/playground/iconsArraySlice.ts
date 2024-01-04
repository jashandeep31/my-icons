import { RootState } from "@/store/store";
import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";

export type Icon = {
  id: number;
  base64: string;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  locked: boolean;
  visible: boolean;
  index: number;
};

type iconsArray = Icon[];

const initialState: iconsArray = [];

export const iconsArraySlice = createSlice({
  name: "iconsArrayConfig",
  initialState,
  reducers: {
    addIconsArrayIcon: (
      state,
      action: PayloadAction<Omit<Icon, "id" | "index">>
    ) => {
      const data = {
        ...action.payload,
        id: state.length,
        index: state.length,
      };

      state.push(data);
    },
    removeIconsArrayIcon: (state, action) => {
      const index = state.findIndex((icon) => icon.id === action.payload);
      state.splice(index, 1);
    },
    updateIconsArrayIconVisible: (state, action) => {
      const index = state.findIndex((icon) => icon.id === action.payload.id);
      state[index].visible = action.payload.visible;
    },
    updateIconsArrayIconLocked: (state, action) => {
      const index = state.findIndex((icon) => icon.id === action.payload.id);
      state[index].locked = action.payload.locked;
    },
    updateIconsArrayIconPosition: (state, action) => {
      console.log(action);
      const index = state.findIndex((icon) => icon.id === action.payload.id);
      state[index].position = action.payload.position;
    },
    updateIconsArrayIconSize: (state, action) => {
      const index = state.findIndex((icon) => icon.id === action.payload.id);
      state[index].size = action.payload.size;
    },
  },
});

export const {
  addIconsArrayIcon,
  removeIconsArrayIcon,
  updateIconsArrayIconVisible,
  updateIconsArrayIconLocked,
  updateIconsArrayIconPosition,
  updateIconsArrayIconSize,
} = iconsArraySlice.actions;

export const selectIconsArrayConfig = (state: RootState) =>
  state.iconsArraySlice;
export default iconsArraySlice.reducer;
