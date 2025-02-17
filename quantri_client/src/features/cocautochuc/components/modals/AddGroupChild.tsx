import { useFolderContext } from "@/contexts/FolderContext";
import {
  AddCoCauToChuc,
  GetCoCauToChuc,
  UpdateCoCauToChuc,
} from "@/features/cocautochuc/redux/crud";
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
} from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, Form, FormProps, Input, InputNumber, Row } from "antd";
import { DataNode } from "antd/es/tree";
import { SelectProps } from "antd/lib";
import { useEffect, useMemo } from "react";
export const TYPE_OPTIONS: SelectProps["options"] = [
  { label: "Đơn vị", value: "don-vi" },
  { label: "Nhóm", value: "nhom" },
];
export const CATALOG_OPTIONS: SelectProps["options"] = [
  { label: "Sở ban ngành", value: "so-ban-nganh" },
  { label: "Huyện, thị xã, thành phố", value: "quan-huyen" },
  { label: "Xã, phường, thị trấn", value: "xa-phuong" },
];
const INPUT_RULES = {
  groupName: [{ required: true, message: "Không được để trống!" }],
  groupCode: [{ required: true, message: "Không được để trống!" }],
  type: [{ required: true, message: "Không được để trống!" }],
};
export const AddGroupChild = ({
  handlerClose,
  visible,
  folderId,
  folder,
}: {
  handlerClose: () => void;
  visible: boolean;
  folderId: string;
  folder?: DataNode;
}) => {
  const { datas: coCauToChucs, data: coCauToChuc } = useAppSelector(
    (state) => state.cocautochuc
  );
  const [form] = Form.useForm();
  const folderContext = useFolderContext();
  const dispatch = useAppDispatch();
  const onFinish: FormProps["onFinish"] = (values) => {
    let ofGroupInfo = coCauToChucs?.find(
      (x) => x.groupCode == values.ofGroupCode
    );
    let postData = { ...values, ofGroupName: ofGroupInfo?.groupName, ofGroupId: ofGroupInfo?.id };
    dispatch(AddCoCauToChuc(postData));

    // else {

    //     let postData = {...values, ofGroupId: "string", maNganHang : "1", ofGroupName: "string", taiKhoanThuHuong:"1", tenTaiKhoanThuHuong: "1"}
    //     dispatch(AddCoCauToChuc(postData))
    // }

    folderContext.setFolderId(undefined);
    handlerClose();
    form.resetFields();
  };
  const handleCancel = () => {
    form.resetFields();
    handlerClose();
  };

  useEffect(() => {
    if (folder && folder?.key) {
      form.setFieldValue("ofGroupCode", folder?.key);
      dispatch(SearchDanhMucChung({}));
    }
  }, [folderId]);
  const { datas: danhMucChungs, data: danhMucChung } = useAppSelector(
    (state) => state.danhmucdungchung
  );
  const [groupOthersOptions, groupOptions] = useMemo(() => {
    return [
      danhMucChungs?.filter((e) => e.type === "nhom-co-cau-khac"),
      danhMucChungs?.filter((e) => e.type === "nhom-co-cau"),
    ];
  }, [danhMucChungs]);
  const [CapDanhGia] = useMemo(() => {
    return [
      danhMucChungs?.filter((e) => e.type === "CapDanhGia"),
    ];
  }, [danhMucChungs]);
  return (
    <AntdModal
      title="Thêm mới nhóm con"
      handlerCancel={handleCancel}
      visible={visible}
      footer={null}
      // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
      destroyOnClose
    >
      <Form
        name="CoCauToChuc"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={true}
      >
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Mã nhóm"
              name="groupCode"
              required
              rules={INPUT_RULES["groupCode"]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên nhóm"
              name="groupName"
              rules={INPUT_RULES["groupName"]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Nhóm cha" name="ofGroupCode">
              <AntdSelect
                generateOptions={{
                  model: coCauToChucs,
                  label: "groupName",
                  value: "groupCode",
                }}
              />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Mã nhóm cha" name="ofGroupCode">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Loại cơ cấu" name="type" rules={INPUT_RULES.type}>
              <AntdSelect options={TYPE_OPTIONS} />
            </Form.Item>
          </Col>

          <Col md={12} span={24}>
            <Form.Item label="Thứ tự" name="groupOrder">
              <InputNumber min={1} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="ID người đại diện" name="agent">
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Trạng thái" name="active">
              <AntdSelect
                defaultValue={true}
                options={
                  [
                    { label: "Sử dụng", value: true },
                    { label: "Không sử dụng", value: false },
                  ] as any
                }
              />
            </Form.Item>
          </Col>
          * <Col md={12} span={24}>
            <Form.Item label="Cấp đánh giá" name="catalog">
              <AntdSelect
                generateOptions={{
                  model: CapDanhGia,
                  value: "code",
                  label: "tenDanhMuc",
                }}
                showSearch
                allowClear
              />
            </Form.Item>
          </Col> 
          {/* <Col md={12} span={24}>
            <Form.Item label="Nhóm" name="catalog">
              <AntdSelect
                generateOptions={{
                  model: groupOptions,
                  value: "code",
                  label: "tenDanhMuc",
                }}
                showSearch
                allowClear
              />
            </Form.Item>
          </Col> */}
        </Row>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <AntdSpace>
            <AntdButton type="primary" htmlType="submit">
              Xác nhận
            </AntdButton>
            <AntdButton type="default" onClick={handleCancel}>
              Đóng
            </AntdButton>
          </AntdSpace>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};
