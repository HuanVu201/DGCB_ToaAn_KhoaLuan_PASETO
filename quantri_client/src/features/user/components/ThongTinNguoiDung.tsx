import React, { useEffect, useId, useMemo, useState } from "react";
import { Button, Checkbox, Form, FormProps, Input, Radio, RadioProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { ChangePasswordUser, GetUser, UpdateUser } from "../redux/Actions";
import { toast } from "react-toastify";
import { ICredential } from "@/models";
import { useMainContext } from "../../../lib/antd/components/layout/context/MainContext";
import { User } from "@/models/user";
import { userService } from "../services";
import { deleteObjectKeyValues } from "@/utils/common";
import { IDanhMuc_PhieuDanhGia } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/models";
import { AntdSelect, AntdSelectProps } from "@/lib/antd/components";
import { ChucDanhMauPhieuDanhGia } from "@/models/mauPhieuDanhGias";
import { DanhMuc_ChucDanhSearch } from "@/features/danhmuc_dgcb/danhmuc_chucdanh/components/DanhMuc_ChuDanhSearch";
import { danhMuc_ChucDanhApi } from "@/features/danhmuc_dgcb/danhmuc_chucdanh/services";
import { filterOptions } from "@/utils";
import { IDanhMuc_BoTieuChuan } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/models";
import { danhMuc_BoTieuChuanApi } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/services";
import { BoTieuChuanLoaiThoiGian } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/data";

const ALLBOTIEUCHIKEY = "ALL"

const ThongTinNguoiDung = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useAppSelector((state) => state.user);
  const { data: auth } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm<User>();
  const [loading, setLoading] = useState(false)
  const mainContext = useMainContext();
  const kiemNhiem : boolean = Form.useWatch("kiemNhiem", form)
  const [mauPhieuDanhGias, setMauPhieuDanhGias] = useState<IDanhMuc_PhieuDanhGia[]>([])
  const [filterMauPhieuDanhGias, setFilterMauPhieuDanhGias] = useState<IDanhMuc_PhieuDanhGia[]>([])
  const [boTieuChuans, setBoTieuChuans] = useState<IDanhMuc_BoTieuChuan[]>([])
  const boTieuChiKey = useId()


  useEffect(() => {
    if (auth !== undefined) {
      (async () => {
        const userRes = await dispatch(GetUser({ token: auth.token })).unwrap()
        if(userRes){
          const res = await danhMuc_ChucDanhApi.MauPhieuDanhGias(userRes.chucDanh.id)
          const resBoTieuChuan = await danhMuc_BoTieuChuanApi.Search({pageNumber:1, pageSize:500})
          setMauPhieuDanhGias(res.data.data || [])
          setBoTieuChuans(resBoTieuChuan.data.data || [])
          setFilterMauPhieuDanhGias(res.data.data || [])
        }
      })()
    }
  }, [auth]);

  useEffect(() => {
    form.setFieldsValue({ ...user, maPhieuDanhGia: user?.maPhieuDanhGia?.length ? user.maPhieuDanhGia.split(",") : undefined } as User);
  }, [user])
  const onFinish: FormProps["onFinish"] = async (values) => {
    try {
      deleteObjectKeyValues(values, ["userName"])
      const maPhieuDanhGia : string[] | undefined = values.maPhieuDanhGia
      const res = await userService.UpdateCurrentUserGroup({...user, ...values, maPhieuDanhGia: maPhieuDanhGia?.toString(), chucDanhId: user?.chucDanh?.id, chucVuId: user?.chucVu?.id})
      if(res.data.succeeded){
        toast.success("Cập nhật thành công")
        mainContext.setUserInfoModalVisible(false);
      }
    } catch(err){
      console.log(err);
      toast.error("Cập nhật thất bại")
    }
  }

  const onChange: RadioProps["onChange"] = (e) => {
    if(e.target.value === ALLBOTIEUCHIKEY){
      setFilterMauPhieuDanhGias((curr) => mauPhieuDanhGias)
      return
    }
    const selectedBoTieuChuan = boTieuChuans.find(x => x.loaiThoiGian?.toLowerCase() == e.target.value?.toLowerCase())
    setFilterMauPhieuDanhGias((curr) => mauPhieuDanhGias.filter(x => x.maBoTieuChi?.toLowerCase() == selectedBoTieuChuan?.maBoTieuChi?.toLowerCase()))
  }

  const dropdownRender : AntdSelectProps<any>["dropdownRender"] = (origin) => {
    return <>
      <Radio.Group style={{display: "flex", justifyContent:"center"}} onChange={onChange}>
        <Radio value={ALLBOTIEUCHIKEY} key={boTieuChiKey}>Tất cả bộ tiêu chí</Radio>
        {Object.keys(BoTieuChuanLoaiThoiGian).map((loaiThoiGian, index) => <>
          <Radio value={loaiThoiGian} key={index}>{loaiThoiGian}</Radio>
        </>)}
      </Radio.Group>
      {origin}
    </>
  }

  return (
    <div style={{}}>
      <Form
        name="thongtinnguoidung"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
        form={form}
      >
        <Form.Item<User> label="Tên đầy đủ" name="fullName">
          <Input />
        </Form.Item>

        <Form.Item<User> label="Tên người dùng" name="userName">
          <Input disabled />
        </Form.Item>
        {/* <Form.Item<User> label="Số điện thoại" name="phoneNumber">
          <Input />
        </Form.Item>
        <Form.Item<User> label="Email" name="email">
          <Input />
        </Form.Item> */}
        <Form.Item<User> label="Kiêm nhiệm" name="kiemNhiem" valuePropName="checked">
          <Checkbox />
        </Form.Item>
        {kiemNhiem ? <Form.Item<User> label="Nội dung kiêm nhiệm" name="noiDungKiemNhiem">
          <Input.TextArea />
        </Form.Item> : null}
        {mauPhieuDanhGias?.length ? 
          <Form.Item<User> label="Mẫu phiếu đánh giá chính" name="maPhieuDanhGia">
            <AntdSelect 
              dropdownRender={dropdownRender}
              generateOptions={{model: filterMauPhieuDanhGias, value: "id", label: "ten"}} 
              allowClear 
              showSearch 
              filterOption={filterOptions}
              mode="multiple"
              />
          </Form.Item> : null}
        <Form.Item wrapperCol={{ offset: 21 }}>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ThongTinNguoiDung;
