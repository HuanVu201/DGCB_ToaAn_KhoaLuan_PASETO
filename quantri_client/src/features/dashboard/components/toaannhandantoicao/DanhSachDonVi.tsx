import { Card, Button, Select, Table, Pagination } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { useState } from 'react';
import data from './data.json';
import { useAppSelector } from '@/lib/redux/Hooks';
import { GetThongKeDonVi } from '../../models';

interface Unit {
    key: number;
    value: string;
    canbo: number;
    chuaChamDiem: number;
    tuChamDiem: number;
    daXepLoai: number;
    xuatSac: number;
    tot: number;
    hoanThanh: number;
    khongHoanThanh: number;
    label: string;
}

const { Option } = Select;

const DanhSachDonVi = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const { datas: CoCauToChucs } = useAppSelector(state => state.cocautochuc);
    const { listTkDonVi } = useAppSelector(state => state.dashboards);
    const newList = listTkDonVi?.slice() || []; // Nếu listTkDonVi là undefined thì dùng mảng rỗng

    newList.sort((a, b) => (b.tongSoCanBo || 0) - (a.tongSoCanBo || 0));
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            render: (_: any, record: any, index: number) => index + 1, // index bắt đầu từ 0, nên cộng thêm 1
            // sorter: (a: Unit, b: Unit) => a.key - b.key, 
        },
        {
            title: 'Đơn vị',
            dataIndex: 'tenDonVi',
            key: 'tenDonVi',
            // sorter: (a: GetThongKeDonVi, b: GetThongKeDonVi) => a.tenDonVi.localeCompare(b.tenDonVi), 
        },
        {
            title: 'Cán bộ',
            dataIndex: 'tongSoCanBo',
            key: 'tongSoCanBo',
            //sorter: (a: Unit, b: Unit) => a.canbo - b.canbo, 
        },
        {
            title: 'Chưa chấm điểm',
            dataIndex: 'chuaChamDiem',
            key: 'chuaChamDiem',
            render: (text: any, record: any) => {
                const tongSoCanBo = record.tongSoCanBo || 0; // Ensure safe access to data
                const tongSoTuDanhGia = record.tongSoTuDanhGia || 0; // Ensure safe access to data
                return tongSoCanBo - tongSoTuDanhGia; // Display the difference
            },
            //  sorter: (a: Unit, b: Unit) => a.chuaChamDiem - b.chuaChamDiem, 
        },
        {
            title: 'Tự chấm điểm',
            dataIndex: 'tongSoTuDanhGia',
            key: 'tongSoTuDanhGia',
            //  sorter: (a: Unit, b: Unit) => a.tuChamDiem - b.tuChamDiem,
        },
        {
            title: 'Đã xếp loại',
            dataIndex: 'tongSoDaXepLoai',
            key: 'tongSoDaXepLoai',
            // sorter: (a: Unit, b: Unit) => a.daXepLoai - b.daXepLoai, 
        },
        {
            title: 'Hoàn thành xuất sắc nhiệm vụ',
            dataIndex: 'danhGiaLoaiA',
            key: 'danhGiaLoaiA',
            //  sorter: (a: Unit, b: Unit) => a.xuatSac - b.xuatSac, 
        },
        {
            title: 'Hoàn thành tốt nhiệm vụ',
            dataIndex: 'danhGiaLoaiB',
            key: 'danhGiaLoaiB',
            //  sorter: (a: Unit, b: Unit) => a.tot - b.tot, 
        },
        {
            title: 'Hoàn thành nhiệm vụ',
            dataIndex: 'danhGiaLoaiC',
            key: 'danhGiaLoaiC',
            //  sorter: (a: Unit, b: Unit) => a.hoanThanh - b.hoanThanh,
        },
        {
            title: 'Không hoàn thành nhiệm vụ',
            dataIndex: 'danhGiaLoaiD',
            key: 'danhGiaLoaiD',
            // sorter: (a: Unit, b: Unit) => a.khongHoanThanh - b.khongHoanThanh, 
        },
    ];

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <Card
            title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 'bold' }}>Danh sách đơn vị</span>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button icon={<PrinterOutlined />} type="primary" style={{ marginRight: '10px' }}>
                            In danh sách
                        </Button>
                        <span style={{ marginRight: '10px' }}>Nhóm đơn vị: </span>
                        <Select defaultValue="Tất cả" style={{ width: 120 }}>
                            <Option value="Tất cả">Tất cả</Option>
                        </Select>
                    </div>
                </div>
            }
            style={{ width: '100%' }}
        >
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={data.length}
                onChange={handlePageChange}
                showSizeChanger
                pageSizeOptions={['10', '50', '100']}
                style={{ marginBottom: '20px', textAlign: 'right' }}
            />

            <Table
                columns={columns}
                //dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                dataSource={newList?.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                pagination={false}
                style={{ marginBottom: '20px' }}
            />

            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={data.length}
                onChange={handlePageChange}
                showSizeChanger
                pageSizeOptions={['10', '50', '100']}
                style={{ textAlign: 'right' }}
            />
        </Card>
    );
};

export default DanhSachDonVi;
