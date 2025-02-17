import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_PhieuDanhGia, IDanhMuc_PhieuDanhGiaHistory } from "../models";
import { AddDanhMuc_PhieuDanhGia, DeleteDanhMuc_PhieuDanhGia, GetDanhMuc_PhieuDanhGia, SearchDanhMuc_PhieuDanhGia, SearchDanhMuc_PhieuDanhGiaHistory, SearchDanhMuc_PhieuDanhGiaTheoDonVi, UpdateDanhMuc_PhieuDanhGia } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_PhieuDanhGiaState extends ExtendedState<IDanhMuc_PhieuDanhGia,{
    listHistory?: IDanhMuc_PhieuDanhGiaHistory[];
},"listHistory"> {
   
}

const initialState: IDanhMuc_PhieuDanhGiaState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_PhieuDanhGia",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_PhieuDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_PhieuDanhGiaHistory.fulfilled, (state, action) => {
                state.loading = false
                state.listHistory = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_PhieuDanhGiaTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_PhieuDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_PhieuDanhGia.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_PhieuDanhGia.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_PhieuDanhGia.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_PhieuDanhGia, GetDanhMuc_PhieuDanhGia, AddDanhMuc_PhieuDanhGia, UpdateDanhMuc_PhieuDanhGia, DeleteDanhMuc_PhieuDanhGia, SearchDanhMuc_PhieuDanhGiaTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_PhieuDanhGia, GetDanhMuc_PhieuDanhGia, AddDanhMuc_PhieuDanhGia, UpdateDanhMuc_PhieuDanhGia, DeleteDanhMuc_PhieuDanhGia, SearchDanhMuc_PhieuDanhGiaTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer