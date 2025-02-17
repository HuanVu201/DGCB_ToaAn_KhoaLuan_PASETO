import { Service } from "../../../services/base";
import { API_VERSION_DEFAULT, VITE_THONGTINCSDLDANCU_API_ENDPOINT } from "../../../data/constant";
import { AxiosResponseWrapper } from "../../../lib/axios/typeHelper";
import { IBaseExt, ICredential, ILogin, IOmitUpdate, IPaginationResponse, IPickSearch, IResult, ISoftDelete } from "../../../models";

import { IUpdateUserRole, ThongTinCSDLDanCuSearchParams, GetCSDLDanCuResponse, ISearchUser, ILogOut, SearchNhomLanhDaoResponse, ISearchUserByPermision, UpdateEmailAndPhoneNumberPortalParams, IUserRole, IPasswordResetOptions } from "../models";

import axiosInstance from "@/lib/axios";
import { IChangePassWord } from "../models";
import axios from "axios";
import { CreateUserWithDefaultPasswordRequest, RemoveUserGroupRequest } from "./params";
import { User } from "@/models/user";
import { UserGroup, UserGroupResponse } from "@/models/userGroup";
import { DanhSachTruongDonViDto, DanhSachUserGroupVaiTroDto, IApplicationUserGroups, INguoiXuLyTiep, ISearchDanhSachNguoiXuLyTiep } from "../models/ApplicationUserGroups";
class UserService extends Service.BaseApi implements Omit<Service.ICrud<User>, "Search"> {
    constructor() {
        super("users", '/api/')
    }
    Update(_params: IOmitUpdate<User>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Search(params: ISearchUser): AxiosResponseWrapper<IPaginationResponse<UserGroupResponse[]>> {
        params = { ...params, typeUser: "CanBo" }
        return axiosInstance.post(this._urlSuffix + "/search", params)
    }
    SearchUserGroup(params: ISearchUser): AxiosResponseWrapper<IPaginationResponse<UserGroupResponse[]>> {
        params = { ...params, typeUser: "CanBo" }
        return axiosInstance.post(this._urlSuffix + "/searchusergroup", params)
    }
    SearchPortal(params: { officeCode?: string; groupCode?: string, laCanBoTiepNhan?: boolean }): AxiosResponseWrapper<IPaginationResponse<User[]>> {
        return axiosInstance.get(this._urlSuffix + "/SearchPortal", { params })

    }
    SearchNhomLanhDao(params: { officeCode: string; groupCode: string }): AxiosResponseWrapper<IPaginationResponse<SearchNhomLanhDaoResponse[]>> {
        return axiosInstance.get(this._urlSuffix + "/nhomlanhdao", { params })
    }
    Get(id: string): AxiosResponseWrapper<IResult<User>> {
        return axiosInstance.get(this._urlSuffix + "/" + id)
    }
    GetById(id: string, token: string = ""): AxiosResponseWrapper<User> {
        if (token) {
            return axiosInstance.get(this._urlSuffix + "/" + id, { headers: { Authorization: `Bearer ${token}` } })
        }
        return axiosInstance.get(this._urlSuffix + "/" + id)
    }
    Create(data: Partial<Omit<User, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix, data)
    }
    Delete(id: ISoftDelete): AxiosResponseWrapper {

        return axiosInstance.delete(this._urlSuffix + "/" + id.id)
    }
    DeleteAccount(data: RemoveUserGroupRequest): AxiosResponseWrapper<IResult<any>> {

        return axiosInstance.delete(this._urlSuffix + "/account", {data: data})
    }
    Restore(id: string): AxiosResponseWrapper {
        return axiosInstance.patch(this._urlSuffix + "/" + id)
    }

    UpdateUser(params: User): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/" + params.id, params)
    }
    UpdatePassword(_params: IOmitUpdate<IChangePassWord>): AxiosResponseWrapper {
        return axiosInstance.put("/api/personal/change-password", _params.data)
    }
    GetUser(data: Pick<ICredential, "token">): AxiosResponseWrapper<User> {
        return axiosInstance.get(this._urlSuffix + '/currentuser', {
            headers: {
                Authorization: `Bearer ${data.token}`
            }
        })
    }
    DanhSachVaiTro(): AxiosResponseWrapper<IResult<DanhSachUserGroupVaiTroDto[]>> {
        return axiosInstance.get(this._urlSuffix + '/currentuser/danhsachvaitro')
    }
    DanhSachTruongDonVi(): AxiosResponseWrapper<IResult<DanhSachTruongDonViDto[]>> {
        return axiosInstance.get(this._urlSuffix + '/DanhSachTruongDonVi')
    }
    GetUserRoles(id: string): AxiosResponseWrapper<IUserRole[]> {
        return axiosInstance.get(this._urlSuffix + `/${id}/roles`)
    }
    GetUserGroupRoles(userId: string, userGroupId: string): AxiosResponseWrapper<IUserRole[]> {
        return axiosInstance.get(this._urlSuffix + `/${userId}/userGroups/${userGroupId}/roles`)
    }
    UpdateUserRoles(userId: string, params: IUpdateUserRole) {
        return axiosInstance.post(this._urlSuffix + `/${userId}/roles`, params)
    }
    UpdateUserGroupRoles(userId: string, userGroupId: string, params: IUpdateUserRole) {
        return axiosInstance.post(this._urlSuffix + `/${userId}/userGroups/${userGroupId}/roles`, params)
    }
    AddminResetPassword(userName: string) {
        return axiosInstance.post(this._urlSuffix + `/admin-reset-password/${userName}`)
    }

    CreateWithDefaultPassword(data: CreateUserWithDefaultPasswordRequest): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + `/admin-register`, data)
    }
    GetThongTinCSDLDanCu(data: ThongTinCSDLDanCuSearchParams): AxiosResponseWrapper<IResult<GetCSDLDanCuResponse>> {
        return axiosInstance.post(this._urlSuffix + '/getcsdldancu', data)
    }
    LogoutSSO(params: { access_token: string; returnUrl?: string }): AxiosResponseWrapper<IResult<GetCSDLDanCuResponse>> {
        return axiosInstance.get('/logout', { params })
    }


    SearchByPermision(params: ISearchUserByPermision): AxiosResponseWrapper<IPaginationResponse<User[]>> {
        params = { ...params, typeUser: "CanBo" }
        return axiosInstance.post(this._urlSuffix + "/userroles/search", params)
    }

    SearchDanhSachNguoiXuLyTiep(params: ISearchDanhSachNguoiXuLyTiep): AxiosResponseWrapper<IResult<INguoiXuLyTiep[]>> {
        return axiosInstance.post(this._urlSuffix + "/SearchDanhSachNguoiXuLyTiep", params)
    }

    UpdateUserGroup(_params: IOmitUpdate<IApplicationUserGroups>): AxiosResponseWrapper {
        return axiosInstance.put(this._urlSuffix + "/UpdateUserGroup/" + _params.id, _params.data)
    }
    UpdateCurrentUserGroup(_params: IApplicationUserGroups & {fullName?: string; phoneNumber?: string; email?: string;}): AxiosResponseWrapper<IResult<any>> {
        return axiosInstance.put(this._urlSuffix + "/UpdateCurrentUserGroup/", _params)
    }
    AddminResetPasswordValidation(_params: IPasswordResetOptions): AxiosResponseWrapper {
        return axiosInstance.post(this._urlSuffix + "/admin-change-password-validations", _params)
    }
    
}

export const userService = new UserService();