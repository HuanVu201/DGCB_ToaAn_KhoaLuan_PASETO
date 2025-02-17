import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { AddFlowQuyTrinhXuLy, AddQuyTrinhXuLy, DeleteQuyTrinhXuLy, GetFlowQuyTrinhXuLy, GetQuyTrinhXuLy, SearchQuyTrinhXuLyAction, UpdateFlowQuyTrinhXuLy, UpdateQuyTrinhXuLy } from "./action";
import { isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { QuyTrinhXuLy } from "@/models/quytrinhxuly";
import { LienKetBuocXuLy } from "@/models/lienKetBuocXuLy";
import { BuocXuLy } from "@/models/buocXuLy";
import { Node, Edge } from "reactflow"

export interface IQuyTrinhXuLyState extends ExtendedState<QuyTrinhXuLy, {
    nodes: Node<BuocXuLy>[];
    edges: Edge<LienKetBuocXuLy>[];
}>{
}

const initialState : IQuyTrinhXuLyState = {
    loading: false,
    nodes: [],
    edges: [],
}

const Slice = createGenericSlice({
    name: "QuyTrinhXuLy",
    initialState,
    reducers: {
        resetGetFlowData: (state) => {
            state.nodes = []
            state.edges = []
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(SearchQuyTrinhXuLyAction.pending, (state) => {
            state.loading = true;
            state.datas = undefined;
            state.count = undefined;
        })
        .addCase(SearchQuyTrinhXuLyAction.fulfilled, (state, action) => {
            state.loading = false
            state.datas = action.payload.data
            state.count = action.payload.totalCount
        })
        .addCase(GetQuyTrinhXuLy.pending, (state) => {
            state.loading = true;
            state.data = undefined;
            state.count = undefined;
        })
        .addCase(GetQuyTrinhXuLy.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload.data
        })
        .addCase(AddQuyTrinhXuLy.fulfilled, () => {
            toast.success("Thêm thành công")
        })
        .addCase(UpdateQuyTrinhXuLy.fulfilled, () => {
            toast.success("Cập nhật thành công")
        })
        .addCase(DeleteQuyTrinhXuLy.fulfilled, () => {
            toast.success("Xóa tạm thời thành công")
        })
        .addCase(GetFlowQuyTrinhXuLy.pending, (state) => {
            state.nodes = [];
            state.edges = [];
            state.loading = true;
        })
        .addCase(GetFlowQuyTrinhXuLy.fulfilled, (state, action) => {
            state.nodes = action.payload.data.nodes;
            state.edges = action.payload.data.edges;
            state.loading = false;
        })
        .addMatcher(isPending(UpdateFlowQuyTrinhXuLy, AddFlowQuyTrinhXuLy, SearchQuyTrinhXuLyAction, GetQuyTrinhXuLy, AddQuyTrinhXuLy, UpdateQuyTrinhXuLy, DeleteQuyTrinhXuLy), (state) => {
            state.loading = true
        })
        .addMatcher(isRejectedWithValue(UpdateFlowQuyTrinhXuLy, AddFlowQuyTrinhXuLy, SearchQuyTrinhXuLyAction, GetQuyTrinhXuLy, AddQuyTrinhXuLy, UpdateQuyTrinhXuLy, DeleteQuyTrinhXuLy), (state, action) => {
            state.loading = false
            toast.error(action.payload.message ?? "Thao tác thất bại")
        })
    }
})

export const {resetData, resetDatas, resetGetFlowData} = Slice.actions

export default Slice.reducer