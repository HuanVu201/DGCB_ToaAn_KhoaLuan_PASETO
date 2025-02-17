import React, { useEffect, useState } from "react";
import { Checkbox, Row, Col, Form, Button, Space } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { IRoles, IPermisstion, IRoleClaim } from "../models";
import { GetRoleClaimDistinct, GetPermissionOfRole, UpdateRoleClaimDistinct } from "../redux/action";
import { useRolesContext } from "../contexts/RolesContext";
import { AntdModal } from "@/lib/antd/components";
export const AddRolesClaim = () => {
  const dispatch = useAppDispatch();
  const { data: Roles, listRoleClaimDistinct: RoleClaims, loading } = useAppSelector(
    (state) => state.roles
  );
  const RolesContext = useRolesContext();
  
  // Khởi tạo state với các quyền đã có trong Roles.permissions
  const [selectedClaims, setSelectedClaims] = useState<string[]>([]);

  // Khi component load, dispatch các action để lấy quyền
  useEffect(() => {
    if (RolesContext.RolesId) {
      dispatch(GetPermissionOfRole(RolesContext.RolesId));
      dispatch(GetRoleClaimDistinct(RolesContext.RolesId));
    }
  }, [RolesContext.RolesId, dispatch]);

  // Khởi tạo selectedClaims từ Roles.permissions khi có dữ liệu
  useEffect(() => {
    if (Roles?.permissions) {
      setSelectedClaims(Roles.permissions.map((perm: IPermisstion) => perm.claimValue));
    }
  }, [Roles?.permissions]);

  // Cập nhật trạng thái selectedClaims khi checkbox thay đổi
  const handleCheckboxChange = (claimValue: string, checked: boolean) => {
    setSelectedClaims((prevSelectedClaims) => {
      if (checked) {
        // Thêm quyền vào danh sách đã chọn
        return [...prevSelectedClaims, claimValue];
      } else {
        // Xóa quyền khỏi danh sách đã chọn
        return prevSelectedClaims.filter((claim) => claim !== claimValue);
      }
    });
  };

  // Gửi dữ liệu lên server khi hoàn thành form
  const onFinish = async () => {
    // Gửi selectedClaims hoặc dữ liệu khác lên server ở đây
   
    const updatedPermissions: IRoleClaim[] = RoleClaims?.filter((claim: IRoleClaim) =>
        selectedClaims.includes(claim.claimValue)
      ) || [];
      console.log("Selected Claims: ", updatedPermissions);
      const dataupdate = {
        roleId: RolesContext.RolesId,
        listPermission: updatedPermissions,
    }
    console.log("DataUpdate: ", dataupdate);
    dispatch(UpdateRoleClaimDistinct(dataupdate))
  };

  const handleCancel = () => {
    RolesContext.setRolesClaimModalVisible(false);
  };

  return (
    <AntdModal
      title={RolesContext.RolesId ? `Danh sách quyền của vai trò: ${Roles?.name}` : `Danh sách quyền`}
      visible={RolesContext.RolesClaimModalVisible}
      handlerCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish}>
        {/* Hiển thị danh sách quyền */}
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item label="Quyền">
              <div>
                {/* Chia checkbox thành các cột */}
                <Row gutter={[8, 8]}>
                  {RoleClaims?.map((claim: IRoleClaim, index: number) => (
                    <Col span={8} key={claim.claimValue}>
                      <Checkbox
                        value={claim.claimValue}
                        // Kiểm tra nếu quyền đã có trong selectedClaims (tức là đã được chọn)
                        checked={selectedClaims.includes(claim.claimValue)}
                        onChange={(e) => handleCheckboxChange(claim.claimValue, e.target.checked)}
                      >
                        {claim.description}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Xác nhận
            </Button>
            <Button type="default" onClick={handleCancel}>
              Đóng
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </AntdModal>
  );
};
