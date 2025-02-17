import { Row, Col } from 'antd';

import { DieuHuongDauTrang } from '../tienich/TienIch';
import { MenuChuyentrang, BoLocThoiGian } from '../tienich/TienIch';
import TheThongKe from './TheThongKe';
import { BieuDoCotDong, BieuDoTron } from './DanhGiaDonVi';
import ThanhDieuHuong from './ThanhDieuHuong';
import DanhSachDonVi from './DanhSachDonVi';
import { useDashBoardContext } from '../../contexts/DashBoardContext';
import { useAppSelector } from '@/lib/redux/Hooks';
import { ModalViewListDetail } from '../viewListDetail/ModalListDetail';
import { useEffect, useState } from 'react';


const Toaannhandantoicao: React.FC = () => {
    const dashboardscontext = useDashBoardContext();
    const [loaiThoiGian, setLoaiThoiGian] = useState(dashboardscontext.DashBoardLoaiThoiGian);
    useEffect(() => {
        // Khi DashBoardLoaiThoiGian thay đổi, cập nhật state
        setLoaiThoiGian(dashboardscontext.DashBoardLoaiThoiGian);
        console.log(dashboardscontext.DashBoardLoaiThoiGian)
    }, [dashboardscontext.DashBoardLoaiThoiGian]);
    return (
        <div style={{ backgroundColor: '#eff2f5' }}>
            {/* <DieuHuongDauTrang /> */}
            <div style={{ padding: '10px' }} >
                <ThanhDieuHuong />
                <Row style={{ backgroundColor: "#fff", marginBottom: '5px' }}>
                    <TheThongKe />
                </Row>
                <Row gutter={[16, 16]} style={{ marginBottom: '5px' }}>
                    <Col span={loaiThoiGian === "Năm" ? 16 : 16}>
                        <BieuDoCotDong />
                    </Col>
                    <Col span={8}>
                        <BieuDoTron />
                    </Col>
                </Row>
                <Row >
                    <DanhSachDonVi />
                </Row>
                <ModalViewListDetail></ModalViewListDetail>
            </div>
        </div>
    );
}

export default Toaannhandantoicao;
