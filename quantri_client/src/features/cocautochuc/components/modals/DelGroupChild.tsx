import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
  AntdTab,
  AntdUpLoad,
  IAntdTabsProps,
} from "@/lib/antd/components";
import { DeleteChildGroups } from "../../redux/crud";
import { useAppDispatch } from "@/lib/redux/Hooks";
import { DataNode } from "antd/es/tree";
import { toast } from "react-toastify";
import { IDeleteCoCauToChuc } from "../../models";
export const DelGroupChild = ({
  visible,
  handleCancel,
  folder,
}: {
  visible: boolean;
  handleCancel: () => void;
  folder?: DataNode;
}) => {
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    if (folder?.children && folder?.children?.length > 0) {
      dispatch(
        DeleteChildGroups({
          parentCode: folder.key,
          forceDelete: false,
        } as IDeleteCoCauToChuc)
      );
    } else {
      toast.warning("Thư mục không chứa thư mục con");
    }
    handleCancel();
  };
  return (
    <>
      <AntdModal
        title="Xoá"
        handlerCancel={handleCancel}
        visible={visible}
        footer={null}
        destroyOnClose
      >
        <div>Xác nhận xoá tất cả nhóm con</div>
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
