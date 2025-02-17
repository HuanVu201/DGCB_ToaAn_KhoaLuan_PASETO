import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { INhomNguoiDung } from "../models";
import { AddNhomNguoiDung, DeleteNhomNguoiDung, GetNhomNguoiDung, SearchNhomNguoiDung, UpdateNhomNguoiDung } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface INhomNguoiDungState extends ExtendedState<INhomNguoiDung>{

}

const initialState : INhomNguoiDungState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "NhomNguoiDung",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchNhomNguoiDung.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetNhomNguoiDung.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddNhomNguoiDung.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateNhomNguoiDung.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteNhomNguoiDung.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchNhomNguoiDung, GetNhomNguoiDung, AddNhomNguoiDung, UpdateNhomNguoiDung, DeleteNhomNguoiDung), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchNhomNguoiDung, GetNhomNguoiDung, AddNhomNguoiDung, UpdateNhomNguoiDung, DeleteNhomNguoiDung), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer