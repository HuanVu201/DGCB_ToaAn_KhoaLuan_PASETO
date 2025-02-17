import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ICauHinhHeThong } from "../models";
import { AddCauHinhHeThong, DeleteCauHinhHeThong, GetCauHinhHeThong, SearchCauHinhHeThong, UpdateCauHinhHeThong } from "./action";
import {toast} from 'react-toastify'

export interface ICauHinhHeThongState extends ExtendedState<ICauHinhHeThong>{

}

const initialState : ICauHinhHeThongState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "cauhinhhethong",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchCauHinhHeThong.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchCauHinhHeThong.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchCauHinhHeThong.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetCauHinhHeThong.pending, (state) => {
                state.loading = true
            })
            .addCase(GetCauHinhHeThong.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddCauHinhHeThong.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddCauHinhHeThong.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateCauHinhHeThong.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateCauHinhHeThong.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteCauHinhHeThong.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteCauHinhHeThong.rejected, (_, action) => {
                toast.error(action.error.message)
            })
           
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer