import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_ChucDanh } from "../models";
import { AddDanhMuc_ChucDanh, DeleteDanhMuc_ChucDanh, GetDanhMuc_ChucDanh, SearchDanhMuc_ChucDanh, SearchDanhMuc_ChucDanhTheoDonVi, UpdateDanhMuc_ChucDanh } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { ChucDanh } from "@/models/chucDanh";

export interface IDanhMuc_ChucDanhState extends ExtendedState<ChucDanh> {

}

const initialState: IDanhMuc_ChucDanhState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_ChucDanh",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_ChucDanh.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_ChucDanhTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_ChucDanh.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_ChucDanh.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_ChucDanh.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_ChucDanh.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_ChucDanh, GetDanhMuc_ChucDanh, AddDanhMuc_ChucDanh, UpdateDanhMuc_ChucDanh, DeleteDanhMuc_ChucDanh, SearchDanhMuc_ChucDanhTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_ChucDanh, GetDanhMuc_ChucDanh, AddDanhMuc_ChucDanh, UpdateDanhMuc_ChucDanh, DeleteDanhMuc_ChucDanh, SearchDanhMuc_ChucDanhTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer