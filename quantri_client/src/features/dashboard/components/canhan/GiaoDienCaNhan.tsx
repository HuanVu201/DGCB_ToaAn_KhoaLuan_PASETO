import { Row, Col, Card, Typography } from 'antd';
import { BarChartOutlined, PlusOutlined, CalendarOutlined, AppstoreOutlined, HourglassOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Service } from '@/services';
import { useAppDispatch, useAppSelector } from '@/lib/redux/Hooks';
import { useEffect } from 'react';
import { GetNhacViec } from '../../redux/action';
// import { MenuChuyentrang, BoLocThoiGian } from '../tienich/TienIch';
// import BieuDoCaNhan from './bieudocanhan';
const { primaryRoutes } = Service
const { Title } = Typography;

const Canhan = () => {
    const dispatch = useAppDispatch()
    const { parseToken } = useAppSelector(state => state.auth);
    const { listNhacViec } = useAppSelector(state => state.dashboards);
    useEffect(() => {
        dispatch(GetNhacViec({ maDV: parseToken?.officeCode, taiKhoan: parseToken?.sub, loaiThoiGian: "Năm" }))
    }, [])

    const navigate = useNavigate();
    return (
        <div style={{ backgroundColor: '#eff2f5' }}>
            <div style={{ padding: '10px' }} >
                <Row style={{ marginBottom: '5px', backgroundColor: "#fff" }}>
                    <Col span={15}>
                        {/* <MenuChuyentrang /> */}
                    </Col>
                    <Col span={9} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* <BoLocThoiGian /> */}
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Card
                                    title="Đánh giá cá nhân"
                                    headStyle={{ borderBottom: 'none', color: 'white' }}
                                    style={{ backgroundColor: '#F1416C', height: '100%' }}
                                >
                                    {/* <BieuDoCaNhan /> */}
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card>
                                    <Row gutter={[16, 16]}>
                                        <Col span={12}>
                                            <Card style={{ backgroundColor: '#fff3cd' }} hoverable onClick={() => navigate(primaryRoutes.thongkeDgcb.thongBaoDanhGiaCoQuan, { replace: true })}>
                                                <BarChartOutlined style={{ fontSize: '24px', color: '#ffc107' }} />
                                                <Title level={5}>Thống kê</Title>
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card style={{ backgroundColor: '#f8d7da' }} hoverable onClick={() => navigate(primaryRoutes.danhGiaCanBo.tuChamDiem.canBoTuDanhGia, { replace: true })} >
                                                <PlusOutlined style={{ fontSize: '24px', color: '#dc3545' }} />
                                                <Title level={5}>Tự đánh giá</Title>
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                            <Card style={{ backgroundColor: '#fdecea' }} hoverable onClick={() => navigate(primaryRoutes.danhGiaCanBo.tuChamDiem.canBoTuDanhGia, { replace: true })}>
                                                <AppstoreOutlined style={{ fontSize: '24px', color: '#dc3545' }} />
                                                <Title level={5}>Danh sách đánh giá</Title>
                                            </Card>
                                        </Col>
                                        {/* <Col span={12}>
                                            <Card style={{ backgroundColor: '#d4edda' }} hoverable>
                                                <CalendarOutlined style={{ fontSize: '24px', color: '#28a745' }} />
                                                <Title level={5}>Kế hoạch công việc</Title>
                                            </Card>
                                            style={{ backgroundColor: '#1976D2' }}
                                        </Col> */}
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    {listNhacViec && listNhacViec?.length > 0 ? (<> <Col span={12}>
                        <Card title="Nhắc việc" style={{ height: '100%' }}>
                            <Row gutter={[16, 16]}>
                                {listNhacViec.map((nhacViec, index) => (
                                    <Col span={12}>
                                        <Card style={{ backgroundColor: '#1976D2' }} hoverable onClick={() => {
                                            let link = nhacViec.duongDan?.split('?')[0]
                                            navigate({ pathname: link }, { replace: true })
                                        }}>
                                            <Row justify="space-between" align="middle" style={{ width: '100%' }}>
                                                {/* Left Section - Text */}
                                                <Col span={16} style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Title level={5} style={{ color: 'white', marginBottom: 0 }}>
                                                        {nhacViec.moTa}
                                                    </Title>
                                                    <Title level={5} style={{ color: 'white', marginBottom: 0 }}>
                                                        {nhacViec.giaTri}
                                                    </Title>
                                                </Col>

                                                {/* Right Section - Icon */}
                                                <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                                                    <CheckCircleOutlined style={{ fontSize: '30px', color: 'white' }} />
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>))}

                            </Row>
                        </Card>
                    </Col></>) : (<></>)

                    }

                </Row>
            </div>
        </div>
    );
}

export default Canhan;