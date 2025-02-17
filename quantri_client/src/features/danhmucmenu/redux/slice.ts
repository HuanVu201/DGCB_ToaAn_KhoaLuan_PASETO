import createGenericSlice, { ExtendedState } from "../../../lib/redux/GenericSlice";
import { IMenu } from "../models";
import { AddMenu, DeleteMenu, GetMenu, SearchMenu, SearchMenuAdmin, UpdateMenu } from "./action";
import {toast} from 'react-toastify'

export interface IMenuState extends ExtendedState<IMenu, {
    danhSachMenu?: IMenu[];
    sideBarMenu?: IMenu[];
    navigationMenu?: IMenu[];
    activeModule?: string
}, "danhSachMenu" | "sideBarMenu" | "navigationMenu"| "activeModule">{

}

const initialState : IMenuState = {
    loading: false
}

const Slice = createGenericSlice({
    name: "menu",
    initialState,
    reducers: {
        resetModule: (state) => {
            state.activeModule = undefined;
        },
        setNavMenu: (state, action) => {
            state.navigationMenu = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchMenu.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchMenu.fulfilled, (state, action) => {
                state.loading = false
                const navMenu : IMenu[] = []
                const sideMenu : IMenu[] = []
                action.payload.data.forEach(menu => {
                    menu.isTopMenu == true ? navMenu?.push(menu) : sideMenu?.push(menu)
                })
                state.activeModule = action.meta.arg.module                
                state.sideBarMenu = sideMenu
                state.navigationMenu = navMenu
                state.count = action.payload.totalCount
            })
            .addCase(SearchMenu.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(SearchMenuAdmin.pending, (state) => {
                state.loading = true
            })
            .addCase(SearchMenuAdmin.fulfilled, (state, action) => {
                state.loading = false
                state.danhSachMenu = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(SearchMenuAdmin.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(GetMenu.pending, (state) => {
                state.loading = true
            })
            .addCase(GetMenu.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddMenu.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(AddMenu.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(UpdateMenu.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateMenu.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(DeleteMenu.fulfilled, () => {
                toast.success("Xóa tạm thời thành công")
            })
            .addCase(DeleteMenu.rejected, (_, action) => {
                toast.error(action.error.message)
            })
    }
})

export const {resetData, resetDatas, resetModule, setNavMenu} = Slice.actions

export default Slice.reducer