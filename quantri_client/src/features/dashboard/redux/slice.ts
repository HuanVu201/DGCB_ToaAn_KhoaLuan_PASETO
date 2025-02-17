import { toast } from "react-toastify";
import createGenericSlice, { ExtendedState } from "@/lib/redux/GenericSlice";
import { GetThongKeDonVi, IDashBoards, IGetNhacViec, IResponesGetThongKeDonVi, IUserResponeOfGetDanhSach } from "../models";
import { AddDashBoard, DeleteDashBoard, GetDashBoard, GetListUserResponeOfGetDanhSachDanhGia, GetNhacViec, GetTKDonVi, GetTKDonViNotChild, SearchDashBoard, UpdateDashBoard } from "./action";
import { isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";

export interface IDashBoardState extends ExtendedState<IDashBoards, {
    listNhacViec?: IGetNhacViec[];
    listTkDonVi?: GetThongKeDonVi[];
    listTkDonViNotChild?: GetThongKeDonVi[];
    listUser?: IUserResponeOfGetDanhSach[];
}, "listNhacViec" | "listTkDonVi" | "listTkDonViNotChild" | "listUser"> {

}

const initialState: IDashBoardState = {
    loading: false,
}

const Slice = createGenericSlice({
    name: "DashBoards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchDashBoard.fulfilled, (state, action) => {
                state.loading = false
                state.datas = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetNhacViec.fulfilled, (state, action) => {
                state.count = action.payload.totalCount
                state.loading = false
                state.listNhacViec = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetTKDonVi.fulfilled, (state, action) => {
                state.count = action.payload.totalCount
                state.loading = false
                state.listTkDonVi = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetTKDonViNotChild.fulfilled, (state, action) => {
                state.count = action.payload.totalCount
                state.loading = false
                state.listTkDonViNotChild = action.payload.data
                // state.listTkDonViNotChild = action.payload.data.sort((a: any,b: any) => {
                //     // Thực hiện so sánh giữa 'a' và 'b' theo một trường cụ thể, ví dụ 'name'
                //     // Ví dụ: nếu muốn sắp xếp theo tên (alphabetical order):
                //     return a.thoiGianQuery.localeCompare(b.thoiGianQuery); // Nếu muốn sắp xếp theo tên theo thứ tự tăng dần
                // });
                // state.listTkDonViNotChild = action.payload.data.sort((a: any,b: any) => a.thoiGianQuery - b.thoiGianQuery);
                state.count = action.payload.totalCount
            })
            .addCase(GetListUserResponeOfGetDanhSachDanhGia.fulfilled, (state, action) => {
                state.count = action.payload.totalCount
                state.loading = false
                state.listUser = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetDashBoard.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload.data
            })
            .addCase(AddDashBoard.fulfilled, () => {
                toast.success("Thêm thành công")
            })
            .addCase(UpdateDashBoard.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(DeleteDashBoard.fulfilled, () => {
                toast.success("Thao tác thành công")
            })
        // .addMatcher(isRejectedWithValue(SearchDashBoard, GetDashBoard, AddDashBoard, UpdateDashBoard, DeleteDashBoard, SearchDashBoardTheoDonVi), (state, action) => {
        //     toast.error(action.error.message)
        //     state.loading = false
        // })
    }
})

export const { resetData, resetDatas } = Slice.actions

export default Slice.reducer