import { toast } from "react-toastify";
import { ExtendedState } from "@/lib/redux/GenericSlice";
import createGenericSlice from "@/lib/redux/GenericSlice";
import { IDanhMucChung } from "../models";
import { AddDanhMucChung, DeleteDanhMucChung, GetDanhMucChung, SearchDanhMucChung , UpdateDanhMucChung } from "./action";

export interface IDanhMucChungState extends ExtendedState<IDanhMucChung>{

}

const initialState : IDanhMucChungState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "danhmucchung",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchDanhMucChung.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchDanhMucChung.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMucChung.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetDanhMucChung.pending, (state) => {
                state.loading = true
            })
            .addCase(GetDanhMucChung.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(GetDanhMucChung.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(AddDanhMucChung.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddDanhMucChung.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateDanhMucChung.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateDanhMucChung.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteDanhMucChung.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteDanhMucChung.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer