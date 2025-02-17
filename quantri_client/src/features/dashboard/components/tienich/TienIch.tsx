import { Button, Col, Menu, Row, Select, Space, Tabs, Form } from "antd"
import { Link, useLocation } from "react-router-dom"
import { BackTop } from 'antd'
import { UpOutlined } from '@ant-design/icons'

import './TienIch.css'
import TabPane from "antd/es/tabs/TabPane"
import Toaannhandantoicao from "../toaannhandantoicao/GiaoDienToaAn"
import Canhan from "../canhan/GiaoDienCaNhan"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks"
import { GetNhacViec, GetTKDonVi } from "../../redux/action"
import { useDashBoardContext } from "../../contexts/DashBoardContext"
import { all } from "axios"

interface Option {
    value: string;
    label: string;
}

const { Option } = Select;

const options: Option[] = [
    { value: 'Tháng', label: 'Tháng' },
    { value: 'Quý', label: 'Quý' },
    { value: '6 tháng', label: '6 tháng' },
    { value: 'Năm', label: 'Năm' }
];

const options2: Option[] = [];

for (let i = 1; i <= 12; i++) {
    options2.push({
        value: `Tháng ${i}`,
        label: `Tháng ${i}`,
    });
}

const options3: Option[] = [];
for (let year = 2015; year <= 2024; year++) {
    options3.push({
        value: year.toString(),
        label: year.toString(),
    });
}

const options2ForQuarter: Option[] = [
    { value: 'Quý I', label: 'Quý I' },
    { value: 'Quý II', label: 'Quý II' },
    { value: 'Quý III', label: 'Quý III' },
    { value: 'Quý IV', label: 'Quý IV' }
];

const options2ForHalfYear: Option[] = [
    { value: '6 tháng đầu năm', label: '6 tháng đầu năm' },
    { value: '6 tháng cuối năm', label: '6 tháng cuối năm' }
];

export const MenuChuyentrang = () => {
    const location = useLocation();
    const { parseToken } = useAppSelector(state => state.auth);
    function callback(key: any) {
        console.log(key);
    }
    return (
        <Tabs
            defaultActiveKey="1"
            onChange={callback}
            tabBarExtraContent={<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <BoLocThoiGian />
            </div>} // Thêm Button vào thanh tab
        >
            <TabPane
             tab={<span style={{ paddingLeft: '20px' }}>Cá nhân</span>} key="2"
             >
                <Canhan></Canhan>
            </TabPane>
            <TabPane tab={parseToken?.tenDonVi} key={parseToken?.officeCode}>
                <Toaannhandantoicao></Toaannhandantoicao>
            </TabPane>
        </Tabs>
    )
}

export const BoLocThoiGian = () => {
    const dispatch = useAppDispatch();
    const { parseToken } = useAppSelector(state => state.auth);
    const dashboardscontext = useDashBoardContext();
    const [form] = Form.useForm();
    const currentDate = new Date();  // Get current date
    const currentYear = currentDate.getFullYear();  // Get current year
    const currentMonth = currentDate.getMonth() + 1;  // Get current month (1-12)
    const [isYearSelected, setIsYearSelected] = useState(true);  // State để theo dõi lựa chọn loại đánh giá
    const [options2State, setOptions2] = useState<Option[]>(options2);
    // // Hàm xử lý thay đổi giá trị của Form
    // const onValuesChange = (changedValues: any, allValues: any) => {
    //     console.log(allValues)
    //    
    // };
    // Hàm xử lý khi loại đánh giá thay đổi
    const onLoaiDanhGiaChange = (value: string) => {
        const allValues = form.getFieldsValue();
        dashboardscontext.setDashBoardLoaiThoiGian(allValues.loaiThoiGian)
        setIsYearSelected(value === "Năm");  // Kiểm tra nếu là "Năm" thì set state
        if (value === "Quý") {
            form.setFieldsValue({ kyDanhGia: "Quý I" }); // Mặc định chọn "Quý I"
            setOptions2(options2ForQuarter);  // Cập nhật các tùy chọn cho Quý
        } else if (value === "6 tháng") {
            form.setFieldsValue({ kyDanhGia: "6 tháng đầu năm" }); // Mặc định chọn "6 tháng đầu năm"
            setOptions2(options2ForHalfYear);  // Cập nhật các tùy chọn cho 6 tháng
        } else {
            form.setFieldsValue({ kyDanhGia: `Tháng ${currentMonth}` });  // Mặc định chọn tháng hiện tại
            setOptions2(options2);  // Cập nhật các tùy chọn cho tháng
        }
    };




    // Hàm xử lý khi thời gian thay đổi
    const onKyDanhGiaChange = (value: string) => {
        const allValues = form.getFieldsValue();
        dashboardscontext.setDashBoardKyDanhGia(value)
    };

    // Hàm xử lý khi năm thay đổi
    const onNamDanhGiaChange = (value: string) => {
        const allValues = form.getFieldsValue();
        dashboardscontext.setDashBoardNamDanhGia(Number(value))
    };

    useEffect(() => {

        // Format the month as "Tháng X" (e.g., "Tháng 12")
        const kyDanhGia = `Tháng ${currentMonth}`;
        form.setFieldsValue({ 
            namDanhGia: currentYear,
            loaiThoiGian: "Năm",
           // thoiGian: kyDanhGia 
        });
        // Dispatch with current year and month
        dispatch(
            GetTKDonVi({
                loaiThoiGian: "Năm",
                namDanhGia: currentYear,  // Use current year
                //kyDanhGia: kyDanhGia,      // Use formatted month string
                groupCode: dashboardscontext.DashBoardMaDonVi,
                // includeChild: true,        // As per your example
            })
        );
    }, []);
    return (
        <Form
            form={form}
            // onValuesChange={onValuesChange}  // Đăng ký onValuesChange cho Form
            layout="inline"  // Cấu hình hiển thị form theo dòng
            // initialValues={{
            //     loaiThoiGian: 'Tháng',
            //     thoiGian: 'Tháng 12',
            //     namDanhGia: '2024',
            // }}  // Đặt giá trị mặc định
        >
            <Space size="middle">
                <span style={{ fontSize: '16px' }}>Loại đánh giá:</span>
                <Form.Item name="loaiThoiGian">
                    <Select
                        showSearch
                        style={{ width: 120 }}  // Thay đổi độ rộng của Select
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={options}
                        onChange={onLoaiDanhGiaChange}  // Xử lý khi loại đánh giá thay đổi
                    />
                </Form.Item>
                {/* Nếu loại đánh giá là "Tháng", hiển thị chọn tháng */}
                {!isYearSelected && (
                    <Form.Item name="kyDanhGia">
                        <span style={{ fontSize: '16px' }}>Thời gian:  </span>
                        <Select
                            showSearch
                            defaultValue={`Tháng ${currentMonth}`}
                            style={{ width: 120 }}  // Thay đổi độ rộng của Select
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={options2State}
                            onChange={onKyDanhGiaChange}  // Xử lý khi thời gian thay đổi
                        />
                    </Form.Item>
                )}
                <Form.Item name="namDanhGia">
                    <span style={{ fontSize: '16px' }}>Năm: </span>
                    <Select
                        showSearch
                        defaultValue={`${currentYear}`}
                        style={{ width: 120 }}  // Thay đổi độ rộng của Select
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={options3}
                        onChange={onNamDanhGiaChange}  // Xử lý khi năm thay đổi
                    />
                </Form.Item>
            </Space>
        </Form>
    );
};

export const DieuHuongDauTrang = () => {
    return (
        <div>
            <BackTop visibilityHeight={750}>
                <div className="back-top-btn">
                    <UpOutlined />
                </div>
            </BackTop>
        </div>
    );
};