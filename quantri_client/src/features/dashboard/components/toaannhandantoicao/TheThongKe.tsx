import { Card, Col, Row } from "antd";
import {
  TeamOutlined,
  CheckSquareOutlined,
  FormOutlined,
  StarOutlined,
  TableOutlined,
  BarsOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useAppSelector } from "@/lib/redux/Hooks";
import { useDashBoardContext } from "../../contexts/DashBoardContext";
import { GetThongKeDonVi } from "../../models";

const data = [
  {
    title: "Tổng số cán bộ",
    count: 0,
    icon: <TeamOutlined />,
    color: "#009EF7",
  },
  {
    title: "Số lượng cán bộ chưa chấm điểm",
    count: 0,
    icon: <BarsOutlined />,
    color: "#50CD89",
  },
  {
    title: "Số lượng cán bộ tự chấm điểm",
    count: 0,
    icon: <CheckSquareOutlined />,
    color: "#7239EA",
  },
  {
    title: "Số lượng cán bộ đã xếp loại",
    count: 0,
    icon: <StarOutlined />,
    color: "#FFC700",
  },
  {
    title: "Đơn vị đã hoàn thành tự chấm điểm",
    count: "0 (0%)",
    icon: <ProfileOutlined />,
    color: "#F1416C",
  },
  {
    title: "Đơn vị chưa hoàn thành tự chấm điểm",
    count: "32 (100%)",
    icon: <TableOutlined />,
    color: "#7239EA",
  },
  {
    title: "Đơn vị đã hoàn thành xếp loại",
    count: "0 (0%)",
    icon: <CheckSquareOutlined />,
    color: "#009EF7",
  },
  {
    title: "Đơn vị chưa hoàn thành xếp loại",
    count: "32 (100%)",
    icon: <FormOutlined />,
    color: "#50CD89",
  },
];

const TheThongKe = () => {
  const dashboardscontext = useDashBoardContext()
  const { listTkDonVi } = useAppSelector(
    (state) => state.dashboards
  );
  const donviThongKe: GetThongKeDonVi | undefined = listTkDonVi?.find(x => x.maDonVi == dashboardscontext.DashBoardMaDonVi) || {};
  const tongSoCanBo = donviThongKe?.tongSoCanBo ?? 0;
  const tongSoTuDanhGia = donviThongKe?.tongSoTuDanhGia ?? 0;
  const tongSoDaXepLoai = donviThongKe?.tongSoDaXepLoai ?? 0;
  const tongSoKhongDanhGia = donviThongKe?.tongSoKhongDanhGia ?? 0;
  const totalUnits = listTkDonVi?.length ?? 0;

  // Calculate number of completed and not completed self-assessment units
  const completedSelfAssessmentUnits = listTkDonVi?.filter(
    (item) => {
      const tongSoCanBo = item.tongSoCanBo !== undefined ? item.tongSoCanBo : 0;
      const tongSoTuDanhGia = item.tongSoTuDanhGia !== undefined ? item.tongSoTuDanhGia : 0;
      if (tongSoCanBo === 0 && tongSoTuDanhGia === 0) {
        return false;
      }
      return tongSoCanBo - tongSoTuDanhGia === 0;
    }
  ).length ?? 0;

  const notCompletedSelfAssessmentUnits = totalUnits - completedSelfAssessmentUnits;

  // Calculate percentage of completed and not completed self-assessment units
  const completedSelfAssessmentPercentage = totalUnits > 0
    ? ((completedSelfAssessmentUnits / totalUnits) * 100).toFixed(2)
    : 0;

  const notCompletedSelfAssessmentPercentage = totalUnits > 0
    ? ((notCompletedSelfAssessmentUnits / totalUnits) * 100).toFixed(2)
    : 0;

  // Calculate number of completed and not completed rating units
  const completedRatingUnits = listTkDonVi?.filter(
    (item) => {
      const tongSoCanBo = item.tongSoCanBo !== undefined ? item.tongSoCanBo : 0;
      const tongSoDaXepLoai = item.tongSoDaXepLoai !== undefined ? item.tongSoDaXepLoai : 0;
      if (tongSoCanBo === 0 && tongSoDaXepLoai === 0) {
        return false;
      }
      return tongSoCanBo - tongSoDaXepLoai === 0;
    }
  ).length ?? 0;

  const notCompletedRatingUnits = totalUnits - completedRatingUnits;

  // Calculate percentage of completed and not completed rating units
  const completedRatingPercentage = totalUnits > 0
    ? ((completedRatingUnits / totalUnits) * 100).toFixed(2)
    : 0;

  const notCompletedRatingPercentage = totalUnits > 0
    ? ((notCompletedRatingUnits / totalUnits) * 100).toFixed(2)
    : 0;

  const detailThongKe = (value: string) => {
    dashboardscontext.setDashBoardModalListDetailVisible(true);
    dashboardscontext.setDashBoardStatisticNameProperty(value);
  }
  return (
    <>
      {/* <Card style={{ backgroundColor: "#fff" }}>
            <Row gutter={[16, 16]}>
                {data.map((item, index) => (
                    <Col xs={24} sm={12} md={6} key={index}>
                        <Card style={{ width: "100%", height: "125px", backgroundColor: item.color }}>
                            <Row>
                                <Col span={20} style={{ color: "white" }}>
                                    <div className="card-title text-overflow text-overflow-1 text-white" title={item.title} style={{ fontSize: '14px' }}>
                                        {item.title}
                                    </div>
                                    <h3 className="card-text m-0 text-white" style={{ fontSize: '24px' }}>
                                        <b>{item.count}</b>
                                    </h3>
                                </Col>
                                <Col span={4} style={{ textAlign: 'center', alignSelf: 'center' }}>
                                    <div style={{ fontSize: '3em', color: 'white' }}>
                                        {item.icon}
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Card> */}
      <>
        <Card style={{ backgroundColor: "#fff" }}>
          <Row gutter={[16, 16]}>
            {/* Card 1 */}
            <Col xs={24} sm={12} md={6}>
              <Card style={{ width: "100%", height: "125px", backgroundColor: "#009EF7" }} onClick={() => detailThongKe('Tổng số cán bộ')}>
                <Row>
                  <Col span={20} style={{ color: "white" }}>
                    <div className="card-title text-overflow text-overflow-1 text-white" title="Tổng số cán bộ" style={{ fontSize: '14px' }}>
                      Tổng số cán bộ
                    </div>
                    <h3 className="card-text m-0 text-white" style={{ fontSize: '24px' }}>
                      <b>{tongSoCanBo}</b>
                    </h3>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center', alignSelf: 'center' }}>
                    <div style={{ fontSize: '3em', color: 'white' }}>
                      <TeamOutlined />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Card 2 */}
            <Col xs={24} sm={12} md={6}>
              <Card style={{ width: "100%", height: "125px", backgroundColor: "#50CD89" }} onClick={() => detailThongKe('Số lượng cán bộ chưa chấm điểm')}>
                <Row>
                  <Col span={20} style={{ color: "white" }}>
                    <div className="card-title text-overflow text-overflow-1 text-white" title="Số lượng cán bộ chưa chấm điểm" style={{ fontSize: '14px' }}>
                      Số lượng cán bộ chưa chấm điểm
                    </div>
                    <h3 className="card-text m-0 text-white" style={{ fontSize: '24px' }}>
                      <b>
                        {tongSoCanBo - tongSoTuDanhGia}
                      </b>
                    </h3>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center', alignSelf: 'center' }}>
                    <div style={{ fontSize: '3em', color: 'white' }}>
                      <BarsOutlined />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Card 3 */}
            <Col xs={24} sm={12} md={6}>
              <Card style={{ width: "100%", height: "125px", backgroundColor: "#7239EA" }} onClick={() => detailThongKe('Số lượng cán bộ tự chấm điểm')}>
                <Row>
                  <Col span={20} style={{ color: "white" }}>
                    <div className="card-title text-overflow text-overflow-1 text-white" title="Số lượng cán bộ tự chấm điểm" style={{ fontSize: '14px' }}>
                      Số lượng cán bộ tự chấm điểm
                    </div>
                    <h3 className="card-text m-0 text-white" style={{ fontSize: '24px' }}>
                      <b>{tongSoTuDanhGia}</b>
                    </h3>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center', alignSelf: 'center' }}>
                    <div style={{ fontSize: '3em', color: 'white' }}>
                      <CheckSquareOutlined />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Card 4 */}
            <Col xs={24} sm={12} md={6}>
              <Card style={{ width: "100%", height: "125px", backgroundColor: "#FFC700" }} onClick={() => detailThongKe('Số lượng cán bộ đã xếp loại')}>
                <Row>
                  <Col span={20} style={{ color: "white" }}>
                    <div className="card-title text-overflow text-overflow-1 text-white" title="Số lượng cán bộ đã xếp loại" style={{ fontSize: '14px' }}>
                      Số lượng cán bộ đã xếp loại
                    </div>
                    <h3 className="card-text m-0 text-white" style={{ fontSize: '24px' }}>
                      <b>{tongSoDaXepLoai}</b>
                    </h3>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center', alignSelf: 'center' }}>
                    <div style={{ fontSize: '3em', color: 'white' }}>
                      <StarOutlined />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Card 5 */}
            <Col xs={24} sm={12} md={6}>
              <Card style={{ width: "100%", height: "125px", backgroundColor: "#F1416C" }} onClick={() => detailThongKe('Đơn vị hoàn thành tự chấm điểm')}>
                <Row>
                  <Col span={20} style={{ color: "white" }}>
                    <div className="card-title text-overflow text-overflow-1 text-white" title="Đơn vị đã hoàn thành tự chấm điểm" style={{ fontSize: '14px' }}>
                      Đơn vị đã hoàn thành tự chấm điểm
                    </div>
                    <h3 className="card-text m-0 text-white" style={{ fontSize: '24px' }}>
                      <b>{completedSelfAssessmentUnits}({completedSelfAssessmentPercentage}%)</b>
                    </h3>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center', alignSelf: 'center' }}>
                    <div style={{ fontSize: '3em', color: 'white' }}>
                      <ProfileOutlined />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Card 6 */}
            <Col xs={24} sm={12} md={6}>
              <Card style={{ width: "100%", height: "125px", backgroundColor: "#7239EA" }} onClick={() => detailThongKe('Đơn vị chưa hoàn thành tự chấm điểm')}>
                <Row>
                  <Col span={20} style={{ color: "white" }}>
                    <div className="card-title text-overflow text-overflow-1 text-white" title="Đơn vị chưa hoàn thành tự chấm điểm" style={{ fontSize: '14px' }}>
                      Đơn vị chưa hoàn thành tự chấm điểm
                    </div>
                    <h3 className="card-text m-0 text-white" style={{ fontSize: '24px' }}>
                      <b> {notCompletedSelfAssessmentUnits}({notCompletedSelfAssessmentPercentage}%)
                      </b>
                    </h3>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center', alignSelf: 'center' }}>
                    <div style={{ fontSize: '3em', color: 'white' }}>
                      <TableOutlined />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Card 7 */}
            <Col xs={24} sm={12} md={6}>
              <Card style={{ width: "100%", height: "125px", backgroundColor: "#009EF7" }} onClick={() => detailThongKe('Đơn vị đã hoàn thành xếp loại')}>
                <Row>
                  <Col span={20} style={{ color: "white" }}>
                    <div className="card-title text-overflow text-overflow-1 text-white" title="Đơn vị đã hoàn thành xếp loại" style={{ fontSize: '14px' }}>
                      Đơn vị đã hoàn thành xếp loại
                    </div>
                    <h3 className="card-text m-0 text-white" style={{ fontSize: '24px' }}>
                      <b>{completedRatingUnits}({completedRatingPercentage}%)</b>
                    </h3>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center', alignSelf: 'center' }}>
                    <div style={{ fontSize: '3em', color: 'white' }}>
                      <CheckSquareOutlined />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>

            {/* Card 8 */}
            <Col xs={24} sm={12} md={6}>
              <Card style={{ width: "100%", height: "125px", backgroundColor: "#50CD89" }} onClick={() => detailThongKe('Đơn vị chưa hoàn thành xếp loại')}>
                <Row>
                  <Col span={20} style={{ color: "white" }}>
                    <div className="card-title text-overflow text-overflow-1 text-white" title="Đơn vị chưa hoàn thành xếp loại" style={{ fontSize: '14px' }}>
                      Đơn vị chưa hoàn thành xếp loại
                    </div>
                    <h3 className="card-text m-0 text-white" style={{ fontSize: '24px' }}>
                      <b>{notCompletedRatingUnits}({notCompletedRatingPercentage}%)</b>
                    </h3>
                  </Col>
                  <Col span={4} style={{ textAlign: 'center', alignSelf: 'center' }}>
                    <div style={{ fontSize: '3em', color: 'white' }}>
                      <FormOutlined />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Card>
      </>


    </>
  );
};

export default TheThongKe;