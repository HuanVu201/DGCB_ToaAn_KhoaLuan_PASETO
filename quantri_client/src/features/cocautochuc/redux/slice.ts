import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { AddCoCauToChuc, DeleteChildGroups, DeleteCoCauToChuc, GetCoCauToChuc, PortalSearchCoCauToChuc, SearchCoCauToChuc, SearchCoCauToChucPhongBan, UpdateCoCauToChuc } from "./crud";
import type { DataNode } from 'antd/es/tree';
import { isPending, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { CoCauToChuc } from "@/models/cocautochuc";
export interface CoCauToChucState extends ExtendedState<CoCauToChuc, {
    phongBans: CoCauToChuc[], 
    phongBanCount: number,
    maTinh: CoCauToChuc[] | undefined, maHuyen: CoCauToChuc[] | undefined, maXa: CoCauToChuc[] | undefined
    }, "phongBans" | "phongBanCount" | "maHuyen" | "maTinh" | "maXa"> {
}

const initialState: CoCauToChucState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "coCauToChuc",
    initialState,
    reducers: {
        resetMaTinh: (state) => {
            state.maTinh = undefined
        },
        resetMaHuyen: (state) => {
            state.maHuyen = undefined
        },
        resetMaXa: (state) => {
            state.maXa = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchCoCauToChuc.fulfilled, (state, action) => {
                state.count = action.payload.totalCount
                state.loading = false
                const type =  action.meta.arg.cataLog
                if(action.meta.arg.getAllChildren){
                    const datas = action.payload.data.map((x) => {
                        if(x.groupCode == action.meta.arg.groupCode){
                            return ({...x, ofGroupCode: null, ofGroupName: null})
                        }
                        return x
                    })
                    state.datas= datas
                } else {
                    state.datas = action.payload.data
                }
            })
            .addCase( PortalSearchCoCauToChuc.fulfilled, (state, action) => {
                state.datas = action.payload.data
                state.count = action.payload.totalCount
                state.loading = false
                const type =  action.meta.arg.cataLog
                state.datas = action.payload.data
                if(type == "so-ban-nganh")
                    state.maTinh = action.payload.data
                else if(type == "quan-huyen")
                    state.maHuyen = action.payload.data
                else if(type == "xa-phuong")
                    state.maXa = action.payload.data
            })
           
            .addCase(SearchCoCauToChucPhongBan.fulfilled, (state, action) => {
                state.phongBans = action.payload.data
                state.phongBanCount = action.payload.totalCount
                state.loading = false
            })
            .addCase(GetCoCauToChuc.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.loading = false
            })
            .addCase(AddCoCauToChuc.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateCoCauToChuc.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteCoCauToChuc.fulfilled, () => {
                toast.success("Xóa thành công")
            })
            .addCase(DeleteChildGroups.fulfilled, () => {
                toast.success("Xoá nhóm con thành công")
            })
            .addMatcher(isPending(SearchCoCauToChuc, PortalSearchCoCauToChuc,GetCoCauToChuc, AddCoCauToChuc, UpdateCoCauToChuc, DeleteCoCauToChuc), (state) => {
                state.loading = true
            })
            .addMatcher(isRejectedWithValue(SearchCoCauToChuc, GetCoCauToChuc, AddCoCauToChuc, UpdateCoCauToChuc, DeleteCoCauToChuc,DeleteChildGroups), (state, action) => {
                toast.error(action.error.message)
                state.loading = false
            })
    }
})


export default Slice.reducer

export const { resetData, resetDatas, resetMaTinh, resetMaHuyen, resetMaXa } = Slice.actions;