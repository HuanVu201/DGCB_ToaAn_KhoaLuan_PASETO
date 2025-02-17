import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDongBoDuLieu } from "../models";
import { AddDongBoDuLieu, DeleteDongBoDuLieu, GetDongBoDuLieu, SearchDongBoDuLieu, SearchDongBoDuLieuTheoDonVi, UpdateDongBoDuLieu } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDongBoDuLieuState extends ExtendedState<IDongBoDuLieu> {

}

const initialState: IDongBoDuLieuState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DongBoDuLieu",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDongBoDuLieu.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDongBoDuLieuTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDongBoDuLieu.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDongBoDuLieu.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDongBoDuLieu.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDongBoDuLieu.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDongBoDuLieu, GetDongBoDuLieu, AddDongBoDuLieu, UpdateDongBoDuLieu, DeleteDongBoDuLieu, SearchDongBoDuLieuTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDongBoDuLieu, GetDongBoDuLieu, AddDongBoDuLieu, UpdateDongBoDuLieu, DeleteDongBoDuLieu, SearchDongBoDuLieuTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer