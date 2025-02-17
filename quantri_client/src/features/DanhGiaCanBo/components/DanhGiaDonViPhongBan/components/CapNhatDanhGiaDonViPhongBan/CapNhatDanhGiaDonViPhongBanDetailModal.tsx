import { AntdModal, AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { Button, Spin } from "antd";
import { CaretDownOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form } from "antd"
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { IDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { userService } from "@/features/user/services";
import { IDanhGia, IDanhGiaColumn } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import '../../../common/PhieuChamDiem.scss'
import { CapNhatDanhGiaDonViPhongBanProvider, useCapNhatDanhGiaDonViPhongBanContext } from "../../contexts/useCapNhatDanhGiaDonViPhongBanContext";
import { IPhuLucItem } from "../../../TuChamDiem/ToanBo/components/TuChamDiemDetailModal/DanhGiaDetailModal";
import PhuLucCapNhatDanhGiaDonViPhongBanComponent from "./PhuLucCapNhatDanhGiaDonViPhongBanComponent";
import HeaderCapNhatDanhGiaDonViPhongBanDetailModal from "./HeaderCapNhatDanhGiaDonViPhongBanDetailModal";
import { danhGiaDonViServiceApi } from "../../services/DanhGiaDonViService";
import { useAppSelector } from "@/lib/redux/Hooks";

const CapNhatDanhGiaDonViPhongBanDetailModalVisible = () => {
    const danhGiaContext = useCapNhatDanhGiaDonViPhongBanContext()
    const { parseToken } = useAppSelector(state => state.auth)
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<IDanhGia>()
    const [activeTab, setActiveTab] = useState<string>();
    const [totalNormalPoints, setTotalNormalPoints] = useState<number>(0)
    const [totalBonusPoints, setTotalBonusPoints] = useState<number>(0)
    const [totalPenaltyPoints, setTotalPenaltyPoints] = useState<number>(0)
    const diemDanhGiaTotal = useRef(0);

    diemDanhGiaTotal.current = danhGiaContext.phuLucDatas ? danhGiaContext.phuLucDatas?.filter((x: any) => x.hasDiemLiet == false)?.reduce((sum, item: any) => sum + (item.totalPoint || 0), 0) || 0 : 0;

    useEffect(() => {
        (async () => {
            if (!danhGiaContext.userDanhGia && buttonActionContext.capNhatDanhGiaDonViPhongBanModalVisible && buttonActionContext.danhGiaId) {
                const resUserDanhGia = await danhGiaDonViServiceApi.GetCurrentUserDanhGia()
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
    }, [danhGiaContext.userDanhGia, buttonActionContext.capNhatDanhGiaDonViPhongBanModalVisible])

    useEffect(() => {
        (async () => {
            if (danhGiaContext.userDanhGia && !danhGiaContext.nextNode && buttonActionContext.capNhatDanhGiaDonViPhongBanModalVisible && !danhGiaContext.disableDanhGia) {
                const resUserXuLyTiep: any = await userService.SearchDanhSachNguoiXuLyTiep({
                    sourceId: danhGiaContext.thongTinPhieuChamDiem?.buocHienTaiId,
                    groupCode: danhGiaContext.userDanhGia.maPhongBan,
                    officeCode: danhGiaContext.userDanhGia.maDonVi,
                    quyTrinhXuLyId: danhGiaContext.thongTinPhieuChamDiem?.quyTrinhXuLyId as any,
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
    }, [danhGiaContext.thongTinPhieuChamDiem])



    useEffect(() => { // Chấm điểm, nhận xét
        (async () => {
            if (buttonActionContext.danhGiaId && buttonActionContext.capNhatDanhGiaDonViPhongBanModalVisible) {
                buttonActionContext.setLoading(true)

                const resGetPhieuDanhGia = await danhGiaDonViServiceApi.GetPhieuDanhGia({ _id: buttonActionContext.danhGiaId, daXem: 1 })
                if (resGetPhieuDanhGia.data.data) {
                    const data: IDanhGiaCanBo = resGetPhieuDanhGia.data.data
                    danhGiaContext.setThongTinPhieuChamDiem(data)

                    danhGiaContext.setPhanLoaiDanhGiaArr(JSON.parse(data.danhSachPhanLoaiDanhGia || ''))

                    if (data.mauPhieus) {
                        const phuLucArr: IPhuLucItem[] = []
                        const keyPhuLucArr: string[] = []
                        data.mauPhieus.map((ele: IDanhGiaCanBo) => {
                            const item: IDanhGiaColumn = JSON.parse(ele.dataTuDanhGia as any)
                            const point = ele.chiTietDiemTuDanhGia ? ele.chiTietDiemTuDanhGia?.split('#') : [0, 0, 0]
                            keyPhuLucArr.push(ele.id)
                            phuLucArr.push({
                                label: ele.tenMauPhieu,
                                key: ele.id,
                                totalPoint: Number(ele.diemTuDanhGia || 0),
                                normalPoint: Number(point ? point[0] : 0),
                                bonusPoint: Number(point ? point[1] : 0),
                                penaltyPoint: Number(point ? point[2] : 0),
                                content: item,
                                scorePoint: ele.scorePoint,
                                hasDiemLiet: ele.hasDiemLietTuDanhGia
                            } as any)
                        })

                        setActiveTab(phuLucArr[0].key)
                        danhGiaContext.setPhuLucDatas(phuLucArr as any)
                    }

                    form.setFieldsValue({
                        ...data as any,
                        phanLoaiNhanXet: data.phanLoaiDanhGia,
                        diemNhanXet: data.diemDanhGia

                    })

                } else {
                    toast.error(resGetPhieuDanhGia.data.message)
                }

                buttonActionContext.setLoading(false)
            }
        })()
    }, [buttonActionContext.danhGiaId])

    useEffect(() => { // Kiểm tra xem đánh giá đã được gửi tới người tiếp theo hay chưa
        if (danhGiaContext.userDanhGia && danhGiaContext.thongTinPhieuChamDiem) {
            if (danhGiaContext.userDanhGia.maNguoiDung?.toLowerCase() != danhGiaContext.thongTinPhieuChamDiem.nguoiDangXuLyId?.toLowerCase()) {
                danhGiaContext.setDisableDanhGia(true)
                handlerCancel()
                toast.warning("Không có quyền xử lý tại bước này")
            }
        }

    }, [danhGiaContext.userDanhGia, danhGiaContext.thongTinPhieuChamDiem])


    const handlerCancel = () => {
        setActiveTab(undefined)
        buttonActionContext.setCapNhatDanhGiaDonViPhongBanModalVisible(false)
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

    useEffect(() => {
        if (diemDanhGiaTotal.current) {
            let result: string = ''
            danhGiaContext.phanLoaiDanhGiaArr?.map(item => {
                if (diemDanhGiaTotal.current >= Number(item.DiemToiThieu) && diemDanhGiaTotal.current <= Number(item.DiemToiDa)) {
                    result = item.Ten
                    console.log(result, item.DiemToiThieu, item.DiemToiDa)
                }
            })
            if (result)
                form.setFieldValue('phanLoaiNhanXet', result)
        } else {
            form.setFieldValue('phanLoaiNhanXet', undefined)
        }
    }, [diemDanhGiaTotal.current])


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
        });
    }, [activeTab, danhGiaContext.phuLucDatas]);

    const updatePhuLucData = useCallback((key: string, data: IDanhGiaColumn) => {
        danhGiaContext.setPhuLucDatas((prevData: any) => {
            if (!prevData) return prevData;
            return prevData.map((item: IPhuLucItem) =>
                item.key === key ? { ...item, content: data } : item
            );
        });
    }, [activeTab, danhGiaContext.phuLucDatas]);

    const PhuLucTab: IAntdTabsProps["items"] = danhGiaContext.phuLucDatas && danhGiaContext.phuLucDatas?.length > 0 ?
        danhGiaContext.phuLucDatas?.map((item: IPhuLucItem) => {

            return ({
                label: <p>{item.label} {item.totalPoint ? `(${item.totalPoint})` : null}</p>,
                key: item.key,
                children: (
                    <div style={{ display: activeTab === item.key ? 'block' : 'none' }}>
                        <PhuLucCapNhatDanhGiaDonViPhongBanComponent
                            dataRoot={item.content}
                            scorePoint={item.scorePoint}
                            updateData={(newData: IDanhGiaColumn) => updatePhuLucData(item.key, newData)}
                            updatePoint={updatePoint}
                        />
                    </div>
                ),
                // forceRender: true
            })

        }
        ) : [];

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



    return <AntdModal className="chamDiemModal" visible={buttonActionContext.capNhatDanhGiaDonViPhongBanModalVisible} title={`Cập nhật đánh giá cơ quan, tổ chức, đơn vị: ${parseToken?.tenDonVi}`} fullsizeScrollable handlerCancel={handlerCancel}
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
                    onClick={() => danhGiaContext.handlerSaveDanhGia(form, handlerCancel)}
                    disabled={buttonActionContext.loading}
                    loading={buttonActionContext.loading}
                    style={{ backgroundColor: '#5867dd' }}
                >
                    Lưu lại
                </Button>
                <Button
                    type="primary"
                    onClick={() => danhGiaContext.handlerSaveAndSendDanhGia(form, handlerCancel)}
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
            <HeaderCapNhatDanhGiaDonViPhongBanDetailModal form={form} diemDanhGiaTotal={diemDanhGiaTotal.current} />

            <AntdTab
                className="mauPhieuDanhGia"
                size="small"
                style={{ margin: '10px auto' }}
                type="card"
                items={PhuLucTab}
                moreIcon={<CaretDownOutlined />}
                onChange={handleTabChange}
                activeKey={activeTab}
            />
        </Spin>
    </AntdModal>
}
const CapNhatDanhGiaDonViPhongBanDetailModal = () => (
    <CapNhatDanhGiaDonViPhongBanProvider>
        <CapNhatDanhGiaDonViPhongBanDetailModalVisible />
    </CapNhatDanhGiaDonViPhongBanProvider>
);


export default CapNhatDanhGiaDonViPhongBanDetailModal