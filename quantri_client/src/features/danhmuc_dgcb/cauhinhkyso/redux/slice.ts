import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { ICauHinhKySo } from "../models";
import { AddCauHinhKySo, DeleteCauHinhKySo, GetCauHinhKySo, SearchCauHinhKySo, SearchCauHinhKySoTheoDonVi, UpdateCauHinhKySo } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface ICauHinhKySoState extends ExtendedState<ICauHinhKySo> {

}

const initialState: ICauHinhKySoState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "CauHinhKySo",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchCauHinhKySo.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchCauHinhKySoTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })

            .addCase(GetCauHinhKySo.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddCauHinhKySo.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateCauHinhKySo.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteCauHinhKySo.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchCauHinhKySo, GetCauHinhKySo, AddCauHinhKySo, UpdateCauHinhKySo, DeleteCauHinhKySo, SearchCauHinhKySoTheoDonVi), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchCauHinhKySo, GetCauHinhKySo, AddCauHinhKySo, UpdateCauHinhKySo, DeleteCauHinhKySo, SearchCauHinhKySoTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer