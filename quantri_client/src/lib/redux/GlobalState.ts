import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ExtendedState } from "./GenericSlice"

export interface IGlobalState {
   loading?: boolean,
   loginModalVisible: boolean,
}

const initialState : IGlobalState = {
   loading: false,
   loginModalVisible: false
}

export const Slice = createSlice({
   name : "global",
   initialState,
   reducers:{
      togglerAppLoading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload;
      },
      togglerLoginModalVisible: (state, action: PayloadAction<boolean>) => {
         state.loginModalVisible = action.payload
      }
   },
})

export default Slice.reducer

export const {togglerAppLoading,togglerLoginModalVisible} = Slice.actions