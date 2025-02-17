import { AntdButton, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useVaiTro } from "../../hooks/useVaiTroNguoiDungColumn";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useFolderContext } from "@/contexts/FolderContext";
import { useVaiTroModalContext } from "../../contexts/VaiTroModalContext";
import { ISearchUserRoles } from "@/features/userroles/models";
import { SearchUserRoles } from "@/features/userroles/redux/action";
import { SuaNguoiDung } from "../modal/SuaNguoiDung";
import { SearchUser } from "./SearchUser";
import { Form, Input, Space, Row, Col, Table } from "antd"
import { IBasePagination } from "@/models";
export const DanhSachVaiTro = () => {
  const {
    datas: users,
    count,
    loading,
  } = useAppSelector((state) => state.userroles);
  // const [listUser, setListUser] = use

  const [searchParams, setSearchParams] = useState<ISearchUserRoles>({
    pageNumber: 1,
    pageSize: 10,
    isActive: true,
  });
  const roleContext = useVaiTroModalContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    searchAction(searchParams)
    roleContext.setReloadTable(false)
  }, [roleContext.reloadTable])

  const searchAction = async (params: any) => {

    if (roleContext.RoleId)
      dispatch(SearchUserRoles(params))
  }

  useEffect(() => {
    if (roleContext.RoleId) {
      setSearchParams({ ...searchParams, roleId: roleContext.RoleId[0], pageNumber: 1 });
    }
  }, [roleContext.RoleId]);

  const columns = useVaiTro({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });

  return <>
    {
      roleContext.RoleId ? (
        <>
          <SearchUser setSearchParams={setSearchParams} />
          <div>Có <b>{count}</b> người dùng</div>
          {searchParams.roleId ?
            <AntdTable
              loading={loading}
              onSearch={(params) => searchAction(params)}
              dataSource={users}
              rowKey={'id'}
              columns={columns}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              pagination={{ total: count }}
            /> : null}
        </>
      ) : (
        <></>
      )
    }

    {roleContext.showModalUserCU.visible ? (
      <SuaNguoiDung
        visible={roleContext.showModalUserCU.visible}
        handlerClose={() =>
          roleContext.setShowModalUserCU({ id: "", visible: false })
        }
        selectedUser={roleContext.selectedUser}
      />
    ) : null}


  </>
};
