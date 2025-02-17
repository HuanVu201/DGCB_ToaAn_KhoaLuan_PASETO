import { Form, Input, Space, Row, Col } from "antd";
import { CollapseContent } from "../../../components/common/CollapseContent";
import { AntdButton, AntdSelect } from "../../../lib/antd/components";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks";
import {
  INguoiDungNhomNguoiDung,
  ISearchNguoiDungNhomNguoiDung,
} from "../models";
import { useCallback, useEffect, useState } from "react";
import { useNguoiDungNhomNguoiDungContext } from "../contexts/NguoiDungNhomNguoiDungContext";
import {
  SearchCoCauToChuc,
  SearchCoCauToChucPhongBan,
} from "@/features/cocautochuc/redux/crud";
import { useNhomNguoiDungContext } from "@/features/nhomnguoidung/contexts/NhomNguoiDungContext";
import { ICoCauToChuc } from "@/features/cocautochuc/models";
import { filterOptions } from "@/utils";
import { IPickSearch } from "@/models";
import { IDanhMucChung } from "@/features/danhmucdungchung/models";
import { SearchDanhMucChung } from "@/features/danhmucdungchung/redux/action";
import { coCauToChucService } from "@/features/cocautochuc/services";

export const ThemNhomNguoiDungSearch = ({
  setSearchParams,
}: {
  setSearchParams: React.Dispatch<
    React.SetStateAction<ISearchNguoiDungNhomNguoiDung>
  >;
}) => {
  const [form] = Form.useForm();
  const [donVis, setDonVis] = useState<ICoCauToChuc[]>()
  const [phongBans, setPhongBans] = useState<ICoCauToChuc[]>()
  const { datas: positions } = useAppSelector(
    (state) => state.danhmucdungchung
  );
  const dispatch = useAppDispatch();
  const nhomNguoiDungContext = useNhomNguoiDungContext();
  const onFinish = (values: ISearchNguoiDungNhomNguoiDung) => {
    setSearchParams((curr) => ({ ...curr, ...values }));
  };

  useEffect(() => {
    (async () => {
      
      let positionParams: IPickSearch<IDanhMucChung, "type"> = {
        pageNumber: 1,
        pageSize: 1000,
        type: "chuc-vu",
      };
      dispatch(SearchDanhMucChung(positionParams)).unwrap();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if(donVis === undefined){
        const resDonVis = await coCauToChucService.Search({
          pageNumber: 1,
          pageSize: 2000,
          reFetch: true,
          type: "don-vi",
          // isRootGroupCode: true,
        })
        setDonVis(resDonVis.data.data || [])
  
      }
    })()
  }, [donVis])
  const resetSearchParams = () => {
    setSearchParams({
      pageNumber: 1,
      pageSize: 20,
      reFetch: true,
      nhomNguoiDungId: nhomNguoiDungContext.nhomNguoiDungId,
    });
    form.resetFields();
  };
  const onChangGroupCode = async (value: string) => {
    if (value) {
      form.setFieldValue("groupCode", null);
      const resphongBans = await coCauToChucService.Search({
        pageNumber: 1,
        pageSize: 2000,
        reFetch: true,
        type: 'nhom',
        ofGroupCode: value
        // isRootGroupCode: true,
      })
      setPhongBans(resphongBans.data.data || [])
    }
  };
  return (
    <CollapseContent defaultVisible={true}>
      <Form
        name="NguoiDungNotInNhomNguoiDungSearch"
        layout="vertical"
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="Đơn vị" name="officeCode">
              <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                generateOptions={{
                  model: donVis,
                  label: "groupName",
                  value: "groupCode",
                }}
                onChange={onChangGroupCode}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phòng ban" name="groupCode">
              <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                generateOptions={{
                  model: phongBans,
                  label: "groupName",
                  value: "groupCode",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Họ và tên" name="fullName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Tài khoản" name="userName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Chức vụ" name="positionName">
              <AntdSelect
                allowClear
                showSearch
                filterOption={filterOptions}
                generateOptions={{
                  model: positions,
                  label: "tenDanhMuc",
                  value: "tenDanhMuc",
                }}
              />
            </Form.Item>
          </Col>
          {/* <Col span={24}>
                        <Form.Item
                            label="Chức vụ"
                            name="chucVu"
                        >
                            <Input />
                        </Form.Item>
                    </Col> */}
        </Row>
        <Form.Item>
          <Row justify="space-around">
            <Space size="large">
              <AntdButton type="primary" htmlType="submit">
                Xác nhận
              </AntdButton>
              <AntdButton type="default" onClick={resetSearchParams}>
                Tải lại
              </AntdButton>
            </Space>
          </Row>
        </Form.Item>
      </Form>
    </CollapseContent>
  );
};
