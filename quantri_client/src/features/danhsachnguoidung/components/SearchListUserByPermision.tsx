


import { AntdButton, AntdTable } from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { useVaiTro } from "@/features/vaitro/hooks/useVaiTroNguoiDungColumn";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { useFolderContext } from "@/contexts/FolderContext";
import { useVaiTroModalContext } from "@/features/vaitro/contexts/VaiTroModalContext";
import { ISearchUserRoles } from "@/features/userroles/models";
import { SearchUserRoles } from "@/features/userroles/redux/action";
import { SuaNguoiDung } from "@/features/vaitro/components/modal/SuaNguoiDung";
import { SearchUser } from "@/features/vaitro/components/rightside/SearchUser";
import { Form, Input, Space, Row, Col, Table } from "antd"
import { IBasePagination } from "@/models";
export const SearchListUserByPermision = () => {
  const {
    datas: users,
    count,
    loading,
  } = useAppSelector((state) => state.userroles);
  // const [listUser, setListUser] = use

  const [searchParams, setSearchParams] = useState<ISearchUserRoles>({
    pageNumber: 1,
    pageSize: 100,
    isActive: true,
    roleId: "e2ef287b-cbfc-4987-9270-e7270b06f918", // quyền 1 cửa
    roleIds: "8c748090-bfcb-41c5-a630-cf17fc572ec4" // tra cứu cơ sở dữ liệu dân cư
  });
  const roleContext = useVaiTroModalContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    searchAction(searchParams)
    roleContext.setReloadTable(false)
  }, [roleContext.reloadTable])

  const searchAction = async (params: any) => {
      dispatch(SearchUserRoles(params))
  }
//roleId:"11fdf0fa-8cae-4478-93c8-293f0f74fc53"
  useEffect(() => {
      setSearchParams({ ...searchParams, roleId:"e2ef287b-cbfc-4987-9270-e7270b06f918",roleIds:"8c748090-bfcb-41c5-a630-cf17fc572ec4" , pageNumber: 1 });
      console.log(searchParams);
      searchAction(searchParams)
  }, []);

  const columns = useVaiTro({
    pageNumber: searchParams.pageNumber,
    pageSize: searchParams.pageSize,
  });

  return <>
    {
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
