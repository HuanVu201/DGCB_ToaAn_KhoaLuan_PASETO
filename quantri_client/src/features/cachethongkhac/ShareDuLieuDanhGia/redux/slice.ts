import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { AddShareDuLieuDanhGia, DeleteShareDuLieuDanhGia, GetShareDuLieuDanhGia, SearchShareDuLieuDanhGia, UpdateShareDuLieuDanhGia } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { IShareDuLieuDanhGia } from "../models";

export interface IShareDuLieuDanhGiaState extends ExtendedState<IShareDuLieuDanhGia> {

}

const initialState: IShareDuLieuDanhGiaState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "ShareDuLieuDanhGia",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchShareDuLieuDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetShareDuLieuDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddShareDuLieuDanhGia.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateShareDuLieuDanhGia.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteShareDuLieuDanhGia.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchShareDuLieuDanhGia, GetShareDuLieuDanhGia, AddShareDuLieuDanhGia, UpdateShareDuLieuDanhGia, DeleteShareDuLieuDanhGia), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchShareDuLieuDanhGia, GetShareDuLieuDanhGia, AddShareDuLieuDanhGia, UpdateShareDuLieuDanhGia, DeleteShareDuLieuDanhGia), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer