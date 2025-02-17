import { toast } from "react-toastify";
import createGenericSlice, { GenericState, ExtendedState } from "../../../lib/redux/GenericSlice";
import { ICredential, IParseUserToken } from "../../../models";
import { GetUser, GetUserById, SearchUser, UpdateUser, DeleteUser, ChangePasswordUser, AdminResetPassword, GetUserFromCSDLDanCu, CreateUserWithDefaultPassword, ChangeUserGroup, SearchUserGruop } from "./Actions";
import { GetCSDLDanCuResponse, IUser, ThongTinCSDLDanCuSearchParams } from "../models";
import { PayloadAction, createAction, isFulfilled, isPending, isRejected, isRejectedWithValue } from "@reduxjs/toolkit";
import { toCamel } from "@/utils/common";
import { User } from "@/models/user";
import { UserGroup, UserGroupResponse } from "@/models/userGroup";

export interface IAuthState extends ExtendedState<User, {
    donViThuTucUsers?: User[];
    userGroups: UserGroupResponse[];
},  "donViThuTucUsers" | "userGroups"> {
}

const initialState: IAuthState = {
    loading: false
}

export const Slice = createGenericSlice({
    name: "user",
    initialState,
    reducers: {
        resetDonViThuTucUsers: (state) => {
            state.donViThuTucUsers = undefined
        },
        setUserData: (state, action: PayloadAction<IParseUserToken>) => {
            const payload = action.payload
            state.data = {
                email: payload.email,
                fullName: payload.fullName,
                typeUser: payload.typeUser,
                officeCode: payload.officeCode,
                tenDonVi: payload.tenDonVi,
                userGroupId: payload.userGroupId,
                tenPhongBan: payload.tenPhongBan,
                maDonViCha: payload.maDonViCha,
                id: payload.uid,
                userName: payload.sub,
                groupCode: payload.groupCode,
                forcePasswordChange: payload.forcePasswordChange
            } as unknown as User
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(SearchUser.fulfilled, (state, action) => {
                state.loading = false
                state.userGroups = action.payload.data
                state.count = action.payload.totalCount
            })
            .addCase(GetUser.pending, (state) => {
                state.loading = true
            })
            .addCase(GetUser.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(SearchUserGruop.fulfilled, (state, action) => {
                state.userGroups = action.payload.data
                state.loading = false
            })
            .addCase(GetUser.rejected, (state, action) => {
                state.error = action.payload?.message
                state.loading = false
            })
            .addCase(GetUserById.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(GetUserById.rejected, (state) => {
                state.loading = false
            })
            

            .addCase(UpdateUser.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(UpdateUser.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            .addCase(ChangeUserGroup.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(ChangeUserGroup.rejected, (_, action) => {
                toast.error(action.error.message)
            })

            .addCase(ChangePasswordUser.fulfilled, () => {
                toast.success("Cập nhật thành công")
            })
            .addCase(ChangePasswordUser.rejected, (_, action) => {
                toast.error(action.error.message)
            })
            
            .addCase(DeleteUser.fulfilled, () => {
                toast.success("Xóa thành công")
            })
            .addCase(DeleteUser.rejected, (_, action) => {
            
                toast.error(action.error.message)
            })
            .addCase(AdminResetPassword.fulfilled, (state,action) => {
               
                state.loading= false
            })
            .addCase(AdminResetPassword.rejected, (_, action) => {
               
                toast.error(action.error.message)
            })
            .addCase(CreateUserWithDefaultPassword.fulfilled, () => {
                toast.success("Thêm mới người dùng thành công")
            })

            .addCase(CreateUserWithDefaultPassword.rejected, (_, action) => {
               
                toast.error("Thêm mới tài khoản thất bại")
                console.log(action);
                
            })
            .addMatcher(isPending(GetUser, GetUserById), (state) => {
                state.loading = true
            })
    }
})
const { reducer, actions } = Slice

export default reducer

export const { resetData, setUserData, resetDonViThuTucUsers } = actions;
export const logout = createAction('LOGOUT');