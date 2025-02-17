import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhmuc_TaiLieuHuongDanSuDung } from "../models";
import { AddDanhmuc_TaiLieuHuongDanSuDung, DeleteDanhmuc_TaiLieuHuongDanSuDung, GetDanhmuc_TaiLieuHuongDanSuDung, SearchDanhmuc_TaiLieuHuongDanSuDung, SearchDanhmuc_TaiLieuHuongDanSuDungTheoDonVi, UpdateDanhmuc_TaiLieuHuongDanSuDung } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhmuc_TaiLieuHuongDanSuDungState extends ExtendedState<IDanhmuc_TaiLieuHuongDanSuDung> {

}

const initialState: IDanhmuc_TaiLieuHuongDanSuDungState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "Danhmuc_TaiLieuHuongDanSuDung",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhmuc_TaiLieuHuongDanSuDung.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhmuc_TaiLieuHuongDanSuDungTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetDanhmuc_TaiLieuHuongDanSuDung.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhmuc_TaiLieuHuongDanSuDung.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhmuc_TaiLieuHuongDanSuDung.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhmuc_TaiLieuHuongDanSuDung.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhmuc_TaiLieuHuongDanSuDung, GetDanhmuc_TaiLieuHuongDanSuDung, AddDanhmuc_TaiLieuHuongDanSuDung, UpdateDanhmuc_TaiLieuHuongDanSuDung, DeleteDanhmuc_TaiLieuHuongDanSuDung, SearchDanhmuc_TaiLieuHuongDanSuDungTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhmuc_TaiLieuHuongDanSuDung, GetDanhmuc_TaiLieuHuongDanSuDung, AddDanhmuc_TaiLieuHuongDanSuDung, UpdateDanhmuc_TaiLieuHuongDanSuDung, DeleteDanhmuc_TaiLieuHuongDanSuDung, SearchDanhmuc_TaiLieuHuongDanSuDungTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer