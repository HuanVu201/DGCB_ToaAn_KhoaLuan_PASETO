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
import { UserGroup, UserGroupResponse } from "@/models/userGroup";
import { FormOptionResetPassword } from "../modals/FormOptionResetPassword";

export const DanhSachNguoiDung = () => {
  const {
    userGroups,
    count,
    loading,
  } = useAppSelector((state) => state.user);
  const [searchParams, setSearchParams] = useState<ISearchUser>({
    pageNumber: 1,
    pageSize: 50,

    // isActive: true,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const coCauModalContext = useCoCauModalContext();
  const folderContext = useFolderContext();
  const [selectedUsers, setSelectedUsers] = useState<UserGroupResponse[]>([]);
  const onSelectTableChange = (newSelectedRowKeys: string[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    const tmpUser = userGroups?.filter(x => newSelectedRowKeys.includes(x.id)) || []
    setSelectedUsers(tmpUser);
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
  }, setSearchParams);
  return (
    <>
      {folderContext.folderId ? (
        <>
          <SearchUserTable setSearchParams={setSearchParams}/>
          <div>Có <b>{count}</b> người dùng</div>
          <AntdTable
            rowSelection={rowSelection as any}
            loading={loading}
            onSearch={(params) => {
              if (params.groupCode) {
                dispatch(SearchUser(params));
              }
            }}
            dataSource={userGroups as any}
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
          setSearchParams={setSearchParams}
          selectedUser={coCauModalContext.selectedUser}
          currentGroup={folderContext.folderId}
        />
      ) : null}
      {coCauModalContext.modalAddUserVisible && folderContext.folderId ? (
        <ThemMoiUser
          visible={coCauModalContext.modalAddUserVisible}
          handlerClose={() => {
            coCauModalContext.SetModalAddUserVisible(false);
          }}
          setSearchParams={setSearchParams}
          currentGroup={folderContext.folderId}
        />
      ) : null}
      {coCauModalContext.modalSetRolesVisible && selectedUsers.length > 0 ? (
        <PhanQuyen
          visible={coCauModalContext.modalSetRolesVisible}
          handleClose={() => coCauModalContext.SetModalSetRolesVisible(false)}
          users={selectedUsers}
        />
      ) : null}
         {coCauModalContext.showModalResetPassWorld && folderContext.folderId? (
        <FormOptionResetPassword
          visible={coCauModalContext.showModalResetPassWorld}
          handlerClose={() => {
            coCauModalContext.setShowModalReSetPassWorld(false);
          }}
          setSearchParams={setSearchParams}
          selectedUser={coCauModalContext.selectedUser}
          currentGroup={folderContext.folderId}
        />
      ) : null}
    </>
  );
};
