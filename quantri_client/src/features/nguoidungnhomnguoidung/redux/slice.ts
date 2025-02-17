import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { INguoiDungNhomNguoiDung } from "../models";
import { AddNguoiDungNhomNguoiDung, DeleteNguoiDungNhomNguoiDung, GetNguoiDungNhomNguoiDung, SearchNguoiDungNhomNguoiDung, SearchUserNotInNhom, AddNguoiDungNhomNguoiDungs} from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { IUser } from "@/features/user/models";

export interface INguoiDungNhomNguoiDungState extends ExtendedState<INguoiDungNhomNguoiDung, {
    users: IUser[],
    userCount: number
}, "userCount" | "users">{

}

const initialState : INguoiDungNhomNguoiDungState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "NguoiDungNhomNguoiDung",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(SearchNguoiDungNhomNguoiDung.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchUserNotInNhom.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload.data
                state.userCount = action.payload.totalCount
            })
            .addCase(SearchNguoiDungNhomNguoiDung.rejected, (state) => {
                state.loading = false
            })
            .addCase(GetNguoiDungNhomNguoiDung.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddNguoiDungNhomNguoiDung.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddNguoiDungNhomNguoiDungs.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(DeleteNguoiDungNhomNguoiDung.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchNguoiDungNhomNguoiDung, GetNguoiDungNhomNguoiDung, AddNguoiDungNhomNguoiDung, DeleteNguoiDungNhomNguoiDung), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(AddNguoiDungNhomNguoiDung, DeleteNguoiDungNhomNguoiDung), (state, action) => {
                toast.error("Thao tác thất bại")
                state.loading = false
            })
    }
})

export const {resetData, resetDatas} = Slice.actions

export default Slice.reducer