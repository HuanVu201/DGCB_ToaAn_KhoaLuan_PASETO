import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { AddScreenAction, AddScreenActions, DeleteScreenAction, GetScreenAction, SearchActionNotInScreenModal, SearchScreenAction, SearchScreenActionCanBo } from "./crud";
import { IScreenAction, ScreenType } from "../models";
import type { DataNode } from 'antd/es/tree';
import { PayloadAction, isPending, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { IAction } from "@/features/action/models";
export interface IScreenActionState extends ExtendedState<IScreenAction, 
    {actions: IAction[], actionCount: number, actionInModals: IScreenAction[] | undefined, actionInTables: IScreenAction[] | undefined, filteredActions: IScreenAction[] | undefined}
    ,"actions"| "actionCount" | "actionInModals" | "actionInTables" | "filteredActions"> {
}

const initialState: IScreenActionState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "ScreenAction",
    initialState,
    reducers: {
        setFilterActionByMaScreen : (state, action : PayloadAction<ScreenType>) => {
            state.filteredActions = state.datas?.filter(x => x.maScreen === action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchScreenAction.fulfilled, (state, action) => {
                state.datas = action.payload.data || undefined
                state.count = action.payload.totalCount
                state.actionInModals = action.payload.data?.filter((action) => action.showInModal && action.showActionInModal)
                state.actionInTables = action.payload.data?.filter((action) => action.showInTable && action.showActionInTable)
                state.loading = false
            })
            .addCase(SearchScreenActionCanBo.fulfilled, (state, action) => {
                const filteredActionByMaScreen = action.payload.data.filter(x => x.maScreen == action.meta.arg.maScreen)
                state.datas = action.payload.data || undefined
                state.filteredActions = filteredActionByMaScreen || undefined
                state.count = action.payload.totalCount
                state.actionInModals = filteredActionByMaScreen?.filter((actionItem) => actionItem.showInModal && actionItem.showActionInModal)
                state.actionInTables = filteredActionByMaScreen?.filter((actionItem) => actionItem.showInTable && actionItem.showActionInTable)
                state.loading = false
            })
            .addCase(SearchActionNotInScreenModal.fulfilled, (state, action) => {
                state.actions = action.payload.data
                state.actionCount = action.payload.totalCount
                state.loading = false
            })
            .addCase(GetScreenAction.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
            })
            .addCase(AddScreenAction.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddScreenActions.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(DeleteScreenAction.fulfilled, () => {
                toast.success("Xóa thành công")
            })
            .addMatcher(isPending(SearchScreenAction, GetScreenAction, AddScreenActions, AddScreenAction, DeleteScreenAction), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchScreenAction, GetScreenAction, AddScreenActions, AddScreenAction, DeleteScreenAction), (state, action) => {
                toast.error("Thao tác thất bại")
                state.loading = false
            })
    }
})


export default Slice.reducer

export const { resetData, resetDatas, setFilterActionByMaScreen } = Slice.actions;