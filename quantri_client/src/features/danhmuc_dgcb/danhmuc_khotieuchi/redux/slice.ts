import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_KhoTieuChi } from "../models";
import { AddDanhMuc_KhoTieuChi, DeleteDanhMuc_KhoTieuChi, GetDanhMuc_KhoTieuChi, SearchDanhMuc_KhoTieuChi, SearchDanhMuc_KhoTieuChiTheoDonVi, UpdateDanhMuc_KhoTieuChi } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_KhoTieuChiState extends ExtendedState<IDanhMuc_KhoTieuChi> {

}

const initialState: IDanhMuc_KhoTieuChiState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_KhoTieuChi",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_KhoTieuChi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_KhoTieuChiTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_KhoTieuChi.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_KhoTieuChi.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_KhoTieuChi.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_KhoTieuChi.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_KhoTieuChi, GetDanhMuc_KhoTieuChi, AddDanhMuc_KhoTieuChi, UpdateDanhMuc_KhoTieuChi, DeleteDanhMuc_KhoTieuChi, SearchDanhMuc_KhoTieuChiTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_KhoTieuChi, GetDanhMuc_KhoTieuChi, AddDanhMuc_KhoTieuChi, UpdateDanhMuc_KhoTieuChi, DeleteDanhMuc_KhoTieuChi, SearchDanhMuc_KhoTieuChiTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer