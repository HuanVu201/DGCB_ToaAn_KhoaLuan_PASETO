import { AntdModal, AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { Button, Spin } from "antd";
import { CaretDownOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form } from "antd"
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { danhMuc_PhieuDanhGiaApi } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/services";
import { toast } from "react-toastify";
import { buocXuLyApi } from "@/features/buocxuly/services";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { userService } from "@/features/user/services";
import { IBuocHienTaiRes, IDanhGia, IDanhGiaColumn } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { useTaoDanhGiaDonViPhongBanContext } from "../../../contexts/useTaoDanhGiaDonViPhongBanContext";
import { IPhuLucItem } from "@/features/DanhGiaCanBo/components/TuChamDiem/ToanBo/components/TuChamDiemDetailModal/DanhGiaDetailModal";
import PhuLucDanhGiaDonViPhongBanComponent from "./PhuLucDanhGiaDonViPBComponent";
import HeaderDanhGiaDonViPhongBanDetailModal from "./HeaderDanhGiaDonViPBDetailModal";
import { useAppSelector } from "@/lib/redux/Hooks";

const DanhGiaDonViPhongBanDetailModalVisible = () => {
    const danhGiaContext = useTaoDanhGiaDonViPhongBanContext()
    const { parseToken } = useAppSelector(state => state.auth)
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<IDanhGia>()
    const [currNode, setCurrNode] = useState<IBuocHienTaiRes>(); // Chỉ lấy ra được bước đầu tiên cho tạo phiếu
    const [activeTab, setActiveTab] = useState<string>();
    const [totalNormalPoints, setTotalNormalPoints] = useState<number>(0)
    const [totalBonusPoints, setTotalBonusPoints] = useState<number>(0)
    const [totalPenaltyPoints, setTotalPenaltyPoints] = useState<number>(0)
    const diemDanhGiaTotal = useRef(0);

    diemDanhGiaTotal.current = danhGiaContext.phuLucDatas?.filter((x: any) => x.hasDiemLiet == false)?.reduce((sum, item: any) => sum + (item.totalPoint || 0), 0) || 0;

    useEffect(() => {
        (async () => {
            if (!currNode && buttonActionContext.danhGiaDonViPhongBanModalVisible) {
                try {
                    const resBuocXuLy = await buocXuLyApi.GetBuocHienTai({ loaiBuoc: "START", laQuyTrinhDonVi: true })
                    if (!resBuocXuLy.data.succeeded) {
                        toast.error(resBuocXuLy.data.message)
                        handlerCancel()
                    }
                    else {
                        if (resBuocXuLy.data.data) {
                            setCurrNode(resBuocXuLy.data.data)
                        } else toast.error("Không có thông tin bước đánh giá")
                    }
                } catch {
                    toast.error("Không có thông tin bước đánh giá")
                }
            }
        })()
    }, [buttonActionContext.danhGiaDonViPhongBanModalVisible])

    useEffect(() => {
        (async () => {
            if (!danhGiaContext.userDanhGia && buttonActionContext.danhGiaDonViPhongBanModalVisible && currNode) {
                const resUserDanhGia = await danhGiaCanBoServiceApi.GetCurrentUserDanhGia()
                if (resUserDanhGia.data.data) {
                    if (resUserDanhGia.data.data.khongDanhGia) {
                        toast.error("Tài khoản này không được đánh giá")
                        handlerCancel()
                        return
                    }
                    danhGiaContext.setUserDanhGia(resUserDanhGia.data.data)
                } else {
                    toast.error(resUserDanhGia.data.message)
                }

            }
        })()
    }, [danhGiaContext.userDanhGia, buttonActionContext.danhGiaDonViPhongBanModalVisible, currNode])

    useEffect(() => {
        (async () => {
            if (danhGiaContext.userDanhGia && !danhGiaContext.nextNode && buttonActionContext.danhGiaDonViPhongBanModalVisible && currNode) {
                const resUserXuLyTiep: any = await userService.SearchDanhSachNguoiXuLyTiep({
                    sourceId: currNode?.id,
                    groupCode: danhGiaContext.userDanhGia.maPhongBan,
                    officeCode: danhGiaContext.userDanhGia.maDonVi,
                    quyTrinhXuLyId: currNode.quyTrinhXuLyId as any,
                    laQuyTrinhDonVi: true

                })
                if (resUserXuLyTiep.data.data) {
                    danhGiaContext.setNextNode(resUserXuLyTiep.data.data)
                } else {
                    toast.error(resUserXuLyTiep.data.message)
                    handlerCancel()
                }
            }
        })()
    }, [danhGiaContext.userDanhGia, buttonActionContext.danhGiaDonViPhongBanModalVisible, currNode])

    useEffect(() => {
        if (buttonActionContext.danhGiaId)
            return

        if (diemDanhGiaTotal.current) {
            let result: string = ''
            danhGiaContext.phanLoaiDanhGiaArr?.map(item => {
                if (diemDanhGiaTotal.current >= Number(item.DiemToiThieu) && diemDanhGiaTotal.current <= Number(item.DiemToiDa)) {
                    result = item.Ten
                    console.log(result, item.DiemToiThieu, item.DiemToiDa)
                }
            })
            if (result)
                form.setFieldValue('phanLoaiTuDanhGia', result)
        } else {
            form.setFieldValue('phanLoaiTuDanhGia', undefined)
        }
    }, [diemDanhGiaTotal.current])

    useEffect(() => {
        (async () => {
            if (danhGiaContext.boTieuChuans && danhGiaContext.boTieuChuans.length > 0 && !buttonActionContext.danhGiaId)
                danhGiaContext.setBoTieuChuanId(danhGiaContext.boTieuChuans[0].maBoTieuChi)
        })()
    }, [danhGiaContext.boTieuChuans])


    useEffect(() => { // Tạo mới phiếu đánh giá
        (async () => {
            if (danhGiaContext.boTieuChuanId && currNode && !buttonActionContext.danhGiaId && danhGiaContext.userDanhGia) {
                buttonActionContext.setLoading(true)
                try {
                    const res = await danhMuc_PhieuDanhGiaApi.SearchMauPhieusByUserAndBoTieuChuan({
                        maBoTieuChuan: danhGiaContext.boTieuChuanId,
                        pageSize: 100,
                        pageNumber: 1
                    })
                    
                    if (res.data.data) {
                        const phuLucArr: IPhuLucItem[] = []
                        res.data.data.data.map(item => {
                            phuLucArr.push({
                                label: item.ten,
                                key: item.ma,
                                content: JSON.parse(item.jsonDanhGia as any),
                                scorePoint: !danhGiaContext.userDanhGia?.kiemNhiem
                                    ? `${item.diemDatYeuCau ?? 0}#${item.diemThuong ?? 0}#${item.diemTru ?? 0}`
                                    : GetScorePointKiemNhiem(JSON.parse(item.jsonDanhGia as any), item.diemDatYeuCau ?? 0, item.diemThuong ?? 0, item.diemTru ?? 0),
                            } as any)

                        })
                        if (JSON.parse(res.data.data.data[0].danhSachPhanLoaiDanhGia)) {
                            danhGiaContext.setPhanLoaiDanhGiaArr(JSON.parse(res.data.data.data[0].danhSachPhanLoaiDanhGia) as any)
                        }

                        setActiveTab(phuLucArr[0].key)
                        danhGiaContext.setPhuLucDatas(phuLucArr as any)
                    } else {
                        toast.error(res.data.message)
                        // form.setFieldValue('boTieuChuan', undefined)
                        // danhGiaContext.setBoTieuChuans(undefined)
                        danhGiaContext.setPhuLucDatas(undefined)
                    }
                } catch (error) {
                    toast.error("Có lỗi trong quá trình lấy thông tin mẫu phiếu theo bộ tiêu chuẩn")
                    // form.setFieldValue('boTieuChuan', undefined)
                    danhGiaContext.setPhuLucDatas(undefined)
                    // danhGiaContext.setBoTieuChuans(undefined)
                }

                buttonActionContext.setLoading(false)
            }
        })()
    }, [danhGiaContext.boTieuChuanId, currNode, danhGiaContext.userDanhGia])

    const GetScorePointKiemNhiem = (dataGet: any, diemDatOrigin: number, diemThuongOrigin: number, diemTruOrigin: number) => {


        let diemThuongKiemNhiemTotal: number = 0
        let diemTruKiemNhiemTotal: number = 0
        let diemDatYeuCauKiemNhiemTotal: number = 0
        MapCheckPointKiemNhiem(dataGet.DanhSachTieuChiCon as any)
        function MapCheckPointKiemNhiem(data: IDanhGiaColumn[]) {
            data.forEach(item => {
                if (item.KiemNhiem) {
                    if (item.DiemThuong && !(item.DiemTru || item.DiemDatYeuCau || item.DiemLiet))
                        diemThuongKiemNhiemTotal += Number(item.ThangDiem || 0)
                    if (item.DiemTru && !(item.DiemThuong || item.DiemDatYeuCau || item.DiemLiet))
                        diemTruKiemNhiemTotal += Number(item.ThangDiem || 0)
                    if (item.DiemDatYeuCau && !(item.DiemTru || item.DiemThuong || item.DiemLiet))
                        diemDatYeuCauKiemNhiemTotal += Number(item.ThangDiem || 0)
                }
                if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0) {
                    MapCheckPointKiemNhiem(item.DanhSachTieuChiCon)
                }
            })
        }

        return `${Number(diemDatOrigin) + Number(diemDatYeuCauKiemNhiemTotal)}#${Number(diemThuongOrigin) + Number(diemThuongKiemNhiemTotal)}#${Number(diemTruOrigin) + Number(diemTruKiemNhiemTotal)}`
    }

    useEffect(() => {
        if (danhGiaContext.phuLucDatas) {


            // danhGiaContext.setPhuLucDatas(phuLucArr as any)
        }
    }, [danhGiaContext.kiemNhiem])


    const handlerCancel = () => {
        setActiveTab(undefined)
        buttonActionContext.setDanhGiaDonViPhongBanModalVisible(false)
        danhGiaContext.setBoTieuChuanId(undefined)
        danhGiaContext.setBoTieuChuans(undefined)
        buttonActionContext.setDanhGiaId(undefined)
        danhGiaContext.setDiemLietArr(undefined)
        danhGiaContext.setOpposeArr(undefined)
        danhGiaContext.setPhuLucDatas(undefined)
        danhGiaContext.setKiemNhiem(false)
        danhGiaContext.setUserDanhGia(undefined)
        danhGiaContext.setNextNode(undefined)
        danhGiaContext.setDisableDanhGia(false)
        form.resetFields()
    }


    const updatePoint = useCallback((totalPoint: number, normalPoint: number, bonusPoint: number, penaltyPoint: number, hasDiemLiet: boolean) => {

        danhGiaContext.setPhuLucDatas((prevData: any) => {
            if (!prevData) return prevData;
            const data = prevData.map((item: IPhuLucItem) =>
                item.key === activeTab ? {
                    ...item,
                    totalPoint: totalPoint,
                    normalPoint: normalPoint,
                    bonusPoint: bonusPoint,
                    penaltyPoint: penaltyPoint,
                    hasDiemLiet: hasDiemLiet
                } : item
            );

            data?.map((item: IPhuLucItem) => {
                if (item.key == activeTab) {
                    setTotalNormalPoints(item.normalPoint || 0)
                    setTotalBonusPoints(item.bonusPoint || 0)
                    setTotalPenaltyPoints(item.penaltyPoint || 0)
                }
            })

            return data
        })

    }, [activeTab, danhGiaContext.setPhuLucDatas]);

    const updatePhuLucData = useCallback((key: string, data: IDanhGiaColumn) => {
        danhGiaContext.setPhuLucDatas((prevData: any) => {
            if (!prevData) return prevData;
            return prevData.map((item: IPhuLucItem) =>
                item.key === key ? { ...item, content: data } : item
            )
        })
    }, [activeTab, danhGiaContext.setPhuLucDatas])

    const PhuLucTab: IAntdTabsProps["items"] = danhGiaContext.phuLucDatas?.map((item: IPhuLucItem) => {
        return ({
            label: <p>{item.label} {item.totalPoint ? `(${item.totalPoint})` : null}</p>,
            key: item.key,
            children: (
                <div style={{ display: activeTab === item.key ? 'block' : 'none' }}>
                    <PhuLucDanhGiaDonViPhongBanComponent
                        dataRoot={item.content}
                        scorePoint={item.scorePoint}
                        updateData={(newData: IDanhGiaColumn) => updatePhuLucData(item.key, newData)}
                        updatePoint={updatePoint}
                    />
                </div>
            ),
        })

    }
    ) || [];

    const handleTabChange = (key: string) => {
        setActiveTab(key)
    }
    useEffect(() => {
        if (activeTab) {
            danhGiaContext.phuLucDatas?.map((item: IPhuLucItem) => {
                if (item.key == activeTab) {
                    setTotalNormalPoints(Number(item.normalPoint || 0))
                    setTotalBonusPoints(Number(item.bonusPoint || 0))
                    setTotalPenaltyPoints(Number(item.penaltyPoint || 0))
                }
            })
        }
    }, [activeTab])


    return <AntdModal className="chamDiemModal" okText="Tải phiếu" visible={buttonActionContext.danhGiaDonViPhongBanModalVisible} title={`Thêm mới đánh giá cơ quan, tổ chức, đơn vị: ${parseToken?.tenDonVi}`} fullsizeScrollable handlerCancel={handlerCancel}
        footer={[
            <>
                <div className="infoChamDiem">
                    {totalNormalPoints || totalBonusPoints || totalPenaltyPoints
                        ?
                        <span>Tổng điểm chấm: Điểm đạt yêu cầu (<b>{totalNormalPoints}</b>) -
                            <span className="diemThuongRow"> Tổng điểm thưởng (<b>{totalBonusPoints}</b>) </span> -
                            <span className="diemTruRow"> Tổng điểm trừ (<b>{Math.abs(totalPenaltyPoints)}</b>) </span>
                        </span>
                        : null
                    }
                </div>
            </>,
            <div style={{ display: 'flex', gap: 10 }}>
                <Button
                    type="primary"
                    onClick={() => danhGiaContext.setSaoChepDiemHandler(true)}
                    disabled={buttonActionContext.loading}
                    loading={buttonActionContext.loading}
                >
                    Sao chép điểm
                </Button>
                <Button
                    type="primary"
                    onClick={() => danhGiaContext.handlerSaveDanhGia(form, currNode as any, handlerCancel)}
                    disabled={buttonActionContext.loading}
                    loading={buttonActionContext.loading}
                    style={{ backgroundColor: '#5867dd' }}
                >
                    Lưu lại
                </Button>
                <Button
                    type="primary"
                    onClick={() => danhGiaContext.handlerSaveAndSendDanhGia(form, currNode as any, handlerCancel)}
                    disabled={buttonActionContext.loading}
                    loading={buttonActionContext.loading}
                    style={{ backgroundColor: '#34bfa3' }}
                >
                    Lưu và gửi
                </Button>
                <Button key="back" onClick={handlerCancel} loading={buttonActionContext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
                    Đóng
                </Button>
            </div>


        ]}
    >
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <HeaderDanhGiaDonViPhongBanDetailModal form={form} diemDanhGiaTotal={diemDanhGiaTotal.current} currNode={currNode} />

            <AntdTab
                className="mauPhieuDanhGia"
                size="small"
                style={{ margin: '10px auto' }}
                type="card"
                items={PhuLucTab}
                moreIcon={<CaretDownOutlined />}
                onChange={handleTabChange}
                activeKey={activeTab}
            // forceRender={true}
            />
        </Spin>
    </AntdModal>
}
const DanhGiaDonViPhongBanDetailModal = () => (
    <DanhGiaDonViPhongBanDetailModalVisible />
);


export default DanhGiaDonViPhongBanDetailModal