import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { AddNhomDonVi, DeleteNhomDonVi, GetNhomDonVi, SearchNhomDonViAction, UpdateNhomDonVi } from "./action";
import { isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { LienKetBuocXuLy } from "@/models/lienKetBuocXuLy";
import { BuocXuLy } from "@/models/buocXuLy";
import { Node, Edge } from "reactflow"
import { NhomDonVi } from "@/models/nhomDonVi";

export interface INhomDonViState extends ExtendedState<NhomDonVi, {
    nodes: Node<BuocXuLy>[];
    edges: Edge<LienKetBuocXuLy>[];
}>{
}

const initialState : INhomDonViState = {
    loading: false,
    nodes: [],
    edges: [],
}

const Slice = createGenericSlice({
    name: "NhomDonVi",
    initialState,
    reducers: {
        resetGetFlowData: (state) => {
            state.nodes = []
            state.edges = []
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(SearchNhomDonViAction.pending, (state) => {
            state.loading = true;
            state.datas = undefined;
            state.count = undefined;
        })
        .addCase(SearchNhomDonViAction.fulfilled, (state, action) => {
            state.loading = false
            state.datas = action.payload.data
            state.count = action.payload.totalCount
        })
        .addCase(GetNhomDonVi.pending, (state) => {
            state.loading = true;
            state.data = undefined;
            state.count = undefined;
        })
        .addCase(GetNhomDonVi.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload.data
        })
        .addCase(AddNhomDonVi.fulfilled, () => {
            toast.success("Thêm thành công")
        })
        .addCase(UpdateNhomDonVi.fulfilled, () => {
            toast.success("Cập nhật thành công")
        })
        .addCase(DeleteNhomDonVi.fulfilled, () => {
            toast.success("Xóa tạm thời thành công")
        })
        .addMatcher(isPending( SearchNhomDonViAction, GetNhomDonVi, AddNhomDonVi, UpdateNhomDonVi, DeleteNhomDonVi), (state) => {
            state.loading = true
        })
        .addMatcher(isRejectedWithValue(SearchNhomDonViAction, GetNhomDonVi, AddNhomDonVi, UpdateNhomDonVi, DeleteNhomDonVi), (state, action) => {
            state.loading = false
            toast.error(action.payload.message ?? "Thao tác thất bại")
        })
    }
})

export const {resetData, resetDatas, resetGetFlowData} = Slice.actions

export default Slice.reducer