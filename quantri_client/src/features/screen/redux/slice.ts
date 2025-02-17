import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IScreen } from "../models";
import { AddScreen, DeleteScreen, GetScreen, SearchScreen, UpdateScreen } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IScreenState extends ExtendedState<IScreen>{

}

const initialState : IScreenState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "Screen",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchScreen.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetScreen.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddScreen.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateScreen.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteScreen.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchScreen, GetScreen, AddScreen, UpdateScreen, DeleteScreen), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchScreen, GetScreen, AddScreen, UpdateScreen, DeleteScreen), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer