import { useEffect, useMemo, useState } from "react"
import { AntdTable, AntdSpace, AntdMenu } from "../../../lib/antd/components"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/Hooks"


import { Button, Col, Layout, Row, Spin } from "antd"
import { BoLocThoiGian, DieuHuongDauTrang, MenuChuyentrang } from "./tienich/TienIch"
import { SearchCoCauToChuc } from "@/features/cocautochuc/redux/crud"
import { DashBoardProvider, useDashBoardContext } from "../contexts/DashBoardContext"
import { GetTKDonVi, GetTKDonViNotChild } from "../redux/action"
import { toast } from "react-toastify"
import { Header } from "antd/es/layout/layout"
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, SolutionOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { DropDownUser } from "@/lib/antd/components/dropdown/DropDownUser"
import { SearchMenu } from "@/features/danhmucmenu/redux/action"
import { useNhacViec } from "@/lib/antd/components/layout/hooks/useNhacViec"
import { MainContextProvider } from "@/lib/antd/components/layout/context/MainContext"
import { useWindowSizeChange } from "@/hooks/useWindowSizeChange"
import { SearchPublicConfig } from "@/features/config/redux/action"
import Sider from "antd/es/layout/Sider"




const DoanhBoardView = () => {

    const dispatch = useAppDispatch()
    const { data: user } = useAppSelector(state => state.user);
    const { parseToken } = useAppSelector(state => state.auth);
    const { publicModule } = useAppSelector(state => state.config)
    const dashboardscontext = useDashBoardContext();
    const { navigationMenu, loading: menuLoading, activeModule } = useAppSelector(state => state.menu)
    const { _internalRenderMenuItem, BadgeBell } = useNhacViec({})
    const { isMobile } = useWindowSizeChange()
    useEffect(() => {
        if (publicModule === undefined) {
          dispatch(SearchPublicConfig());
        }
      }, []);
    // const [logoQuanTri] = useMemo(() => {
    //     return [publicModule?.find((x) => x.code == "logo-quan-tri")];
    //   }, [publicModule]);
      
    useEffect(() => {
        const currentDate = new Date();  // Get current date
        const currentYear = currentDate.getFullYear();  // Get current year
        const currentMonth = currentDate.getMonth() + 1;  // Get current month (1-12)
        const kyDanhGia = `Tháng ${currentMonth}`;
        dashboardscontext.setDashBoardMaDonVi(parseToken?.officeCode);
        dashboardscontext.setDashBoardKyDanhGia(kyDanhGia)
        dashboardscontext.setDashBoardNamDanhGia(currentYear)
        dashboardscontext.setDashBoardLoaiThoiGian("Năm")
        dispatch(SearchCoCauToChuc({ pageNumber: 1, pageSize: 500, ofGroupCode: parseToken?.officeCode }))
    }, [])
    useEffect(() => {
        //listsegment chứa ['/','dvc'] || ['/','admin']
        const listSegment = location.pathname.split("/");
        // không cho gọi lại api lấy menu khi vẫn ở segment cùng với module ở searchParam lần gọi api cuối
        if (listSegment.length > 0 && listSegment[1] != activeModule) {
          dispatch(
            SearchMenu({
              active: true,
              pageNumber: 1,
              pageSize: 120,
              filterByUserRole: true,
              module: listSegment[1] as any,
            })
          );
        }
      }, [location.pathname, activeModule])
    useEffect(() => {
        const lastYear = dashboardscontext.DashBoardNamDanhGia ? dashboardscontext.DashBoardNamDanhGia - 1 : new Date().getFullYear() - 1;
        if (dashboardscontext.DashBoardLoaiThoiGian == "Năm") {
            dispatch(GetTKDonVi({ groupCode: dashboardscontext.DashBoardMaDonVi, loaiThoiGian: dashboardscontext.DashBoardLoaiThoiGian, namDanhGia: dashboardscontext.DashBoardNamDanhGia, includeChild: true }))
            dispatch(GetTKDonViNotChild({ groupCode: dashboardscontext.DashBoardMaDonVi, loaiThoiGian: "Năm",includeChild:false ,thoiGianQueryFrom:2022 , thoiGianQueryTo: 2024}));
        }
        if (dashboardscontext.DashBoardLoaiThoiGian == "Quý") {
            dispatch(GetTKDonVi({ groupCode: dashboardscontext.DashBoardMaDonVi, loaiThoiGian: dashboardscontext.DashBoardLoaiThoiGian, namDanhGia: dashboardscontext.DashBoardNamDanhGia, includeChild: true }))
            let thoiGianQueryFrom ;
            let thoiGianQueryTo ;
            if(dashboardscontext.DashBoardKyDanhGia == "Quý I") 
            {
                thoiGianQueryFrom =lastYear.toString()+"001";
                thoiGianQueryTo = dashboardscontext.DashBoardNamDanhGia?.toString()+"001";
            }
            if(dashboardscontext.DashBoardKyDanhGia == "Quý II")
            {
                thoiGianQueryFrom =lastYear.toString()+"002";
                thoiGianQueryTo = dashboardscontext.DashBoardNamDanhGia?.toString()+"002";
            }
            if(dashboardscontext.DashBoardKyDanhGia == "Quý III")
            {
                thoiGianQueryFrom =lastYear.toString()+"003";
                thoiGianQueryTo = dashboardscontext.DashBoardNamDanhGia?.toString()+"003";
            }
            if(dashboardscontext.DashBoardKyDanhGia == "Quý IV")
            {
                thoiGianQueryFrom =lastYear.toString()+"004";
                thoiGianQueryTo = dashboardscontext.DashBoardNamDanhGia?.toString()+"004";
            }
          
            if(thoiGianQueryFrom != undefined && thoiGianQueryTo != undefined)
            dispatch(GetTKDonViNotChild({ groupCode: dashboardscontext.DashBoardMaDonVi, loaiThoiGian: dashboardscontext.DashBoardLoaiThoiGian, thoiGianQueryFrom: parseInt(thoiGianQueryFrom,10), thoiGianQueryTo: parseInt(thoiGianQueryTo,10) }))
        }
        if (dashboardscontext.DashBoardLoaiThoiGian == "6 tháng") {
            dispatch(GetTKDonVi({ groupCode: dashboardscontext.DashBoardMaDonVi, loaiThoiGian: dashboardscontext.DashBoardLoaiThoiGian, namDanhGia: dashboardscontext.DashBoardNamDanhGia, includeChild: true }))
            let thoiGianQueryFrom ;
            let thoiGianQueryTo ;
            if(dashboardscontext.DashBoardKyDanhGia == "6 tháng đầu năm")
                {
                    thoiGianQueryFrom =lastYear.toString()+"0001";
                    thoiGianQueryTo = dashboardscontext.DashBoardNamDanhGia?.toString()+"003";
                }
                if(dashboardscontext.DashBoardKyDanhGia == "6 tháng cuối năm")
                {
                    thoiGianQueryFrom =lastYear.toString()+"0002";
                    thoiGianQueryTo = dashboardscontext.DashBoardNamDanhGia?.toString()+"0002";
                }
                if(thoiGianQueryFrom != undefined && thoiGianQueryTo != undefined)
                    dispatch(GetTKDonViNotChild({ groupCode: dashboardscontext.DashBoardMaDonVi, loaiThoiGian: dashboardscontext.DashBoardLoaiThoiGian, thoiGianQueryFrom: parseInt(thoiGianQueryFrom,10), thoiGianQueryTo: parseInt(thoiGianQueryTo,10) }))
        }
        if (dashboardscontext.DashBoardLoaiThoiGian == "Tháng") {
            dispatch(GetTKDonVi({ groupCode: dashboardscontext.DashBoardMaDonVi, loaiThoiGian: dashboardscontext.DashBoardLoaiThoiGian, kyDanhGia: dashboardscontext.DashBoardKyDanhGia, namDanhGia: dashboardscontext.DashBoardNamDanhGia, includeChild: true }))
            const monthNumber = dashboardscontext.DashBoardKyDanhGia?.replace(/\D+/g, ''); // Loại bỏ tất cả các ký tự không phải số
            const yearMonth = Number(`${dashboardscontext.DashBoardNamDanhGia}${monthNumber?.toString().padStart(2, '0')}`);
            const lastYearMonth = Number(`${lastYear}${monthNumber?.toString().padStart(2, '0')}`);
            dispatch(GetTKDonViNotChild({ groupCode: dashboardscontext.DashBoardMaDonVi, loaiThoiGian: "Tháng", thoiGianQueryFrom: lastYearMonth, thoiGianQueryTo: yearMonth }))
        }
       
        // toast(JSON.stringify(dashboardscontext))
        // console.log(JSON.stringify(dashboardscontext))
    }, [dashboardscontext])

    return (
        <>
          {/* <Sider>         
            <div className="demo-logo">
          <img
            src={logoQuanTri?.content}
            alt="Hành chính công"
            className="img-fluid"
          />
        </div> 
        </Sider> */}
         <Layout className="main-layout"> 
        <Header className={`layout-header-sticky`}>
          <AntdMenu
            theme="dark"
            style={{ width: "100%" }}
            mode="horizontal"
            selectedKeys={[location.pathname + location.search]}
            generateMenu={{
              model: navigationMenu,
              label: "tenMenu",
              value: "fullPath",
              useValueAsLink: true,
            }}
          />
          <AntdSpace>
            <Link to='/admin/quan-tri-tai-lieu/tai-lieu-hdsd-view'>
              <SolutionOutlined style={{ fontSize: '20px', cursor: 'pointer' }} className="link-icon-header" />
            </Link>
          </AntdSpace>
          <AntdSpace style={{ marginRight: "30px", marginLeft: '30px' }} >
            <SearchOutlined  style={{ fontSize: '20px', cursor: 'pointer' }} className="link-icon-header" />
          </AntdSpace>
          <AntdSpace size="large">
            {BadgeBell}
            <DropDownUser />
          </AntdSpace>
        </Header> 
        <AntdSpace direction="vertical" style={{ width: "100%" }}>
            <Row style={{ marginBottom: '5px', backgroundColor: "#fff" }}>
                    <Col span={24}>
                        <MenuChuyentrang></MenuChuyentrang>
                    </Col>
                </Row>
            </AntdSpace>
        </Layout>
        </>

    )
}
const DashBoardWrapper = () => (
    <MainContextProvider>
    <DashBoardProvider>
        <DoanhBoardView />
    </DashBoardProvider>
    </MainContextProvider>
)
export default DashBoardWrapper