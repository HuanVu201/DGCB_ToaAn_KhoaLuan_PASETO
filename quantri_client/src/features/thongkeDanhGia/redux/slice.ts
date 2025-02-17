import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { IDanhMuc_ThongKeDanhGia, IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ, IDanhMuc_ThongKeDanhGia_GetTongHopCaNhan } from "../models";
import { AddDanhMuc_ThongKeDanhGia, DeleteDanhMuc_ThongKeDanhGia, GetDanhMuc_ThongKeDanhGia, SearchDanhMuc_ThongKeDanhGia, SearchDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ, SearchDanhMuc_ThongKeDanhGia_GetTongHopCaNhan, SearchDanhMuc_ThongKeDanhGiaTheoDonVi, UpdateDanhMuc_ThongKeDanhGia } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDanhMuc_ThongKeDanhGiaState extends ExtendedState<IDanhMuc_ThongKeDanhGia,{
    dataDuLieuPhieuCQ?: IDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ[];
    dataGetTongHopCaNhan?: IDanhMuc_ThongKeDanhGia_GetTongHopCaNhan[];
},"dataDuLieuPhieuCQ"|"dataGetTongHopCaNhan">{

}

const initialState: IDanhMuc_ThongKeDanhGiaState = {
    loading: false,
    dataDuLieuPhieuCQ: [],
    dataGetTongHopCaNhan:[],
}

const Slice = createGenericSlice({
    name: "DanhMuc_ThongKeDanhGia",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDanhMuc_ThongKeDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_ThongKeDanhGiaTheoDonVi.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_ThongKeDanhGia_DuLieuPhieuCQ.fulfilled, (state, action) => {
                state.loading = false
                state.dataDuLieuPhieuCQ = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchDanhMuc_ThongKeDanhGia_GetTongHopCaNhan.fulfilled, (state, action) => {
                state.loading = false
                state.dataGetTongHopCaNhan = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetDanhMuc_ThongKeDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDanhMuc_ThongKeDanhGia.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDanhMuc_ThongKeDanhGia.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDanhMuc_ThongKeDanhGia.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
            .addMatcher(isPending(SearchDanhMuc_ThongKeDanhGia, GetDanhMuc_ThongKeDanhGia, AddDanhMuc_ThongKeDanhGia, UpdateDanhMuc_ThongKeDanhGia, DeleteDanhMuc_ThongKeDanhGia, SearchDanhMuc_ThongKeDanhGiaTheoDonVi,), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchDanhMuc_ThongKeDanhGia, GetDanhMuc_ThongKeDanhGia, AddDanhMuc_ThongKeDanhGia, UpdateDanhMuc_ThongKeDanhGia, DeleteDanhMuc_ThongKeDanhGia, SearchDanhMuc_ThongKeDanhGiaTheoDonVi), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
            

    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer