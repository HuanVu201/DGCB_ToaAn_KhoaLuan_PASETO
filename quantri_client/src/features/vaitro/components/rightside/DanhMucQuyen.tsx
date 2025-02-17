import { AntdTable } from "@/lib/antd/components"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { useEffect, useState } from "react"
import { SearchUser } from "@/features/user/redux/Actions"
import { useFolderContext } from "@/contexts/FolderContext"
import { useRolePermissions } from "../../hooks/useVaiTroQuyenColumn"
import { ISearchVaiTro } from "../../models"
import { GetPermissionVaiTro, SearchVaiTro } from "../../redux/action"
import { useVaiTroModalContext } from "../../contexts/VaiTroModalContext"


export const DanhMucQuyen = () => {
    const { datas: roles, count, loading,dataPermission : rolePermission } = useAppSelector(state => state.vaitro)
    const [searchParams, setSearchParams] = useState<ISearchVaiTro>({})
    const dispatch = useAppDispatch()
    const roleContext = useVaiTroModalContext()
    // console.log(rolePermission?.permissions);
    
    useEffect(() => {
        if (roleContext.RoleId) {
            dispatch(GetPermissionVaiTro(roleContext.RoleId))
        }
    }, [roleContext.RoleId])

    const columns = useRolePermissions({pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize});
    
    return roleContext.RoleId ?
        <AntdTable
            loading={loading}
            onSearch={(params) => dispatch(SearchVaiTro(params))}
            dataSource={rolePermission?.permissions as any  }
            columns={columns}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            pagination={{ total: count }} /> : <></>
}  