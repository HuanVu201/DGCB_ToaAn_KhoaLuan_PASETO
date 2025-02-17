import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { AddDanhMuc_ChucVu, DeleteDanhMuc_ChucVu, GetDanhMuc_ChucVu, SearchDanhMuc_ChucVu, UpdateDanhMuc_ChucVu } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { ChucVu } from "@/models/chucVu";

export interface ChucVuState extends ExtendedState<ChucVu> {

}

const initialState: ChucVuState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DanhMuc_ChucVu",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_ChucVu.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetDanhMuc_ChucVu.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_ChucVu.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_ChucVu.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_ChucVu.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_ChucVu, GetDanhMuc_ChucVu, AddDanhMuc_ChucVu, UpdateDanhMuc_ChucVu, DeleteDanhMuc_ChucVu), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_ChucVu, GetDanhMuc_ChucVu, AddDanhMuc_ChucVu, UpdateDanhMuc_ChucVu, DeleteDanhMuc_ChucVu), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer