import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_CongViecChuyenMon } from "../models";
import { AddDanhMuc_CongViecChuyenMon, DeleteDanhMuc_CongViecChuyenMon, GetDanhMuc_CongViecChuyenMon, SearchDanhMuc_CongViecChuyenMon, SearchDanhMuc_CongViecChuyenMonTheoDonVi, UpdateDanhMuc_CongViecChuyenMon } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_CongViecChuyenMonState extends ExtendedState<IDanhMuc_CongViecChuyenMon> {

}

const initialState: IDanhMuc_CongViecChuyenMonState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_CongViecChuyenMon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_CongViecChuyenMon.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_CongViecChuyenMonTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_CongViecChuyenMon.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_CongViecChuyenMon.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_CongViecChuyenMon.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_CongViecChuyenMon.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_CongViecChuyenMon, GetDanhMuc_CongViecChuyenMon, AddDanhMuc_CongViecChuyenMon, UpdateDanhMuc_CongViecChuyenMon, DeleteDanhMuc_CongViecChuyenMon, SearchDanhMuc_CongViecChuyenMonTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_CongViecChuyenMon, GetDanhMuc_CongViecChuyenMon, AddDanhMuc_CongViecChuyenMon, UpdateDanhMuc_CongViecChuyenMon, DeleteDanhMuc_CongViecChuyenMon, SearchDanhMuc_CongViecChuyenMonTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer