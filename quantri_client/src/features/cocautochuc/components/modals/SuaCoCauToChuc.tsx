import { useFolderContext } from "@/contexts/FolderContext";
import { ID_SEPARATE, ID_SEPARATE_ONE_THUNK } from "@/data";
import {
  AddCoCauToChuc,
  GetCoCauToChuc,
  UpdateCoCauToChuc,
} from "@/features/cocautochuc/redux/crud";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
} from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Col, Form, FormProps, Input, InputNumber, Row, Spin } from "antd";
import { SelectProps } from "antd/lib";
import { useEffect, useMemo } from "react";
import { ICoCauToChuc } from "../../models";
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action";
import { log } from "console";
import { LoadingOutlined } from "@ant-design/icons";
const TYPE_OPTIONS: SelectProps["options"] = [
  { label: "Đơn vị", value: "don-vi" },
  { label: "Nhóm", value: "nhom" },
];
const INPUT_RULES = {
  groupName: [{ required: true, message: "Không được để trống!" }],
  groupCode: [{ required: true, message: "Không được để trống!" }],
  type: [{ required: true, message: "Không được để trống!" }],
};
export const SuaCoCauToChuc = ({
  handlerClose,
  visible,
  folderId,
}: {
  handlerClose: () => void;
  visible: boolean;
  folderId: string;
}) => {
  const { datas: coCauToChucs, data: coCauToChuc, loading } = useAppSelector(
    (state) => state.cocautochuc
  );
  const { datas: danhMucChungs, data: danhMucChung } = useAppSelector(
    (state) => state.danhmucdungchung
  );
  const [form] = Form.useForm<
    Omit<ICoCauToChuc, "maNhomLienThong" | "otherCatalog"> & {
      maNhomLienThong?: string[];
      otherCatalog: string[];
    }
  >();
  const [CapDanhGia] = useMemo(() => {
    return [
      danhMucChungs?.filter((e) => e.type === "CapDanhGia"),
    ];
  }, [danhMucChungs]);
  const folderContext = useFolderContext();
  const dispatch = useAppDispatch();
  const onFinish: FormProps["onFinish"] = (
    values: Omit<ICoCauToChuc, "maNhomLienThong" | "otherCatalog"> & {
      maNhomLienThong?: string[] | undefined;
      otherCatalog: string[] | undefined;
    }
  ) => {
    if (folderId) {
      const maNhomLienThong = values.maNhomLienThong;
      const otherCatalog = values.otherCatalog;

      dispatch(
        UpdateCoCauToChuc({
          id: folderId,
          data: {
            ...values,
            //tránh lọc nhầm => khi có 1 mã thì thêm ## => H54.01##
            maNhomLienThong: maNhomLienThong
              ? maNhomLienThong.length == 1
                ? maNhomLienThong + ID_SEPARATE_ONE_THUNK
                : maNhomLienThong.join(ID_SEPARATE_ONE_THUNK)
              : undefined,
            otherCatalog: otherCatalog
              ? otherCatalog.length == 1
                ? otherCatalog + ID_SEPARATE_ONE_THUNK
                : otherCatalog.join(ID_SEPARATE_ONE_THUNK)
              : undefined,
          },
        })
      );
    }
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
    dispatch(SearchDanhMucChung({}));
  }, []);

  useEffect(() => {
    if (folderId) {
      dispatch(GetCoCauToChuc(folderId));
    }
  }, [folderId]);

  useEffect(() => {
    if (coCauToChuc) {
      form.setFieldsValue({
        ...coCauToChuc,
        maNhomLienThong: coCauToChuc.maNhomLienThong
          ? coCauToChuc.maNhomLienThong
            .split(ID_SEPARATE_ONE_THUNK)
            .filter((x) => x != "")
          : undefined,
        otherCatalog: coCauToChuc.otherCatalog
          ? (coCauToChuc.otherCatalog
            .split(ID_SEPARATE_ONE_THUNK)
            .filter((x) => x != "") as any)
          : undefined,
      });
    }
  }, [coCauToChuc]);

  // const nhomLienThongs = useMemo(() => {
  //   return coCauToChucs?.filter((coCau) => coCau.maDinhDanh !== null);
  // }, [coCauToChucs]);

  const [groupOthersOptions, groupOptions] = useMemo(() => {
    return [
      danhMucChungs?.filter((e) => e.type === "nhom-co-cau-khac"),
      danhMucChungs?.filter((e) => e.type === "nhom-co-cau"),
    ];
  }, [danhMucChungs]);

  return (
    <AntdModal
      title="Sửa cơ cấu tổ chức"
      handlerCancel={handleCancel}
      visible={visible}
      footer={null}
      width={1000}
      // xóa modal khỏi dom khi đóng modal thay vì ẩn (nên xóa khi xử lý nhiều form trên 1 trang)
      destroyOnClose
    >
      <Spin spinning={loading}
        indicator={<LoadingOutlined spin />}
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
                <Input disabled={true} />
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
              <Form.Item label="Chọn nhóm cha" name="ofGroupCode">
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
              <Form.Item
                label="Loại cơ cấu"
                name="type"
                required
                rules={INPUT_RULES.type}
              >
                <AntdSelect options={TYPE_OPTIONS} />
              </Form.Item>
            </Col>

            <Col md={12} span={24}>
              <Form.Item label="Thứ tự" name="groupOrder">
                <InputNumber min={1} />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
              <Form.Item label="Trạng thái" name="active">
                <AntdSelect
                  options={
                    [
                      { label: "Sử dụng", value: true },
                      { label: "Không sử dụng", value: false },
                    ] as any
                  }
                />
              </Form.Item>
            </Col>
            <Col md={12} span={24}>
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
            <Form.Item label="ID người đại diện" name="agent">
              <Input />
            </Form.Item>
          </Col> */}

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

            {/* <Col md={12} span={24}>
            <Form.Item label="Mã nhóm liên thông" name="maNhomLienThong">
              <AntdSelect
                mode="multiple"
                generateOptions={{
                  model: nhomLienThongs,
                  value: "maDinhDanh",
                  label: "groupName",
                }}
                showSearch
                allowClear
              />
            </Form.Item>
          </Col> */}
            {/* <Col md={12} span={24}>
            <Form.Item label="Các nhóm khác" name="otherCatalog">
              <AntdSelect
                mode="multiple"
                generateOptions={{
                  model: groupOthersOptions,
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
              <AntdButton type="primary" htmlType="submit" disabled={loading}>
                Xác nhận
              </AntdButton>
              <AntdButton type="default" onClick={handleCancel} >
                Đóng
              </AntdButton>
            </AntdSpace>
          </Form.Item>

        </Form>
      </Spin>
    </AntdModal>
  );
};
