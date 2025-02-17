import { createAsyncThunk } from "@reduxjs/toolkit";
import { DashBoardServiceApi } from "../service/DashBoardService";
import { IError, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "@/models";
import { GetThongKeDonVi, IDasshBoards, IGetDanhSachDanhGia, IGetNhacViec, ISearchDashBoards } from "../models";

export const SearchDashBoard =
    createAsyncThunk<IPaginationResponse<IGetNhacViec[]>, ISearchDashBoards>("SearchDashBoard", async (params, thunkApi) => {
        try {
            const res = await DashBoardServiceApi.Search(params)
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })
export const GetDashBoard =
    createAsyncThunk<IResult<IDasshBoards>, string>("GetDashBoard", async (id, thunkApi) => {
        try {
            const res = await DashBoardServiceApi.Get(id);
            return res.data
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    })

export const AddDashBoard = createAsyncThunk("AddDashBoard", async (data: IDasshBoards, thunkApi) => {
    try {
        const res = await DashBoardServiceApi.Create(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDashBoard({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})


export const UpdateDashBoard = createAsyncThunk("UpdateDashBoard", async (data: IOmitUpdate<IDasshBoards>, thunkApi) => {
    try {
        const res = await DashBoardServiceApi.Update(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDashBoard({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const DeleteDashBoard = createAsyncThunk("DeleteDashBoard", async (data: ISoftDelete, thunkApi) => {
    try {
        const res = await DashBoardServiceApi.Delete(data);
        if (res.status === 200) {
            thunkApi.dispatch(SearchDashBoard({ reFetch: true }))
        }
        return res.data

    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
}) 

// export const GetNhacViec =
//     createAsyncThunk<IResult<IGetNhacViec>, string>("GetNhacViec", async (data: IGetNhacViec, thunkApi) => {
//         try {
//             const res = await DashBoardServiceApi.GetNhacViec(data);
//             return res.data
//         } catch (error) {
//             return thunkApi.rejectWithValue(error)
//         }
//     })

    
export const GetNhacViec = createAsyncThunk("GetNhacViec", async (data: IGetNhacViec, thunkApi) => {
    try {
        const res = await DashBoardServiceApi.GetNhacViec(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDashBoard({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const GetTKDonVi = createAsyncThunk("GetTKDonVi", async (data: GetThongKeDonVi , thunkApi) => {
    try {
        const res = await DashBoardServiceApi.GetThongKeDonVi(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDashBoard({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const GetTKDonViNotChild = createAsyncThunk("GetTKDonViNotChild", async (data: GetThongKeDonVi , thunkApi) => {
    try {
        const res = await DashBoardServiceApi.GetThongKeDonVi(data);
        if (res.status === 201) {
            thunkApi.dispatch(SearchDashBoard({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const GetListUserResponeOfGetDanhSachDanhGia = createAsyncThunk("GetListUserResponeOfDanhSachDanhGia", async (data: IGetDanhSachDanhGia , thunkApi) => {
    try {
        const res = await DashBoardServiceApi.GetDanhSachUserDanhGia(data)
        if (res.status === 201) {
            thunkApi.dispatch(SearchDashBoard({ reFetch: true }))
        }
        return res.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})