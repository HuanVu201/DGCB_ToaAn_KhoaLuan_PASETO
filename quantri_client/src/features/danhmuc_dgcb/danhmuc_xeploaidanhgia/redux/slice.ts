import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_XepLoaiDanhGia } from "../models";
import { AddDanhMuc_XepLoaiDanhGia, DeleteDanhMuc_XepLoaiDanhGia, GetDanhMuc_XepLoaiDanhGia, SearchDanhMuc_XepLoaiDanhGia, SearchDanhMuc_XepLoaiDanhGiaTheoDonVi, UpdateDanhMuc_XepLoaiDanhGia } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_XepLoaiDanhGiaState extends ExtendedState<IDanhMuc_XepLoaiDanhGia> {

}

const initialState: IDanhMuc_XepLoaiDanhGiaState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_XepLoaiDanhGia",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_XepLoaiDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_XepLoaiDanhGiaTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_XepLoaiDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_XepLoaiDanhGia.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_XepLoaiDanhGia.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_XepLoaiDanhGia.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_XepLoaiDanhGia, GetDanhMuc_XepLoaiDanhGia, AddDanhMuc_XepLoaiDanhGia, UpdateDanhMuc_XepLoaiDanhGia, DeleteDanhMuc_XepLoaiDanhGia, SearchDanhMuc_XepLoaiDanhGiaTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_XepLoaiDanhGia, GetDanhMuc_XepLoaiDanhGia, AddDanhMuc_XepLoaiDanhGia, UpdateDanhMuc_XepLoaiDanhGia, DeleteDanhMuc_XepLoaiDanhGia, SearchDanhMuc_XepLoaiDanhGiaTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer