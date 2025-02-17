import { PhanQuyen } from "@/features/cocautochuc/components/modals/PhanQuyen";
import { ThemMoiUser } from "@/features/cocautochuc/components/modals/ThemMoiUser";
import { SearchUserTable } from "@/features/cocautochuc/components/rightside/SearchUser";
import { useCoCauModalContext } from "@/features/cocautochuc/contexts/CoCauModalContext";
import { ISearchUser, IUser } from "@/features/user/models";
import { SearchUser, SearchUserGruop } from "@/features/user/redux/Actions";
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
import { ThemMoiNguoiDung } from "./ThemMoiNguoiDung";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { SearchDanhMuc_ChucDanh } from "@/features/danhmuc_dgcb/danhmuc_chucdanh/redux/action";
import { SearchDanhMuc_ChucVu } from "@/features/danhmuc_dgcb/danhmuc_chucvu/redux/action";
import { UserGroupResponse } from "@/models/userGroup";

const UserTable = () => {
    const dispatch = useAppDispatch()
    const coCauModalContext = useCoCauModalContext();
    const {
        // datas: users,
         data: user,
         userGroups :users,
         count,
         loading,
     } = useAppSelector((state) => state.user);
    const [selectedUsers, setSelectedUsers] = useState<UserGroupResponse[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectTableChange = (newSelectedRowKeys: any) => {
        setSelectedRowKeys(newSelectedRowKeys);
        // let tmpUsers = newSelectedRowKeys.map((item: string) => {
        //     let tmpUser = users?.find((x) => x.id == item);
        //     return {
        //         id: tmpUser?.id,
        //         userName: tmpUser?.userName,
        //     };
        // });
        const tmpUser = users?.filter(x => newSelectedRowKeys.includes(x.id)) || []
        setSelectedUsers(tmpUser);
    };
  
    const {
         datas: danhMuc_ChucVus,
         data: danhMuc_ChucVu,
     } = useAppSelector((state) => state.danhmuc_chucvu);
     const {
        datas: danhMuc_ChucDanhs,
        data: danhMuc_ChucDanh,
     } = useAppSelector((state) => state.danhmuc_chucdanh);
    const [searchParams, setSearchParams] = useState<ISearchUser>({
        pageNumber: 1,
        pageSize: 100,
        reFetch: true,
    });

    // useEffect(() => {
    //     if (user?.officeCode) {
    //         setSearchParams({
    //             ...searchParams,
    //             officeCode: user.officeCode
    //         })
    //     }
    // }, [user])
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectTableChange,
    };
    const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
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
            type: 'don-vi',
            // groupCode: user?.officeCode,
            getAllChildren: true,
        }))
        if(danhMuc_ChucDanhs == undefined)
        dispatch(SearchDanhMuc_ChucDanh({
            pageNumber: 1,
            pageSize: 5000,
            reFetch: true,
        }))
        if(danhMuc_ChucVus == undefined)
        dispatch(SearchDanhMuc_ChucVu({
            pageNumber: 1,
            pageSize: 5000,
            reFetch: true,
        }))
    }, [])

    return (
        <>
            <>
                <SetRoles />
                <div className="mb-3">
                    <SearchDanhSachNguoiDung setSearchParams={setSearchParams} />
                </div>
                <Spin spinning={loading}
                    indicator={<LoadingOutlined spin />}
                >
                    <AntdTable
                        bordered
                        rowSelection={rowSelection}
                        loading={loading}
                        onSearch={(params) => {
                                dispatch(SearchUserGruop({ ...params, }));
                        }}
                        dataSource={users as any}
                        columns={columns as any}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        pagination={{ total: count }}
                    />
                </Spin>
            </>
            {/* {coCauModalContext.showModalUserCU.visible && coCauModalContext.selectedUser ? (
                <ThemMoiNguoiDung
                    visible={coCauModalContext.showModalUserCU.visible}
                    handlerClose={() =>
                        coCauModalContext.setShowModalUserCU({ id: "", visible: false })
                    }
                    selectedUser={coCauModalContext.selectedUser}
                    currentGroup={coCauModalContext.selectedUser. ? coCauModalContext.selectedUser.groupCode : undefined}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                />
            ) : null} */}

            {coCauModalContext.modalSetRolesVisible && selectedUsers.length > 0 ? (
                <PhanQuyen
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

export default UserTable