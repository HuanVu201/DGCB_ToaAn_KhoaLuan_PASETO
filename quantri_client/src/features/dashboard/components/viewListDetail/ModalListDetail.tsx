import { AntdModal, AntdTable } from "@/lib/antd/components";
import { Button, Checkbox, Col, Input, Row, Select, Table } from "antd";
import { LeftOutlined, HomeOutlined, SwapOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { Options } from "highcharts";
import { useDashBoardContext } from "../../contexts/DashBoardContext";
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { GetThongKeDonVi, IGetDanhSachDanhGia } from "../../models";
import { GetListUserResponeOfGetDanhSachDanhGia } from "../../redux/action";
import { useColumn } from "../../hooks/useColumn";
import DonVi from "@/pages/admin/quytrinhxuly/DonVi";

export const ModalViewListDetail = () => {
  function removePrefixParts(maDonVi: string): string {
    // Tách chuỗi theo dấu chấm "."
    const parts = maDonVi.split('.');

    // Lọc các phần không mong muốn
    const filteredParts = parts.filter(part => part !== "000" && part !== "00");

    // Kết nối lại các phần còn lại bằng dấu chấm
    return filteredParts.join('.');
  }

  const dashboardscontext = useDashBoardContext();
  const dispatch = useAppDispatch();
  const { listTkDonVi, listUser, count, listTkDonViNotChild } = useAppSelector(state => state.dashboards);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [maDonViTK, setMaDonViTK] = useState('');
  const [trangThai, settrangThai] = useState('');
  const [thoiGianQuery, setThoiGianQuery] = useState('');
  const newList = listTkDonVi?.slice() || []; // Nếu listTkDonVi là undefined thì dùng mảng rỗng
  newList.sort((a, b) => (b.tongSoCanBo || 0) - (a.tongSoCanBo || 0));
  const [searchParams, setSearchParams] = useState<IGetDanhSachDanhGia>({ pageNumber: 1, pageSize: 50, maDonViTK: maDonViTK, thoiGianQueryTK: thoiGianQuery, trangThai: trangThai })
  const { columns } = useColumn({ pageNumber: searchParams.pageNumber, pageSize: searchParams.pageSize })
  const [isListView, setIsListView] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState<GetThongKeDonVi[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const toggleView = () => {
    setIsListView((prev) => !prev);
  };
  // Cập nhật chartOptions mỗi khi selectedUnits thay đổi
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "column",
    },
    title: {
      text: `Biểu đồ ${selectedProperty}`,
    },
    xAxis: {
      categories: [],
    },
    yAxis: [
      {
        title: {
          text: "Giá trị cột",
        },
      },
    ],
    series: [],
  });

  // Cập nhật chartOptions khi selectedUnits thay đổi
  useEffect(() => {
    setChartOptions((prevOptions: any) => ({
      ...prevOptions,
      xAxis: {
        categories: selectedUnits.map((unit) => unit.tenDonVi),
      },
      series: [
        {
          name: "Giá trị",
          type: "column",
          data: selectedUnits.map((unit) => {
            // Tùy thuộc vào tên thuộc tính, lấy giá trị tương ứng
            if (selectedProperty === 'Tổng số cán bộ') {
              return unit.tongSoCanBo;
            }
            if (selectedProperty === 'Số lượng cán bộ chưa chấm điểm') {
              var tscb = unit.tongSoCanBo ?? 0;
              var tsTuDG = unit.tongSoTuDanhGia ?? 0;
              return tscb - tsTuDG;
            }
            if (selectedProperty === 'Số lượng cán bộ tự chấm điểm') {
              return unit.tongSoTuDanhGia;
            }
            if (selectedProperty === 'Số lượng cán bộ đã xếp loại') {
              return unit.tongSoDaXepLoai;
            }
            if (selectedProperty === 'Đơn vị đã hoàn thành tự chấm điểm') {
              return unit.tongSoTuDanhGia;
            }
            if (selectedProperty === 'Đơn vị chưa hoàn thành tự chấm điểm') {
              var tscb = unit.tongSoCanBo ?? 0;
              var tsTuDG = unit.tongSoTuDanhGia ?? 0;
              return tscb - tsTuDG;
            }
            if (selectedProperty === 'Đơn vị đã hoàn thành xếp loại') {
              return unit.tongSoDaXepLoai;
            }
            if (selectedProperty === 'Đơn vị chưa hoàn thành xếp loại') {
              var tscb = unit.tongSoCanBo ?? 0;
              var tsTuXL = unit.tongSoDaXepLoai ?? 0;
              return tscb - tsTuXL;
            }
            return unit.tongSoTuDanhGia;
          }),
        },
      ],
    }));
  }, [selectedUnits]);
  useEffect(() => {
    setSearchParams({ pageNumber: 1, pageSize: 50, maDonViTK: maDonViTK, thoiGianQueryTK: thoiGianQuery, trangThai: trangThai })
  }, [trangThai, thoiGianQuery])

  useEffect(() => {

  }, [])
  useEffect(() => {
    if (dashboardscontext.DashBoardStatisticNameProperty != undefined) {
      setSelectedProperty(dashboardscontext.DashBoardStatisticNameProperty)
      setIsListView(false)
      setSelectedUnits([])
      setSelectAll(false)
      if (dashboardscontext.DashBoardStatisticNameProperty == "Tổng số cán bộ") {
        settrangThai("All")
      }
      if (dashboardscontext.DashBoardStatisticNameProperty == "Số lượng cán bộ tự chấm điểm") {
        settrangThai("")
      }
      if (dashboardscontext.DashBoardStatisticNameProperty == "Số lượng cán bộ chưa chấm điểm") {
        settrangThai("Chưa đánh giá")
      }
      if (dashboardscontext.DashBoardStatisticNameProperty == "Số lượng cán bộ đã xếp loại") {
        settrangThai("Đã đánh giá")
      }
      if (dashboardscontext.DashBoardStatisticNameProperty == "Đơn vị đã hoàn thành tự chấm điểm") {
        settrangThai("")
      }
      if (dashboardscontext.DashBoardStatisticNameProperty == "Đơn vị chưa hoàn thành tự chấm điểm") {
        settrangThai("Chưa đánh giá")
      }
      if (dashboardscontext.DashBoardStatisticNameProperty == "Đơn vị đã hoàn thành xếp loại") {
        settrangThai("Đã đánh giá")
      }
      if (dashboardscontext.DashBoardStatisticNameProperty == "Đơn vị chưa hoàn thành xếp loại") {
        settrangThai("Chưa xếp loại")
      }
    }
    if (dashboardscontext.DashBoardMaDonVi != undefined) {
     // setMaDonViTK(removePrefixParts(dashboardscontext.DashBoardMaDonVi))
     setMaDonViTK(dashboardscontext.DashBoardMaDonVi)
    }
    if (dashboardscontext.DashBoardLoaiThoiGian != undefined && dashboardscontext.DashBoardNamDanhGia?.toString()) {
      if (dashboardscontext.DashBoardLoaiThoiGian == "Tháng" && dashboardscontext.DashBoardKyDanhGia != undefined) {
        let kyDanhGia = dashboardscontext.DashBoardKyDanhGia;
        kyDanhGia = kyDanhGia.split(' ')[1];
        let monthNumber = parseInt(kyDanhGia, 10).toString().padStart(2, '0');
        setThoiGianQuery(dashboardscontext.DashBoardNamDanhGia?.toString() + monthNumber)
      }
      if (dashboardscontext.DashBoardLoaiThoiGian == "Quý") {
        setThoiGianQuery(dashboardscontext.DashBoardNamDanhGia?.toString() + dashboardscontext.DashBoardKyDanhGia)
      }
      if (dashboardscontext.DashBoardLoaiThoiGian == "Năm") {
        setThoiGianQuery(dashboardscontext.DashBoardNamDanhGia?.toString())
      }
      if (dashboardscontext.DashBoardLoaiThoiGian == "6 Tháng") {
        setThoiGianQuery(dashboardscontext.DashBoardNamDanhGia?.toString() + dashboardscontext.DashBoardKyDanhGia)
      }
    }
  }, [dashboardscontext.DashBoardStatisticNameProperty])


  const handleUnitChange = (checked: boolean, unit: GetThongKeDonVi) => {
    if (checked) {
      setSelectedUnits((prev) => [...prev, unit]);
    } else {
      setSelectedUnits((prev) =>
        prev.filter((item) => item.tenDonVi !== unit.tenDonVi)
      );
    }
    // Kiểm tra và cập nhật trạng thái của "Chọn toàn bộ"
    updateSelectAllState();
  };
  // Cập nhật trạng thái "Chọn toàn bộ"
  const updateSelectAllState = () => {
    setSelectAll(newList?.length === selectedUnits.length);
  };
  // Hàm chọn tất cả các đơn vị
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUnits(newList || []); // Chọn tất cả
    } else {
      setSelectedUnits([]); // Bỏ chọn tất cả
    }
    // Cập nhật trạng thái "Chọn toàn bộ"
    setSelectAll(checked);
  };
  const handleCancel = () => {
    dashboardscontext.setDashBoardModalListDetailVisible(false);
  };

  return (
    <AntdModal
      title={selectedProperty}
      visible={dashboardscontext.DashBoardModalListDetailVisible}
      width="100%" // Chiếm hết chiều rộng
      style={{ height: "100vh", top: 0 }} // Chiếm toàn bộ chiều cao của màn hình
      handlerCancel={handleCancel}
    >
      <div className="p-1 d-flex flex-column modal-body">
        <Row gutter={[8, 8]} className="m-0 d-flex">
          <Col span={24} className="d-flex flex-row bg-white p-1 m-0 mb-2">
            <Col className="flex-grow-1 align-items-center d-flex flex-row">
              <Button
                icon={<LeftOutlined />}
                className="btn-light btn-icon me-1"
                title="Quay lại"
              />
              <Button
                icon={<HomeOutlined />}
                className="btn-light btn-icon me-1"
                title="Đơn vị gốc"
              />
              <div className="me-2 w-100 h-100 rounded border d-flex align-items-center hoverable">
                <div
                  className="ps-2 font-weight-bold hoverable"
                  title="Tòa án nhân dân tối cao"
                >
                  {listTkDonViNotChild && listTkDonViNotChild.length > 0 ? listTkDonViNotChild[0].tenDonVi : "Đơn vị chưa có dữ liệu"}
                </div>
              </div>
            </Col>
            <Col className="d-flex flex-row align-items-center justify-content-end flex-shrink-0">
              <Button
                className="btn-color-primary btn-active-light-primary btn-td"
                onClick={toggleView}
              >
                Xem dạng danh sách
              </Button>
              <span className="mx-2">Nhóm đơn vị: </span>
              <Select
                defaultValue="Tất cả"
                style={{ width: 200 }}
                className="ant-select-single ant-select-show-arrow"
              >
                <Select.Option value="Tất cả">Tất cả</Select.Option>
                {/* Thêm các tùy chọn khác ở đây */}
              </Select>
              {/* <span className="mx-2">Tiêu chí: </span>
              <Select
                mode="multiple"
                style={{ width: 300 }}
                className="ant-select-multiple ant-select-show-search"
              >
                <Select.Option value="criteria1">Tiêu chí 1</Select.Option>
                <Select.Option value="criteria2">Tiêu chí 2</Select.Option>
              </Select> */}
            </Col>
          </Col>
        </Row>
        {isListView ? (
          <div
            className="table-container"
            style={{ height: "100%", overflowY: "auto" }}
          >
            <AntdTable
              columns={columns}
              dataSource={listUser}
              pagination={{
                total: count
              }}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onSearch={(params) => {
                //console.log("Params:", params);
                dispatch(GetListUserResponeOfGetDanhSachDanhGia(params))
              }}
            />
            {/* <Table
              columns={columns}
              dataSource={listUser}
              pagination={false}
              scroll={{ y: "calc(100vh - 200px)" }}
            /> */}
          </div>
        ) : (
          <Row className="d-flex flex-row align-items-stretch overflow-hidden m-0">
            <Col
              span={6}
              className="border position-relative"
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            >
              <div className="d-flex flex-column position-absolute h-100 w-100">
                <div className="toolbar d-flex mb-1 mt-1 me-3">
                  <Input placeholder="Tìm kiếm đơn vị" className="ant-input" />
                </div>
                <div
                  className="d-flex flex-row justify-content-between"
                  style={{ borderBottom: "1px dashed rgba(94, 4, 4, 0.3)" }}
                >
                  <div className="d-flex flex-row p-2 align-items-center p-2 me-4 ms-2">
                    <Checkbox
                      checked={selectAll}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                    <span className="flex-grow-1 ms-2">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span
                          className="caption font-weight-bold cursor-pointer me-2"
                          style={{ color: "rgb(87, 89, 98)" }}
                        >
                          Chọn toàn bộ
                        </span>
                      </div>
                    </span>
                  </div>
                  <Button
                    className="btn-color-primary btn-active-light-primary btn-td"
                    icon={<SwapOutlined />}
                    title="In danh sách"
                  >
                    In danh sách
                  </Button>
                </div>
                <div className="flex-grow-1 p-2 overflow-auto me-2">
                  {newList
                    // ?.sort((a, b) => {
                    //   const aTongSoCanBo = a.tongSoCanBo?.toString() || ''; // Chuyển đổi số thành chuỗi, nếu là undefined thì dùng chuỗi rỗng
                    //   const bTongSoCanBo = b.tongSoCanBo?.toString() || ''; // Tương tự
                    //   return aTongSoCanBo.localeCompare(bTongSoCanBo); // So sánh các chuỗi
                    // })
                    .map((unit) => {
                      // var check = true;
                      // if (dashboardscontext.DashBoardStatisticNameProperty == "Tổng số cán bộ") {
                      //   check = true;
                      // }
                      // if (dashboardscontext.DashBoardStatisticNameProperty == "Số lượng cán bộ tự chấm điểm") {
                      //   check = true;
                      // }
                      // if (dashboardscontext.DashBoardStatisticNameProperty == "Số lượng cán bộ chưa chấm điểm") {
                      //   check = true;
                      // }
                      // if (dashboardscontext.DashBoardStatisticNameProperty == "Số lượng cán bộ đã xếp loại") {
                      //   check = true;
                      // }
                      // if (dashboardscontext.DashBoardStatisticNameProperty == "Đơn vị đã hoàn thành tự chấm điểm") {
                      //  if(unit.tongSoTuDanhGia == 0)
                      //  {
                      //     check = false;
                      //  }
                      //  else{
                      //   if(unit.tongSoTuDanhGia == unit.tongSoCanBo) 
                      //   {
                      //     check = true;
                      //   }
                      //   }
                      // }
                      // if (dashboardscontext.DashBoardStatisticNameProperty == "Đơn vị chưa hoàn thành tự chấm điểm") {
                      //   if(unit.tongSoTuDanhGia == 0)
                      //     {
                      //        check = true;
                      //     }
                      //     else{
                      //      if(unit.tongSoTuDanhGia == unit.tongSoCanBo) 
                      //      {
                      //        check = false;
                      //      }
                      //      else
                      //      {
                      //       check = true;
                      //      }
                      //      }
                      // }
                      // if (dashboardscontext.DashBoardStatisticNameProperty == "Đơn vị đã hoàn thành xếp loại") {

                      // }
                      // if (dashboardscontext.DashBoardStatisticNameProperty == "Đơn vị chưa hoàn thành xếp loại") {

                      // }

                      return (
                        <>

                          <div key={unit.maDonVi} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Checkbox
                              checked={selectedUnits.some(
                                (selected) => selected.tenDonVi === unit.tenDonVi
                              )}
                              onChange={(e) =>
                                handleUnitChange(e.target.checked, unit)
                              }
                            >
                              {unit.tenDonVi}
                            </Checkbox>
                            <span style={{ color: "red", marginLeft: "auto", whiteSpace: "nowrap" }}>
                              {
                                dashboardscontext.DashBoardStatisticNameProperty == 'Tổng số cán bộ' ?
                                  (<>{unit.tongSoCanBo}</>)
                                  : dashboardscontext.DashBoardStatisticNameProperty == 'Số lượng cán bộ chưa chấm điểm' ?
                                    (<>{(unit.tongSoCanBo ?? 0) - (unit.tongSoTuDanhGia ?? 0)}/{unit.tongSoCanBo}</>)
                                    : dashboardscontext.DashBoardStatisticNameProperty == 'Số lượng cán bộ tự chấm điểm' ?
                                      (<>{unit.tongSoTuDanhGia}/{unit.tongSoCanBo}</>)
                                      : dashboardscontext.DashBoardStatisticNameProperty == 'Số lượng cán bộ đã xếp loại' ?
                                        (<>{unit.tongSoDaXepLoai}/{unit.tongSoCanBo}</>)
                                        : dashboardscontext.DashBoardStatisticNameProperty == 'Đơn vị đã hoàn thành tự chấm điểm' ?
                                          (<>{unit.tongSoTuDanhGia}/{unit.tongSoCanBo}</>)
                                          : dashboardscontext.DashBoardStatisticNameProperty == 'Đơn vị chưa hoàn thành tự chấm điểm' ?
                                            (<>{(unit.tongSoCanBo ?? 0) - (unit.tongSoTuDanhGia ?? 0)}/{unit.tongSoCanBo}</>)
                                            : dashboardscontext.DashBoardStatisticNameProperty == 'Đơn vị đã hoàn thành xếp loại' ?
                                              (<>{unit.tongSoDaXepLoai}/{unit.tongSoCanBo}</>)
                                              : dashboardscontext.DashBoardStatisticNameProperty == 'Đơn vị chưa hoàn thành xếp loại' ?
                                                (<>{(unit.tongSoCanBo ?? 0) - (unit.tongSoDaXepLoai ?? 0)}/{unit.tongSoCanBo}</>)
                                                : (<></>)
                              }
                            </span>
                          </div>

                        </>
                      )
                    })}
                </div>
              </div>
            </Col>
            <Col
              span={18}
              className="border overflow-auto flex-column h-100"
              style={{ backgroundColor: "rgb(255, 255, 255)" }}
            >
              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            </Col>
          </Row>
        )}
      </div>
    </AntdModal>
  );
};
