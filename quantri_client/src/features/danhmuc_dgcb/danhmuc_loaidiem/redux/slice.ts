import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_LoaiDiem } from "../models";
import { AddDanhMuc_LoaiDiem, DeleteDanhMuc_LoaiDiem, GetDanhMuc_LoaiDiem, SearchDanhMuc_LoaiDiem, SearchDanhMuc_LoaiDiemTheoDonVi, UpdateDanhMuc_LoaiDiem } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_LoaiDiemState extends ExtendedState<IDanhMuc_LoaiDiem> {

}

const initialState: IDanhMuc_LoaiDiemState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_LoaiDiem",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_LoaiDiem.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_LoaiDiemTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_LoaiDiem.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_LoaiDiem.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_LoaiDiem.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_LoaiDiem.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_LoaiDiem, GetDanhMuc_LoaiDiem, AddDanhMuc_LoaiDiem, UpdateDanhMuc_LoaiDiem, DeleteDanhMuc_LoaiDiem, SearchDanhMuc_LoaiDiemTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_LoaiDiem, GetDanhMuc_LoaiDiem, AddDanhMuc_LoaiDiem, UpdateDanhMuc_LoaiDiem, DeleteDanhMuc_LoaiDiem, SearchDanhMuc_LoaiDiemTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer