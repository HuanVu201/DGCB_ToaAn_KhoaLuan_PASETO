import React from "react";
import { Row, Col, Select, Input, Button, Divider } from "antd";

const { Option } = Select;

const SyncForm = () => {
  return (
    <div className="m-portlet__body" style={{ padding: "20px", background: "#f9f9f9", borderRadius: "8px" }}>
      {/* Tiêu đề */}
      <Row>
        <Col span={24} style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}>Đồng bộ dữ liệu người dùng</h1>
        </Col>
      </Row>

      {/* Row 1 */}
      <Row gutter={[16, 16]}>
      <Col span={24}>
          <label style={{ fontWeight: "bold", fontSize: "16px", color: "#555" }}>Url web nguồn:</label>
          <Input placeholder="Nhập url http://..." style={{ fontSize: "15px", borderRadius: "4px", padding: "8px" }} />
        </Col>
      </Row>
      <Divider />

      {/* Row 2 */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <label style={{ fontWeight: "bold", fontSize: "16px", color: "#555" }}>Chọn loại đồng bộ:</label>
          <Select defaultValue="SyncGroup" style={{ width: "100%", fontSize: "15px" }}>
          <Option value="SyncUser">Đồng bộ người dùng</Option>
            {/* <Option value="SyncGroup">Đồng bộ cơ cấu tổ chức</Option> */}
          </Select>
        </Col>
        {/* <Col span={12}>
          <label style={{ fontWeight: "bold", fontSize: "16px", color: "#555" }}>Chọn loại sharepoint:</label>
          <Select defaultValue="SP2013" style={{ width: "100%", fontSize: "15px" }}>
            <Option value="SP2013">Core Sharepoint 2013</Option>
            <Option value="SP2010">Core Sharepoint 2010</Option>
          </Select>
        </Col> */}
      </Row>

      <Divider />

      {/* Row 3 */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <label style={{ fontWeight: "bold", fontSize: "16px", color: "#555" }}>Url web đích:</label>
          <Input placeholder="Nhập url http://..." style={{ fontSize: "15px", borderRadius: "4px", padding: "8px" }} />
        </Col>
        {/* <Col span={12}>
          <label style={{ fontWeight: "bold", fontSize: "16px", color: "#555" }}>Kiểm trùng vai trò:</label>
          <label style={{ fontSize: "16px", color: "#555" }}>Không</label>
        </Col> */}
      </Row>

      <Divider />

      {/* Row 4 */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <label style={{ fontWeight: "bold", fontSize: "16px", color: "#555" }}>Tài khoản:</label>
          <Input placeholder="Nhập tài khoản" style={{ fontSize: "15px", borderRadius: "4px", padding: "8px" }} />
        </Col>
        <Col span={12}>
          <label style={{ fontWeight: "bold", fontSize: "16px", color: "#555" }}>Mật khẩu:</label>
          <Input.Password style={{ fontSize: "15px", borderRadius: "4px", padding: "8px" }} />
        </Col>
        {/* <Col span={8}>
          <label style={{ fontWeight: "bold", fontSize: "16px", color: "#555" }}>Site phân quyền:</label>
          <Input placeholder="/sites/..." style={{ fontSize: "15px", borderRadius: "4px", padding: "8px" }} />
        </Col> */}
      </Row>

      <Divider />

      {/* Row 5 */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <label style={{ fontWeight: "bold", fontSize: "16px", color: "#555" }}>Thời gian cập nhật cuối:</label>
          <Input placeholder="Bỏ trống nếu đồng bộ tất cả" style={{ fontSize: "15px", borderRadius: "4px", padding: "8px" }} />
        </Col>
        <Col span={12}>
          <label style={{ fontWeight: "bold", fontSize: "16px", color: "#555" }}>Mã nhóm Root:</label>
          <Input placeholder="Bỏ trống nếu đồng bộ tất cả" style={{ fontSize: "15px", borderRadius: "4px", padding: "8px" }} />
        </Col>
      </Row>

      <Divider />

      {/* Row 6 */}
      <Row gutter={[16, 16]}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Button
            type="primary"
            style={{
              marginRight: "10px",
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              padding: "10px 20px",
              borderRadius: "4px",
            }}
          >
           Đồng bộ người dùng
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SyncForm;
