import { useEffect, useState } from "react"
import { AntdTable,AntdSpace } from "@/lib/antd/components"
import { useColumn } from "../../hooks/useColumn"
import { ISearchLstUsers} from "../../models"
import { useAppDispatch,useAppSelector } from "@/lib/redux/Hooks"
import { SearchListAUGNotPermission, SearchListAUGOfGroupQuery, SearchLstUsers} from "../../redux/action"
import { LstUsersSearch } from "../LstUsersSearch"
import { LstUsersProvider } from "../../contexts/LstUsersContext"
import { LstUsersDetail } from "./NotPermissionDetail"
import { useColumnOfNotPermission } from "../../hooks/useColumnOfNotPermission"
import { Button, Space } from "antd"
import { SetRoles } from "@/features/cocautochuc/components/button"
import { ZoomComponent } from "@/components/common"
import { IUser } from "@/features/user/models"
import { CoCauModalProvider, useCoCauModalContext } from "@/features/cocautochuc/contexts/CoCauModalContext"
import { toast } from "react-toastify"
import { PhanQuyenQuanTriDonVi } from "@/features/danhsachnguoidung/components/PhanQuyenQuanTriDonVi"
import { PhanQuyen } from "@/features/cocautochuc/components/modals/PhanQuyen"
import { UserGroupResponse } from "@/models/userGroup"
import * as XLSX from 'xlsx'
const NotPermissionTable = () => {
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
    const { columns } = useColumnOfNotPermission({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
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

    const handleExport = () => {
        // Kiểm tra xem lstUserss có hợp lệ không
        if (!lstUserss || lstUserss.length === 0) {
          console.error('lstUserss is undefined or empty');
          return;
        }
      
        // Chuyển đổi dữ liệu thành dạng mà Excel cần
        const data = lstUserss.map((user, index) => ({
            STT: index + 1,
          'Tên người dùng': user.fullName,
          'Tên tài khoản': user.userName,
          'Đơn vị': user.officeName,
        }));
      
        // Chuyển đổi dữ liệu thành sheet Excel
        const worksheet = XLSX.utils.json_to_sheet(data);
      
        // Tạo workbook mới
        const workbook = XLSX.utils.book_new();
      
        // Thêm worksheet vào workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách người dùng');
      
        // Xuất tệp Excel với tên 'Danh_sach_nguoi_dung.xlsx'
        XLSX.writeFile(workbook, 'Danh_sach_nguoi_dung.xlsx');
      };
    return (
        <>
         <SetRoles />
            <AntdSpace direction="vertical" style={{width:"100%"}} >
                {/* <LstUsersSearch setSearchParams={setSearchParams} /> */}
                <div style={{ width: '100%', textAlign: 'right' }}>
    <Button
      onClick={handleExport}
      style={{
        backgroundColor: '#28a745',  // Màu xanh lá cây
        color: 'white',               // Màu chữ trắng
        borderColor: '#28a745',      // Màu viền xanh lá cây
      }}
    >
      Xuất Excel
    </Button>
  </div>
                <AntdTable
                 rowSelection={rowSelection}
                    columns={columns}
                    dataSource={lstUserss}
                    pagination={{
                        total: count
                    }}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    onSearch={(params) => dispatch(SearchListAUGNotPermission(params))}
                />
 
            </AntdSpace>
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
const NotPermissionTableWrapper = () => (
    <CoCauModalProvider>
<LstUsersProvider>
    <NotPermissionTable/>
</LstUsersProvider></CoCauModalProvider>
)
export default NotPermissionTableWrapper