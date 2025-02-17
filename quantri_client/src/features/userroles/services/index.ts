import { Service } from "@/services";
import { ILanhDaoRoles, ISearchUserRoles,ISearchUserWithRoleNames,IUserRoles } from "../models";
import { AxiosResponseWrapper } from "@/lib/axios/typeHelper";
import { IPickSearch, IPaginationResponse, IResult, IBaseExt, ISoftDelete, IOmitUpdate } from "@/models";
import axiosInstance from "@/lib/axios";

class UserRolesService extends Service.BaseApi implements Omit<Service.ICrud<IUserRoles>, "Search">{
    constructor() {
        super("userroles")
    }
    Search(_params: ISearchUserRoles): AxiosResponseWrapper<IPaginationResponse<IUserRoles[]>> {
        return axiosInstance.get(this._urlSuffix + "/search", {params: _params});
    }
    SearchUserWithRoles(_params: ISearchUserWithRoleNames): AxiosResponseWrapper<IPaginationResponse<ILanhDaoRoles[]>> {
        return axiosInstance.get(this._urlSuffix + "/searchWithRoleNames", {
            params: _params, paramsSerializer: {
                indexes: null // by default: false
            }
        });
    }

    Get(_id: string): AxiosResponseWrapper<IResult<IUserRoles>> {
        throw new Error("Method not implemented.");
    }
 
    Create(_data: Partial<Omit<IUserRoles, keyof IBaseExt<string>>>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
        
    }
    Delete(_params: ISoftDelete): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Restore(_id: string): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
    Update(_params: IOmitUpdate<IUserRoles>): AxiosResponseWrapper {
        throw new Error("Method not implemented.");
    }
}

export const userRolesService= new UserRolesService()