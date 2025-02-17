import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Col, Select, Row, Space } from 'antd';
import { LeftOutlined, HomeOutlined, SwapOutlined } from '@ant-design/icons';

import data from './data.json'
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks';
import { AntdSelect } from '@/lib/antd/components';
import { filterOptions } from '@/utils';
import { SearchCoCauToChuc } from '@/features/cocautochuc/redux/crud';
import { useDashBoardContext } from '../../contexts/DashBoardContext';

const ThanhDieuHuong = () => {
    const dispatch = useAppDispatch()
    const { datas: CoCauToChucs } = useAppSelector(state => state.cocautochuc);
    const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
    const { parseToken } = useAppSelector(state => state.auth);
    const [breadcrumbItems, setBreadcrumbItems] = useState([
        { title: parseToken?.tenDonVi, gruopCode: parseToken?.officeCode },
    ]);
    const dashboardscontext = useDashBoardContext();
    const handleSelect = (value: string, option: any) => {
        dashboardscontext.setDashBoardMaDonVi(value)
        const log = JSON.stringify(value)
        console.log("context mới " + { log })
        setBreadcrumbItems((prev) => [
            ...prev,    
            { title: option.children, gruopCode: value }, // Thêm tên đơn vị vào breadcrumb
        ]);
    };

    const handleBreadcrumbClick = (index: number) => {
        setBreadcrumbItems((prev) => prev.slice(0, index + 1));
        dashboardscontext.setDashBoardMaDonVi(breadcrumbItems[index].gruopCode);
    };

    useEffect(() => {
        if (breadcrumbItems.length > 1) {
            dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 500, ofGroupCode: breadcrumbItems[breadcrumbItems.length - 1].gruopCode }))
        }
        if (breadcrumbItems.length == 1) {
            dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 500, ofGroupCode: parseToken?.officeCode }))
        }
    }, [breadcrumbItems])
    return (
        <Row style={{ backgroundColor: "#fff", marginBottom: '5px' }}>
            <Col span={17}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        type="text"
                        icon={<LeftOutlined />}
                        title="Quay lại"
                        size="large"
                        style={{ margin: '4px' }}
                        onClick={() => {
                            setBreadcrumbItems((prev) => prev.slice(0, -1));
                        }}
                    />
                    <Button
                        type="text"
                        icon={<HomeOutlined />}
                        title="Đơn vị gốc"
                        size="large"
                        style={{ margin: '4px' }}
                        onClick={() => setBreadcrumbItems([{ title: parseToken?.tenDonVi, gruopCode: parseToken?.groupCode }])}
                    />

                    <Button
                        type="text"
                        icon={<SwapOutlined />}
                        title="Chuyển đổi đơn vị theo dõi"
                        size="large"
                        style={{ margin: '4px' }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '8px',
                            fontWeight: 'bold',
                            border: '1px solid #d9d9d9',
                            cursor: 'pointer',
                            width: '80%',
                            height: '5vh',
                        }}
                    >
                        <Breadcrumb
                            items={breadcrumbItems.map((item, index) => ({
                                title: (
                                    <span
                                        onClick={() => handleBreadcrumbClick(index)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {item.title}
                                    </span>
                                ),
                            }))}
                        />
                    </div>
                </div>
            </Col>
            {!selectedUnit ? (<><Col span={7} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Space>
                    <span>Đơn vị cấp dưới: </span>
                    <Select
                        showSearch
                        onChange={handleSelect}
                        style={{ width: 200 }}  // Điều chỉnh chiều rộng của Select
                    >
                        {CoCauToChucs?.map((item) => (
                            <Select.Option key={item.groupCode} value={item.groupCode}>
                                {item.groupName}
                            </Select.Option>
                        ))}
                    </Select>
                </Space>
            </Col></>) : (<></>)}
        </Row>
    );
};

export default ThanhDieuHuong;
