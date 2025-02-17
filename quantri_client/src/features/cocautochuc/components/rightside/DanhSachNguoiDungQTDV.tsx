import { AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useCoCauUser } from "../../hooks/useNguoiDungCoCauColumn";
import { useEffect, useState } from "react";
import { ISearchUser, IUser } from "@/features/user/models";
import { SearchUser } from "@/features/user/redux/Actions";
import { useFolderContext } from "@/contexts/FolderContext";
import { ThemSuaUser } from "../modals/ThemSuaUser";
import { ThemMoiUser } from "../modals/ThemMoiUser";
import { useCoCauModalContext } from "../../contexts/CoCauModalContext";
import { PhanQuyen } from "../modals/PhanQuyen";
import { toast } from "react-toastify";
import { AdminPasswordResetInfoModal } from "../modals/AdminPasswordResetInfo";
import { SearchUserTable } from "./SearchUser";
import { PhanQuyenQuanTriDonVi } from "@/features/danhsachnguoidung/components/PhanQuyenQuanTriDonVi";

export const DanhSachNguoiDungQuanTriDonVi = () => {
  const {
    datas: users,
    count,
    loading,
  } = useAppSelector((state) => state.user);
  const [searchParams, setSearchParams] = useState<ISearchUser>({
    pageNumber: 1,
    pageSize: 50,

    // isActive: true,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const dispatch = useAppDispatch();
  const coCauModalContext = useCoCauModalContext();
  const folderContext = useFolderContext();
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
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
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectTableChange,
  };
  useEffect(() => {
    if (folderContext.folderId) {
      setSearchParams((curr) => ({
        ...curr,
        groupCode: folderContext.folderId,
        pageNumber: 1
      }));
    }
  }, [folderContext.folderId]);
  useEffect(() => {
    if (coCauModalContext.modalSetRolesVisible && selectedUsers.length == 0) {
      coCauModalContext.SetModalSetRolesVisible(false);
      toast.warning("Chưa có người dùng được chọn");
    }
  }, [coCauModalContext.modalSetRolesVisible]);
  useEffect(() => {
    if (coCauModalContext.modalAddUserVisible && !folderContext.folderId) {
      coCauModalContext.SetModalAddUserVisible(false);
      toast.warning("Chưa chọn nhóm");
    }
  }, [coCauModalContext.modalAddUserVisible]);
  const columns = useCoCauUser({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
    // isActive: true,
  }, setSearchParams);
  return (
    <>
      {folderContext.folderId ? (
        <>
          <SearchUserTable setSearchParams={setSearchParams}/>
          <div>Có <b>{count}</b> người dùng</div>
          <AntdTable
            rowSelection={rowSelection}
            loading={loading}
            onSearch={(params) => {
              if (params.groupCode) {
                dispatch(SearchUser(params));
              }
            }}
            dataSource={users}
            columns={columns as any}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            pagination={{ total: count }}
          />
        </>
      ) : null}
      {coCauModalContext.showModalUserCU.visible && folderContext.folderId? (
        <ThemMoiUser
          visible={coCauModalContext.showModalUserCU.visible}
          handlerClose={() =>
            coCauModalContext.setShowModalUserCU({ id: "", visible: false })
          }
          selectedUser={coCauModalContext.selectedUser}
          currentGroup={folderContext.folderId}
          setSearchParams={setSearchParams}
        />
      ) : null}
      {coCauModalContext.modalAddUserVisible && folderContext.folderId ? (
        <ThemMoiUser
          visible={coCauModalContext.modalAddUserVisible}
          handlerClose={() => {
            coCauModalContext.SetModalAddUserVisible(false);
          }}
          currentGroup={folderContext.folderId}
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
    </>
  );
};
