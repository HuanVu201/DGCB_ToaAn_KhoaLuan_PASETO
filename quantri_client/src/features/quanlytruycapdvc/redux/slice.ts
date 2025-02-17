import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { ILogAuthen } from "../model";
import { SearchLogAuthen, GetLogAuthenDetail } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface ILogAuthenState extends ExtendedState<ILogAuthen> {

}

const initialState: ILogAuthenState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "logAuthen",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchLogAuthen.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetLogAuthenDetail.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })

            .addMatcher(isPending(SearchLogAuthen, GetLogAuthenDetail), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchLogAuthen, GetLogAuthenDetail), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer