import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IConfig } from "../models";
import { AddConfig, DeleteConfig, GetConfig, SearchConfig, SearchPublicConfig, UpdateConfig } from "./action";
import {toast} from 'react-toastify'

export interface IConfigState extends ExtendedState<IConfig, {
    publicModule: Pick<IConfig, "content" | "code">[] | undefined;
}, "publicModule">{

}

const initialState : IConfigState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "config",
    initialState,
    reducers: {
        resetPublicModule: (state) => {
            state.publicModule = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchConfig.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchConfig.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchConfig.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetConfig.pending, (state) => {
                state.loading = true
            })
            .addCase(GetConfig.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddConfig.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddConfig.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateConfig.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateConfig.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteConfig.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteConfig.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(SearchPublicConfig.fulfilled, (state, action) => {
                state.publicModule = action.payload.data
            })
           
    }
})

export const {resetData, resetDatas, resetPublicModule} = Slice.actions

export default Slice.reducer