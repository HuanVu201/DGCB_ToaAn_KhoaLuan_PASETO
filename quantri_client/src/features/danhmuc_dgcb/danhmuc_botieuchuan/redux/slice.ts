import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_BoTieuChuan } from "../models";
import { AddDanhMuc_BoTieuChuan, DeleteDanhMuc_BoTieuChuan, GetDanhMuc_BoTieuChuan, SearchDanhMuc_BoTieuChuan, SearchDanhMuc_BoTieuChuanTheoDonVi, UpdateDanhMuc_BoTieuChuan } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_BoTieuChuanState extends ExtendedState<IDanhMuc_BoTieuChuan> {

}

const initialState: IDanhMuc_BoTieuChuanState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_BoTieuChuan",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_BoTieuChuan.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_BoTieuChuanTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_BoTieuChuan.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_BoTieuChuan.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_BoTieuChuan.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_BoTieuChuan.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_BoTieuChuan, GetDanhMuc_BoTieuChuan, AddDanhMuc_BoTieuChuan, UpdateDanhMuc_BoTieuChuan, DeleteDanhMuc_BoTieuChuan, SearchDanhMuc_BoTieuChuanTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_BoTieuChuan, GetDanhMuc_BoTieuChuan, AddDanhMuc_BoTieuChuan, UpdateDanhMuc_BoTieuChuan, DeleteDanhMuc_BoTieuChuan, SearchDanhMuc_BoTieuChuanTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer