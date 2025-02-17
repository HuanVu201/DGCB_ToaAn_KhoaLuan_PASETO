import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import CaNhanChucWrapper from './CaNhanWrapper';
import { AntdModal } from '@/lib/antd/components';
interface AddCaNhanOfDanhMucPhieuDanhGiaProps {
    visible: boolean;
    onClose: () => void;
  }

const AddCaNhanOfDanhMucPhieuDanhGia: React.FC<AddCaNhanOfDanhMucPhieuDanhGiaProps> = ({ visible, onClose }) => {
  // const [form] = Form.useForm();

  // const onFinish = (values : string) => {
  //   // Gọi API hoặc thực hiện các hành động cần thiết để lưu dữ liệu
  //   console.log('Received values:', values);
  //   message.success('Cá nhân đã được thêm thành công!');
    
  //   // Reset form sau khi thêm
  //   form.resetFields();
  //   onClose();
  // };

  return (
    <AntdModal
      title="Thêm cá nhân đánh giá"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width="100%"
    >
        <CaNhanChucWrapper role="don-vi"/>
    </AntdModal>
  );
};

export default AddCaNhanOfDanhMucPhieuDanhGia;
