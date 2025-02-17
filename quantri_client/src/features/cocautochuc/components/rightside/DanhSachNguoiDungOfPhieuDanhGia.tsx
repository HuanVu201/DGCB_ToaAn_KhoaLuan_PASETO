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
import { useCoCauUserOfPhieuDanhGia } from "../../hooks/useNguoiDungCoCauOfPhieuDanhGiaColumn";
import { useDanhMuc_PhieuDanhGiaContext } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/contexts/DanhMuc_PhieuDanhGiaContext";

export const DanhSachNguoiDungOfPhieuDanhGia = () => {
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const dispatch = useAppDispatch();
  const coCauModalContext = useCoCauModalContext();
  const DanhMucPhieuDanhGiaContext = useDanhMuc_PhieuDanhGiaContext();
  const folderContext = useFolderContext();
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const onSelectTableChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    let tmpUsers = newSelectedRowKeys.map((item: string) => {
      let tmpUser = userGroups?.find((x) => x.id == item);
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
      dispatch(SearchUser({ groupCode: folderContext.folderId, pageNumber: 1, pageSize: 50 }));
      setSearchParams((curr) => ({
        ...curr,
        groupCode: folderContext.folderId,
        pageNumber: 1
      }));
    }
  }, [folderContext.folderId]);
  useEffect(() => {
    if (coCauModalContext.modalAddCaNhanOfPhieuDanhGiaVisible && selectedUsers.length == 0) {
      coCauModalContext.setModalAddCaNhanOfPhieuDanhGiaVisible(false);
      toast.warning("Chưa có người dùng được chọn");
    }
    if (coCauModalContext.modalAddCaNhanOfPhieuDanhGiaVisible && selectedUsers.length > 0) {
      const currentList = DanhMucPhieuDanhGiaContext.lstCaNhanDanhGia || [];
      const updatedList = [...new Set([...currentList, ...selectedUsers])]; // Dùng Set để loại bỏ trùng lặp
      const uniqueSet = new Set(updatedList.map(item => JSON.stringify(item)));
      const uniqueList = Array.from(uniqueSet).map(item => JSON.parse(item));
      DanhMucPhieuDanhGiaContext.setLstCaNhanDanhGia(uniqueList);
      coCauModalContext.setModalAddCaNhanOfPhieuDanhGiaVisible(false);
    }
  }, [coCauModalContext.modalAddCaNhanOfPhieuDanhGiaVisible]);
  useEffect(() => {
    DanhMucPhieuDanhGiaContext.setAddCaNhanOfDanhMuc_PhieuDanhGiaModalVisible(false);
  }, [DanhMucPhieuDanhGiaContext.lstCaNhanDanhGia]);

  // useEffect(() => {
  //   if (coCauModalContext.modalAddUserVisible && !folderContext.folderId) {
  //     coCauModalContext.SetModalAddUserVisible(false);
  //     toast.warning("Chưa chọn nhóm");
  //   }
  // }, [coCauModalContext.modalAddUserVisible]);
  const columns = useCoCauUserOfPhieuDanhGia({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
    groupCode: folderContext.folderId,
  });
  return (
    <>
      {folderContext.folderId ? (
        <>
          <AntdTable
            rowSelection={rowSelection}
            loading={loading}
            onSearch={(params) => {
              if (params.groupCode) {
                dispatch(SearchUser(params));
              }
            }}
            dataSource={userGroups  as any}
            columns={columns}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            pagination={{ total: count }}
          />
        </>
      ) : null}
    </>
  );
};
