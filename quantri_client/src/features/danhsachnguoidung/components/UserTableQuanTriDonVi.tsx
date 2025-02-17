import { PhanQuyen } from "@/features/cocautochuc/components/modals/PhanQuyen";
import { ThemMoiUser } from "@/features/cocautochuc/components/modals/ThemMoiUser";
import { SearchUserTable } from "@/features/cocautochuc/components/rightside/SearchUser";
import { useCoCauModalContext } from "@/features/cocautochuc/contexts/CoCauModalContext";
import { ISearchUser, IUser } from "@/features/user/models";
import { SearchUser } from "@/features/user/redux/Actions";
import { AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useEffect, useState } from "react";
import { useColumn } from "../hooks/useColumn";
import { AdminPasswordResetInfoModal } from "@/features/cocautochuc/components/modals/AdminPasswordResetInfo";
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud";
import { toast } from "react-toastify";
import { SetRoles } from "@/features/cocautochuc/components/button";
import { SearchDanhSachNguoiDung } from "./SearchDanhSachNguoiDung";
import { PhanQuyenQuanTriDonVi } from "./PhanQuyenQuanTriDonVi";
import { useColumnQTDV } from "../hooks/useColumnQTDV";

const UserTableQuanTriDonVi = () => {
    const dispatch = useAppDispatch()
    const coCauModalContext = useCoCauModalContext();
    const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectTableChange = (newSelectedRowKeys: any) => {
        setSelectedRowKeys(newSelectedRowKeys);
        let tmpUsers = newSelectedRowKeys.map((item: string) => {
            let tmpUser = users?.find((x) => x.id == item);
            return {
                id: tmpUser?.id,
                userName: tmpUser?.userName,
            };
        });
        setSelectedUsers(tmpUsers);
    };
    const {
        userGroups: users,
        data: user,
        count,
        loading,
    } = useAppSelector((state) => state.user);
    const [searchParams, setSearchParams] = useState<ISearchUser>({
        pageNumber: 1,
        pageSize: 100,
        reFetch: true,
    });
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectTableChange,
    };
    const { columns } = useColumnQTDV({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
    // const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (coCauModalContext.modalSetRolesVisible && selectedUsers.length == 0) {
            coCauModalContext.SetModalSetRolesVisible(false);
            toast.warning("Chưa có người dùng được chọn");
        }
    }, [coCauModalContext.modalSetRolesVisible]);
    useEffect(() => {
        dispatch(SearchCoCauToChuc({
            pageNumber: 1,
            pageSize: 5000,
            reFetch: true,
            groupCode: user?.officeCode,
            getAllChildren: true,
            type : 'don-vi'
        }))
    }, [])

    return (
        <>
            <>
                <SetRoles />
                <div className="mb-3">
                    <SearchDanhSachNguoiDung setSearchParams={setSearchParams} />
                </div>
                <AntdTable
                    bordered
                    rowSelection={rowSelection}
                    loading={loading}
                    onSearch={(params) => {
                       //dispatch(SearchUser({ ...params, groupId: searchParams.groupId ? undefined : user?.officeCode }));
                      // dispatch(SearchUser({ ...params, officeCode: searchParams.groupCode ? undefined : user?.officeCode }));
                         dispatch(SearchUser({ pageNumber: 1, pageSize: 100, reFetch: true, typeUser: 'CanBo', groupCode:user?.groupCode}));
                    }}
                    dataSource={users}
                    columns={columns}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    pagination={{ total: count }}
                />
            </>
            {coCauModalContext.showModalUserCU.visible && selectedUsers.length > 0? (
                <ThemMoiUser
                    visible={coCauModalContext.showModalUserCU.visible}
                    handlerClose={() =>
                        coCauModalContext.setShowModalUserCU({ id: "", visible: false })
                    }
                    selectedUser={coCauModalContext.selectedUser}
                    currentGroup={selectedUsers[0].groupCode}
                    setSearchParams={setSearchParams}
                />
            ) : null}

            {coCauModalContext.modalSetRolesVisible && selectedUsers.length > 0 ? (
                <PhanQuyenQuanTriDonVi
                    visible={coCauModalContext.modalSetRolesVisible}
                    handleClose={() => coCauModalContext.SetModalSetRolesVisible(false)}
                    users={selectedUsers}
                />
            ) : null}
            {coCauModalContext.modalAdminResetPassWordVisible ? (
                <AdminPasswordResetInfoModal
                    visible={coCauModalContext.modalAdminResetPassWordVisible}
                    handlerClose={() =>
                        coCauModalContext.setModalAdminResetPasswordVisible(false)
                    }
                />
            ) : null}
        </>
    )

}

export default UserTableQuanTriDonVi