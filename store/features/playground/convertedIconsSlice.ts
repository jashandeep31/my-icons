import { createSlice } from "@reduxjs/toolkit"
import iconsArraySlice from "./iconsArraySlice"
import { RootState } from "@/store/store"

const initialState = {
  pngURL: "",
}

const covertedIconsSlice = createSlice({
  name: "convertedIconsConfig",
  initialState,
  reducers: {
    updateConvertedIconsUrl: (state, action) => {
      state.pngURL = action.payload.pngURL
    },
  },
})

export const { updateConvertedIconsUrl } = covertedIconsSlice.actions

export const selectConvertedIconsConfig = (state: RootState) =>
  state.convertedIconsSlice

export default covertedIconsSlice.reducer
