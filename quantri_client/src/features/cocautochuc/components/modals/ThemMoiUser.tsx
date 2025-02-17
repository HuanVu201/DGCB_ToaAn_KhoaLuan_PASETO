import { useEffect, useMemo, useState } from "react";
import {
  CreateUserWithDefaultPassword,
  UpdateUser,
} from "@/features/user/redux/Actions";
import {
  AntdButton,
  AntdModal,
  AntdSelect,
  AntdSpace,
} from "@/lib/antd/components";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { Checkbox, Col, Form, FormProps, Input, InputNumber, Row } from "antd";
import { useCoCauModalContext } from "../../contexts/CoCauModalContext";
import { useFolderContext } from "@/contexts/FolderContext";
import { userService } from "@/features/user/services";
import { SearchPermissionsVaiTro } from "@/features/vaitro/redux/action";
import { SearchDanhMuc_ChucDanh } from "@/features/danhmuc_dgcb/danhmuc_chucdanh/redux/action";
import { SearchDanhMuc_ChucVu } from "@/features/danhmuc_dgcb/danhmuc_chucvu/redux/action";
import { SearchCoCauToChuc } from "../../redux/crud";
import { CreateUserWithDefaultPasswordRequest } from "@/features/user/services/params";
import { User } from "@/models/user";
import { UserGroup, UserGroupResponse } from "@/models/userGroup";
import { ISearchUser } from "@/features/user/models";
import { deleteObjectKeyValues } from "@/utils/common";
import { buocXuLyApi } from "@/features/buocxuly/services";
import { SearchNhomNguoiDung } from "@/features/nhomnguoidung/redux/action";
import { group } from "console";
const INPUT_RULES = {
  ACCOUNT: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  PASSWORD: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  FULLNAME: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  OFFICECODE: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  EMAIL: [
    {
      required: true,
      message: "Không được để trống!",
    },
  ],
  PHONENUMBER: [
    {
      type: "regexp",
      pattern: new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g),
      message: "Số điện thoại không đúng định dạng",
    },
  ] as any,
};

export const ThemMoiUser = ({
  handlerClose,
  visible,
  selectedUser,
  currentGroup,
  setSearchParams,
}: {
  handlerClose: () => void;
  visible: boolean;
  selectedUser?: UserGroupResponse;
  currentGroup: string;
  setSearchParams: React.Dispatch<React.SetStateAction<ISearchUser>>
}) => {
  const { datas: chucDanhs } = useAppSelector((state) => state.danhmuc_chucdanh);
  const { datas: chucVus } = useAppSelector((state) => state.danhmuc_chucvu);
  const { datas: nhomNguoiDungs } = useAppSelector((state) => state.nhomnguoidung);
  const [userLoading, setUserLoading] = useState(false);
  const [seletcurrentOffice, SetSelectCurrentOffice] = useState<string>();
  const [seletcurrentGruops, SetSeletcurrentGruops] = useState<string>();
  const modalContext = useCoCauModalContext();
  const folderContext = useFolderContext();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { datas: dataPermissions } = useAppSelector(state => state.vaitro)
  const kiemNhiem : boolean= Form.useWatch("kiemNhiem", form)
  const { datas: coCauToChucs } = useAppSelector(
    (state) => state.cocautochuc
  );
  useEffect(() => {
    if (currentGroup) {
      let inforCurrGruop = coCauToChucs?.find(x => x.groupCode == currentGroup);
      let inforParentCurrGruop = coCauToChucs?.find(x => x.groupCode == inforCurrGruop?.ofGroupCode);
      if(inforCurrGruop != undefined)
      {
        if(inforCurrGruop.type == "don-vi")
        {
          SetSelectCurrentOffice(inforCurrGruop.groupCode);
          form.setFieldValue('officeCode', currentGroup)
        }
        else{
          SetSelectCurrentOffice(inforParentCurrGruop?.groupCode)
          SetSeletcurrentGruops(currentGroup)
          form.setFieldValue('officeCode', inforParentCurrGruop?.groupCode)
          form.setFieldValue('groupCode',currentGroup)
        }
      }
    }
  }, [currentGroup])
  
  useEffect(() => {
    if (dataPermissions === undefined) {
      dispatch(SearchPermissionsVaiTro({}))
    }
  }, [dataPermissions])
  const dangThemMoi = !selectedUser?.id



  const onFinish: FormProps["onFinish"] = async (values) => {
    deleteObjectKeyValues(values, ["username"])
    var tmpOffice = coCauToChucs?.find((x) => x.groupCode == folderContext.folderId);
    if (dangThemMoi) {
      let postData : CreateUserWithDefaultPasswordRequest= {
        ...values,
        confirmPassword: values["password"],
        email: values?.email ? values?.email : `${values?.userName}@gmail.com`,
        userGroupData: {
         // groupCode: tmpOffice?.groupCode,
         // officeCode: tmpOffice?.ofGroupCode || tmpOffice?.groupCode,
          groupCode: values?.groupCode || tmpOffice?.groupCode,
          officeCode: values?.officeCode || tmpOffice?.groupCode,
          isDefault: values.isDefault,
          noiDungKiemNhiem: values.noiDungKiemNhiem,
          khongDanhGia: values.khongDanhGia,
          kiemNhiem: values.kiemNhiem,
          thamQuyenXepLoai: values.thamQuyenXepLoai,
          truongDonVi: values.truongDonVi,
          userOrder: values.userOrder,
          chucDanhId: values.chucDanhId, 
          chucVuId: values.chucVuId, 
          nhomNguoiDungs: values.nhomNguoiDungs ? {
            nhomNguoiDungIds: [values.nhomNguoiDungs]
          } : null
        }
      };
      dispatch(CreateUserWithDefaultPassword(postData));
    } else {
      let postData = {
        ...values,
        id: selectedUser?.userId,
        // groupCode: tmpGroupCode?.ofGroupCode,
        // groupName: tmpGroupCode?.ofGroupName,
        // officeName: tmpGroupCode?.groupName,
        email: values?.email ? values?.email : `${values?.userName}@gmail.com`,
        userGroupData: {
          groupCode: values.groupCode || tmpOffice?.groupCode,
         // officeCode: tmpOffice?.ofGroupCode || tmpOffice?.groupCode,
         officeCode: values?.officeCode || tmpOffice?.groupCode,
          isDefault: values.isDefault,
          noiDungKiemNhiem: values.noiDungKiemNhiem,
          khongDanhGia: values.khongDanhGia,
          kiemNhiem: values.kiemNhiem,
          isKySo: values.isKySo,
          thamQuyenXepLoai: values.thamQuyenXepLoai,
          truongDonVi: values.truongDonVi,
          userOrder: values.userOrder,
          chucDanhId: values.chucDanhId, 
          chucVuId: values.chucVuId, 
          id: selectedUser.id,
          nhomNguoiDungs: values.nhomNguoiDungs ? {
            userGroupId: selectedUser.id,
            nhomNguoiDungIds: values.nhomNguoiDungs
          } : null
        }
      };
      const res = await dispatch(UpdateUser(postData)).unwrap();
      if(res.succeeded){
        setSearchParams((curr) => ({...curr}))
      }
    }

    handleCancel();
  };
  const handleCancel = () => {
    form.resetFields();
    handlerClose();
  };

  useEffect(() => {
    (async () => {
      if(modalContext.selectedUser?.id){
        try {
          setUserLoading(true)
          const {data: user} = await userService.GetById(modalContext.selectedUser.id)
          form.setFieldsValue({
            ...user,
            chucVuId: user.chucVu?.id,
            chucDanhId: user.chucDanh?.id,
            nhomNguoiDungs: user.nhomNguoiDungs.flatMap(x => x.id)
          })
          setUserLoading(false)
        } catch(error){
          console.log(error);
        }
        finally{
          setUserLoading(false)
        }
      }
    })()
  }, [modalContext.selectedUser])

  useEffect(() => {
    if(chucDanhs === undefined){
      dispatch(SearchDanhMuc_ChucDanh({pageSize:500}))
    }
  }, [chucDanhs])

  useEffect(() => {
    if(chucVus === undefined){
      dispatch(SearchDanhMuc_ChucVu({pageSize:500}))
    }
  },[chucVus])

  useEffect(() => {
    if(nhomNguoiDungs === undefined){
      dispatch(SearchNhomNguoiDung({pageSize:500}))
    }
  },[nhomNguoiDungs])

  const danhSachPhongBans = useMemo(() => {

    return coCauToChucs?.filter(x => x.ofGroupCode == seletcurrentOffice || x.groupCode == seletcurrentOffice ) 
  }, [coCauToChucs,seletcurrentOffice])
  
  const danhDonVis = useMemo(() => {
    return coCauToChucs?.filter(x => x.type == "don-vi")
  }, [coCauToChucs])

  const onchangeofficeCode = (value: string) => {
    // Cập nhật giá trị đã chọn vào state
    SetSelectCurrentOffice(value);

    // Tiến hành các hành động khác như gọi API hoặc xử lý logic tùy theo yêu cầu
    console.log("Selected Office Code:", value);
  };
  return (
    <AntdModal
      title={selectedUser ? "Sửa thông tin người dùng" : "Thêm mới người dùng"}
      handlerCancel={handleCancel}
      visible={visible}
      footer={null}
      width={1000}
      destroyOnClose
      confirmLoading={userLoading}
    >
      
      <Form
        name="users"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        requiredMark={true}
      >
        {/* <Form.Item label="Nhóm" name="groupCode" hidden>
          <Input />
        </Form.Item> */}
        <Row gutter={[8, 8]}>
          <Col md={12} span={24}>
            <Form.Item
              label="Tên đăng nhập"
              name="userName"
              required={!selectedUser?.userId}
              rules={INPUT_RULES.ACCOUNT}
            >
              <Input disabled={selectedUser?.userId ? true : false} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item
              label="Họ và tên"
              name="fullName"
              required
              rules={INPUT_RULES.FULLNAME}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Chức vụ" name="chucVuId">
              <AntdSelect showSearch allowClear generateOptions={{model: chucVus, value: "id", label: "ten"}} />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Form.Item label="Chức danh" name="chucDanhId">
              <AntdSelect showSearch allowClear generateOptions={{model: chucDanhs, value: "id", label: "ten"}} />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Thẩm quyền xếp loại" name="thamQuyenXepLoai" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Là tài khoản mặc định" name="isDefault" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Kiêm nhiệm" name="kiemNhiem" valuePropName="checked">
            <Checkbox />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Là trưởng đơn vị" name="truongDonVi" valuePropName="checked">
            <Checkbox />
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Không đánh giá" name="khongDanhGia" valuePropName="checked">
              <Checkbox/>
            </Form.Item>
          </Col>
          <Col md={8} span={24}>
            <Form.Item label="Ký số" name="isKySo" valuePropName="checked">
              <Checkbox/>
            </Form.Item>
          </Col>
          
          <Col md={22} span={24}>
            <Form.Item label="Nhóm người dùng" name="nhomNguoiDungs">
              <AntdSelect mode="multiple" generateOptions={{model: nhomNguoiDungs, value: "id", label: "ten"}} allowClear ></AntdSelect>
            </Form.Item>
          </Col>
          <Col md={2} span={24}>
            <Form.Item label="Thứ tự" name="userOrder">
              <InputNumber style={{ width: "100%" }} defaultValue={1} />
            </Form.Item>
          </Col>
          {/* <Col span={24} md={12}>
            <Form.Item
              label="Phân quyền"
            >
              <AntdSelect
                virtual={false}
                mode="multiple"
                showSearch
                allowClear
                generateOptions={{
                  model: dataPermissions,
                  label: "claimValue",
                  value: "claimValue",
                }}
                lowerCaseStringValue={false}
              />
            </Form.Item>
          </Col> */}
          <Col span={24} md={12}>
            <Form.Item
              label="Đơn vị"
               name="officeCode"
            >
              <AntdSelect
                showSearch
                disabled
                onChange={onchangeofficeCode}
                generateOptions={{
                  model: danhDonVis,
                  label: "groupName",
                  value: "groupCode",
                }}
                lowerCaseStringValue={false}
              />
            </Form.Item>
          </Col>
          {/* {dangThemMoi ? null : */}
            <Col md={12} span={24}>
            <Form.Item label="Phòng ban" name="groupCode">
              <AntdSelect
              allowClear
              showSearch
              disabled
               generateOptions={{model: danhSachPhongBans, value: "groupCode", label: "groupName"}} lowerCaseStringValue={false}/>
            </Form.Item>
          </Col>
          {/* } */}
            
          {kiemNhiem ? <Col md={24} span={24}>
            <Form.Item label="Nội dung kiêm nhiệm" name="noiDungKiemNhiem">
              <Input.TextArea rows={4} maxLength={500} showCount/>
            </Form.Item>
          </Col>: null}
        </Row>
        <Form.Item wrapperCol={{ offset: 16, span: 24 }}>
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
