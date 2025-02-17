import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_CacCap } from "../models";
import { AddDanhMuc_CacCap, DeleteDanhMuc_CacCap, GetDanhMuc_CacCap, SearchDanhMuc_CacCap, SearchDanhMuc_CacCapTheoDonVi, UpdateDanhMuc_CacCap } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_CacCapState extends ExtendedState<IDanhMuc_CacCap> {

}

const initialState: IDanhMuc_CacCapState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_CacCap",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_CacCap.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_CacCapTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_CacCap.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_CacCap.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_CacCap.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_CacCap.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_CacCap, GetDanhMuc_CacCap, AddDanhMuc_CacCap, UpdateDanhMuc_CacCap, DeleteDanhMuc_CacCap, SearchDanhMuc_CacCapTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_CacCap, GetDanhMuc_CacCap, AddDanhMuc_CacCap, UpdateDanhMuc_CacCap, DeleteDanhMuc_CacCap, SearchDanhMuc_CacCapTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer