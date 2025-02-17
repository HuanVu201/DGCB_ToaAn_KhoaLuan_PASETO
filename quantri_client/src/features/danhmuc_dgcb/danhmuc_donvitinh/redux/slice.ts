import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_DonViTinh } from "../models";
import { AddDanhMuc_DonViTinh, DeleteDanhMuc_DonViTinh, GetDanhMuc_DonViTinh, SearchDanhMuc_DonViTinh, SearchDanhMuc_DonViTinhTheoDonVi, UpdateDanhMuc_DonViTinh } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_DonViTinhState extends ExtendedState<IDanhMuc_DonViTinh> {

}

const initialState: IDanhMuc_DonViTinhState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_DonViTinh",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_DonViTinh.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_DonViTinhTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhMuc_DonViTinh.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_DonViTinh.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_DonViTinh.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_DonViTinh.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_DonViTinh, GetDanhMuc_DonViTinh, AddDanhMuc_DonViTinh, UpdateDanhMuc_DonViTinh, DeleteDanhMuc_DonViTinh, SearchDanhMuc_DonViTinhTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_DonViTinh, GetDanhMuc_DonViTinh, AddDanhMuc_DonViTinh, UpdateDanhMuc_DonViTinh, DeleteDanhMuc_DonViTinh, SearchDanhMuc_DonViTinhTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer