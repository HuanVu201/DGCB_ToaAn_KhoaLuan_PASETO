import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IKyDanhGia } from "../models";
import { AddKyDanhGia, DeleteKyDanhGia, GetKyDanhGia, SearchKyDanhGia, SearchKyDanhGiaTheoDonVi, UpdateKyDanhGia } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IKyDanhGiaState extends ExtendedState<IKyDanhGia> {

}

const initialState: IKyDanhGiaState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "KyDanhGia",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchKyDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchKyDanhGiaTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetKyDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddKyDanhGia.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateKyDanhGia.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteKyDanhGia.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchKyDanhGia, GetKyDanhGia, AddKyDanhGia, UpdateKyDanhGia, DeleteKyDanhGia, SearchKyDanhGiaTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchKyDanhGia, GetKyDanhGia, AddKyDanhGia, UpdateKyDanhGia, DeleteKyDanhGia, SearchKyDanhGiaTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer