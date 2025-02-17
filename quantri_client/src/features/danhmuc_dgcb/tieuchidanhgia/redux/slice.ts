
import createGenericSlice, { ExtendedState }  from "@/lib/redux/GenericSlice";
import { ITieuChiDanhGia } from "../models";
import { AddTieuChiDanhGia, DeleteTieuChiDanhGia, GetTieuChiDanhGia, SearchTieuChiDanhGia, SearchTieuChiDanhGiaAdmin, UpdateTieuChiDanhGia } from "./action";
import {toast} from 'react-toastify'

export interface ITieuChiDanhGiaState extends ExtendedState<ITieuChiDanhGia, {
    danhSachTieuChiDanhGia?: ITieuChiDanhGia[];
    sideBarTieuChiDanhGia?: ITieuChiDanhGia[];
    navigationTieuChiDanhGia?: ITieuChiDanhGia[];
    activeModule?: string
}, "danhSachTieuChiDanhGia" | "sideBarTieuChiDanhGia" | "navigationTieuChiDanhGia"| "activeModule">{

}

const initialState : ITieuChiDanhGiaState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "tieuchidanhgia",
    initialState,
    reducers: {
        resetModule: (state) => {
            state.activeModule = undefined;
        },
        setNavTieuChiDanhGia: (state, action) => {
            state.navigationTieuChiDanhGia = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchTieuChiDanhGia.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchTieuChiDanhGia.fulfilled, (state, action) => {
                // state.loading = false
                // const navTieuChiDanhGia : ITieuChiDanhGia[] = []
                // const sideTieuChiDanhGia : ITieuChiDanhGia[] = []
                // action.payload.data.forEach(tieuchidanhgia => {
                //      tieuchidanhgia.isTopTieuChiDanhGia == true ? navTieuChiDanhGia?.push(tieuchidanhgia) : sideTieuChiDanhGia?.push(tieuchidanhgia)

                // })
                // state.activeModule = action.meta.arg.module                
                // state.sideBarTieuChiDanhGia = sideTieuChiDanhGia
                // state.navigationTieuChiDanhGia = navTieuChiDanhGia
                // state.count = action.payload.totalCount
                state.loading = false
                state.danhSachTieuChiDanhGia = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchTieuChiDanhGia.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(SearchTieuChiDanhGiaAdmin.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchTieuChiDanhGiaAdmin.fulfilled, (state, action) => {
                state.loading = false
                state.danhSachTieuChiDanhGia = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchTieuChiDanhGiaAdmin.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetTieuChiDanhGia.pending, (state) => {
                state.loading = true
            })
            .addCase(GetTieuChiDanhGia.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddTieuChiDanhGia.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddTieuChiDanhGia.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateTieuChiDanhGia.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateTieuChiDanhGia.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteTieuChiDanhGia.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteTieuChiDanhGia.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas, resetModule, setNavTieuChiDanhGia} = Slice.actions

export default Slice.reducer