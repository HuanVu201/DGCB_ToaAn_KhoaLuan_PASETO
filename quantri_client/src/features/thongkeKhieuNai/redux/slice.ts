import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IThongKeKhieuNai } from "../models";
import { AddThongKeKhieuNai, DeleteThongKeKhieuNai, GetDanhSachKhieuNaiDanhGiaTk, GetThongKeKhieuNai, SearchThongKeKhieuNai, UpdateThongKeKhieuNai } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IThongKeKhieuNaiState extends ExtendedState<IThongKeKhieuNai,{
    GetDanhSachKhieuNaiDanhGiaTK?: IThongKeKhieuNai[];
},"GetDanhSachKhieuNaiDanhGiaTK"> {

}

const initialState: IThongKeKhieuNaiState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "ThongKeKhieuNai",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchThongKeKhieuNai.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetThongKeKhieuNai.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetDanhSachKhieuNaiDanhGiaTk.fulfilled, (state, action) => {
                state.loading = false
                state.GetDanhSachKhieuNaiDanhGiaTK = action.payload.data
            })
            .addCase(AddThongKeKhieuNai.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateThongKeKhieuNai.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteThongKeKhieuNai.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchThongKeKhieuNai, GetThongKeKhieuNai, AddThongKeKhieuNai, UpdateThongKeKhieuNai, DeleteThongKeKhieuNai ), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchThongKeKhieuNai, GetThongKeKhieuNai, AddThongKeKhieuNai, UpdateThongKeKhieuNai, DeleteThongKeKhieuNai ), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer