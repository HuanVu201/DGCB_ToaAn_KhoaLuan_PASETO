import React, { useState } from 'react';
import { Pagination, Card, Button, Layout, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Content, Footer } = Layout;

const steps = [
  "Bước 1: Yêu cầu quản trị cung cấp thông tin kết nối bao gồm: username, password,securityCode",
  "Bước 2: Lấy thông tin access_token. Sử dụng thông tin tại bước 1 gọi API: ",
  "Bước 3: Gọi API tích hợp.",
];

const links = [
  "",
  "https://dgcb.hanhchinhcong.net/api/tokens",  // Link cho bước 2
  "https://dgcb.hanhchinhcong.net/<Đường dẫn>",  // Link cho bước 3
];

const methods = [
  "",
  "Method: POST", // Phương thức cho bước 2
  "Method: <Phương thức>", // Phương thức cho bước 3
];

const headers = [
  "",
  "Body: {userName:<username> ,password:<password>,securityCode:<securityCode>}", // Header cho bước 2
  "Authorization: Bearer <token>", // Header cho bước 3
];

const responses = [
  "",
  `{ "token": "11b352d2-cf33-37e4-ab67-6092b3cf1e5f", "refreshToken": "65056751-6946-3c94-8cb8-8e99b648e8d3", refreshTokenExpiryTime:"2024-12-18T17:14:11.7271358+07:00" }`, // Response cho bước 2
  "Response: <Dữ liệu trả về từ API tích hợp>", // Response cho bước 3
];

const ShareDuLieuDanhGiaStepPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const stepsPerPage = 3; // Số bước hiển thị mỗi trang

  const totalSteps = steps.length;
  const startIdx = (currentPage - 1) * stepsPerPage;
  const currentSteps = steps.slice(startIdx, startIdx + stepsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '20px', minHeight: '80vh' }}>
        <div style={{ marginBottom: 24 }}>
          <h5>Các bước truy vấn API:</h5>
          <div>
            {currentSteps.map((step, index) => (
              <Card key={index} style={{ marginBottom: 16 }}>
                <p>{step}</p>
                {links[index] && (
                  <p>
                    <strong>Link:</strong> 
                    <a href={links[index]} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                      {links[index]}
                    </a>
                  </p>
                )}
                {methods[index] && <p><strong>{methods[index]}</strong></p>}
                {headers[index] && <p><strong>{headers[index]}</strong></p>}
                {responses[index] && <pre><strong>Response:</strong> {responses[index]}</pre>}
              </Card>
            ))}
          </div>
        </div>
        <Pagination
          current={currentPage}
          total={totalSteps}
          pageSize={stepsPerPage}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        <Space>
          <Button
            type="primary"
            icon={<LeftOutlined />}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Quay lại
          </Button>
          <Button
            type="primary"
            icon={<RightOutlined />}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalSteps / stepsPerPage)}
          >
            Tiếp theo
          </Button>
        </Space>
      </Footer>
    </Layout>
  );
};

export default ShareDuLieuDanhGiaStepPagination;
