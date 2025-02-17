import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { ILstUsers} from "../models";
import { AddLstUsers, DeleteLstUsers, GetLstUsers, SearchListAUGNotPermission, SearchListAUGNotPermissionDanhGia, SearchListAUGOfGroupQuery, SearchLstUsers, SearchUserNotBuocXuLy, UpdateLstUsers} from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface ILstUsersState extends ExtendedState<ILstUsers> {

}

const initialState: ILstUsersState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "LstUsers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchLstUsers.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchListAUGOfGroupQuery.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchListAUGNotPermissionDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchListAUGNotPermission.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchUserNotBuocXuLy.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetLstUsers.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddLstUsers.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateLstUsers.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteLstUsers.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchLstUsers, GetLstUsers, AddLstUsers, UpdateLstUsers, DeleteLstUsers, SearchListAUGOfGroupQuery), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchLstUsers, GetLstUsers, AddLstUsers, UpdateLstUsers, DeleteLstUsers, SearchListAUGOfGroupQuery), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer