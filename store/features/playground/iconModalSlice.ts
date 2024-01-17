import { RootState } from "@/store/store"
import { createSlice } from "@reduxjs/toolkit"
import { string } from "zod"

const initialState = {
  active: false,
  id: "",
}

export const iconModalSlice = createSlice({
  name: "iconModalConfig",
  initialState,
  reducers: {
    updateIconModalWhole: (state, action) => {
      state.id = action.payload.id
      state.active = action.payload.active
    },
    updateIconModalState: (state, action) => {
      state.active = action.payload.active
    },
  },
})

export const { updateIconModalState, updateIconModalWhole } =
  iconModalSlice.actions

export const selectIconModalConfig = (state: RootState) => state.iconModalSlice

export default iconModalSlice.reducer
