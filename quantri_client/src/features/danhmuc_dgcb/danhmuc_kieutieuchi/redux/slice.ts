import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_KieuTieuChi } from "../models";
import { AddDanhMuc_KieuTieuChi, DeleteDanhMuc_KieuTieuChi, GetDanhMuc_KieuTieuChi, SearchDanhMuc_KieuTieuChi, SearchDanhMuc_KieuTieuChiTheoDonVi, UpdateDanhMuc_KieuTieuChi } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_KieuTieuChiState extends ExtendedState<IDanhMuc_KieuTieuChi> {

}

const initialState: IDanhMuc_KieuTieuChiState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_KieuTieuChi",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_KieuTieuChi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_KieuTieuChiTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_KieuTieuChi.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_KieuTieuChi.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_KieuTieuChi.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_KieuTieuChi.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_KieuTieuChi, GetDanhMuc_KieuTieuChi, AddDanhMuc_KieuTieuChi, UpdateDanhMuc_KieuTieuChi, DeleteDanhMuc_KieuTieuChi, SearchDanhMuc_KieuTieuChiTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_KieuTieuChi, GetDanhMuc_KieuTieuChi, AddDanhMuc_KieuTieuChi, UpdateDanhMuc_KieuTieuChi, DeleteDanhMuc_KieuTieuChi, SearchDanhMuc_KieuTieuChiTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer