import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_TrangThaiDanhGia } from "../models";
import { AddDanhMuc_TrangThaiDanhGia, DeleteDanhMuc_TrangThaiDanhGia, GetDanhMuc_TrangThaiDanhGia, SearchDanhMuc_TrangThaiDanhGia, SearchDanhMuc_TrangThaiDanhGiaTheoDonVi, UpdateDanhMuc_TrangThaiDanhGia } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_TrangThaiDanhGiaState extends ExtendedState<IDanhMuc_TrangThaiDanhGia> {

}

const initialState: IDanhMuc_TrangThaiDanhGiaState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_TrangThaiDanhGia",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_TrangThaiDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_TrangThaiDanhGiaTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_TrangThaiDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_TrangThaiDanhGia.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_TrangThaiDanhGia.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_TrangThaiDanhGia.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_TrangThaiDanhGia, GetDanhMuc_TrangThaiDanhGia, AddDanhMuc_TrangThaiDanhGia, UpdateDanhMuc_TrangThaiDanhGia, DeleteDanhMuc_TrangThaiDanhGia, SearchDanhMuc_TrangThaiDanhGiaTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_TrangThaiDanhGia, GetDanhMuc_TrangThaiDanhGia, AddDanhMuc_TrangThaiDanhGia, UpdateDanhMuc_TrangThaiDanhGia, DeleteDanhMuc_TrangThaiDanhGia, SearchDanhMuc_TrangThaiDanhGiaTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer