import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_TrangThaiCongViec } from "../models";
import { AddDanhMuc_TrangThaiCongViec, DeleteDanhMuc_TrangThaiCongViec, GetDanhMuc_TrangThaiCongViec, SearchDanhMuc_TrangThaiCongViec, SearchDanhMuc_TrangThaiCongViecTheoDonVi, UpdateDanhMuc_TrangThaiCongViec } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_TrangThaiCongViecState extends ExtendedState<IDanhMuc_TrangThaiCongViec> {

}

const initialState: IDanhMuc_TrangThaiCongViecState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_TrangThaiCongViec",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_TrangThaiCongViec.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_TrangThaiCongViecTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_TrangThaiCongViec.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_TrangThaiCongViec.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_TrangThaiCongViec.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_TrangThaiCongViec.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_TrangThaiCongViec, GetDanhMuc_TrangThaiCongViec, AddDanhMuc_TrangThaiCongViec, UpdateDanhMuc_TrangThaiCongViec, DeleteDanhMuc_TrangThaiCongViec, SearchDanhMuc_TrangThaiCongViecTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_TrangThaiCongViec, GetDanhMuc_TrangThaiCongViec, AddDanhMuc_TrangThaiCongViec, UpdateDanhMuc_TrangThaiCongViec, DeleteDanhMuc_TrangThaiCongViec, SearchDanhMuc_TrangThaiCongViecTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer