import { useEffect, useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../../hooks/useColumn"
import { ISearchLstUsers} from "../../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchListAUGNotPermissionDanhGia, SearchListAUGOfGroupQuery, SearchLstUsers} from "../../redux/action"
import { LstUsersSearch } from "../LstUsersSearch"
import { LstUsersProvider } from "../../contexts/LstUsersContext"
import { LstUsersDetail } from "./NotPermissionDanhGiaDetail"
import { useColumnOfNotPermissionDanhGia } from "../../hooks/useColumnOfNotPermissionDanhGia"
import { Space } from "antd"
import { SetRoles } from "@/features/cocautochuc/components/button"
import { ZoomComponent } from "@/components/common"
import { IUser } from "@/features/user/models"
import { CoCauModalProvider, useCoCauModalContext } from "@/features/cocautochuc/contexts/CoCauModalContext"
import { toast } from "react-toastify"
import { PhanQuyenQuanTriDonVi } from "@/features/danhsachnguoidung/components/PhanQuyenQuanTriDonVi"
import { PhanQuyen } from "@/features/cocautochuc/components/modals/PhanQuyen"
import { UserGroupResponse } from "@/models/userGroup"
const NotPermissionDanhGiaTable = () => {
     const dispatch = useAppDispatch()
     const coCauModalContext = useCoCauModalContext();
    // const {
    //     userGroups: users,
    //     data: user,
    //     count,
    //     loading,
    // } = useAppSelector((state) => state.user);
     const { datas: lstUserss, count } = useAppSelector(state => state.lstusers)
    const [searchParams, setSearchParams] = useState<ISearchLstUsers>({ pageNumber: 1, pageSize: 50 })
    const { columns } = useColumnOfNotPermissionDanhGia({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState<UserGroupResponse[]>([]);
    const onSelectTableChange = (newSelectedRowKeys: any) => {
        setSelectedRowKeys(newSelectedRowKeys);
        let tmpUsers = newSelectedRowKeys.map((item: string) => {
            let tmpUser = lstUserss?.find((x) => x.id == item);
            return {
                id: tmpUser?.id,
                userName: tmpUser?.userName,
                userId: tmpUser?.userId,

            };
        });
        setSelectedUsers(tmpUsers);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectTableChange,
    };
    useEffect(() => {
        if (coCauModalContext.modalSetRolesVisible && selectedUsers.length == 0) {
            coCauModalContext.SetModalSetRolesVisible(false);
            toast.warning("Chưa có người dùng được chọn");
        }
    }, [coCauModalContext.modalSetRolesVisible]);
    return (
        <>
         <SetRoles />
            <AntdSpace direction="vertical" style={{width:"100%"}} >
                {/* <LstUsersSearch setSearchParams={setSearchParams} /> */}
                <AntdTable
                 rowSelection={rowSelection}
                    columns={columns}
                    dataSource={lstUserss}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchListAUGNotPermissionDanhGia(params))}
                />
            </AntdSpace>
            <LstUsersDetail/>
            {coCauModalContext.modalSetRolesVisible && selectedUsers.length > 0 ? (
                <PhanQuyen
                    visible={coCauModalContext.modalSetRolesVisible}
                    handleClose={() => coCauModalContext.SetModalSetRolesVisible(false)}
                    users={selectedUsers}
                />
            ) : null}
        </>
            
    )
}
const NotPermissionDanhGiaTableWrapper = () => (
    <CoCauModalProvider>
<LstUsersProvider>
    <NotPermissionDanhGiaTable/>
</LstUsersProvider></CoCauModalProvider>
)
export default NotPermissionDanhGiaTableWrapper