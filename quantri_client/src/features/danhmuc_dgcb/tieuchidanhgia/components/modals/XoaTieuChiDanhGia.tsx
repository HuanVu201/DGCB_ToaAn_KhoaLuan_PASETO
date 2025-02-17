import {
    AntdButton,
    AntdModal,
    AntdSelect,
    AntdSpace,
    AntdTab,
    AntdUpLoad,
    IAntdTabsProps,
  } from "@/lib/antd/components";
  import {DeleteTieuChiDanhGia, DeleteTieuChiDanhGiaOld  } from "../../redux/action";
  import { useAppDispatch } from "@/lib/redux/Hooks";
  import { DataNode } from "antd/es/tree";
  import { toast } from "react-toastify";
  export const XoaTieuChiDanhGia = ({
    handleCancel,
    folderId,
    folder,
  }: {
    handleCancel: () => void;
    folderId: string;
    folder?: DataNode;
  }) => {
    const dispatch = useAppDispatch();
    const handleSubmit = () => {
      if (
        !folder?.children ||
        (folder?.children && folder?.children?.length == 0)
      ) {
        dispatch(DeleteTieuChiDanhGiaOld({ id: folderId, forceDelete: false }));
      } else {
        toast.warning("Thư mục có chứa thư mục con");
      }
      handleCancel();
    };
    return (
      <>
        <AntdModal
          title="Xoá"
          handlerCancel={handleCancel}
          visible={true}
          footer={null}
          destroyOnClose
        >
          <div>Xác nhận xoá nhóm</div>
          <AntdSpace align="center">
            <AntdButton type="primary" onClick={handleSubmit}>
              Xác nhận
            </AntdButton>
            <AntdButton type="default" onClick={handleCancel}>
              Đóng
            </AntdButton>
          </AntdSpace>
        </AntdModal>
      </>
    );
  };
  