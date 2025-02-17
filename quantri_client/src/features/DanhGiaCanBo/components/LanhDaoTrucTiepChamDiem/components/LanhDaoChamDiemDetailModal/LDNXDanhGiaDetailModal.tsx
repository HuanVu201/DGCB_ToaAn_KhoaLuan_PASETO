import { AntdModal, AntdTab, IAntdTabsProps } from "@/lib/antd/components";
import { Button, Spin } from "antd";
import { CaretDownOutlined, LoadingOutlined } from "@ant-design/icons";
import { Form } from "antd"

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { danhMuc_PhieuDanhGiaApi } from "@/features/danhmuc_dgcb/danhmuc_phieudanhgia/services";
import { toast } from "react-toastify";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { IDanhGiaCanBo } from "@/features/DanhGiaCanBo/components/common/models";
import { userService } from "@/features/user/services";
import { IBuocHienTaiRes, IDanhGia, IDanhGiaColumn, ILichSuDanhGia, ILichSuDanhGiaSwapper } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { useLanhDaoTrucTiepChamDiemContext } from "../../contexts/useLDNXChamDiemContext";
import { IPhuLucItem } from "../../../TuChamDiem/ToanBo/components/TuChamDiemDetailModal/DanhGiaDetailModal";
import PhuLucComponentLanhDaoTrucTiepChamDiem from "./LDNXPhuLucComponent";
import HeaederLanhDaoTrucTiepChamDiemDetailModal from "./LDNXHeaderDanhGiaDetailModal";
import '../../../common/PhieuChamDiem.scss'
import { useAppSelector } from "@/lib/redux/Hooks";
import LichSuDanhGiaModal from "../../../common/components/LichSuDanhGia/LichSuDanhGiaModal";


const LanhDaoTrucTiepChamDiemDetailModalVisible = () => {
    const { parseToken } = useAppSelector((state) => state.auth);
    const danhGiaContext = useLanhDaoTrucTiepChamDiemContext()
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<IDanhGia>()
    const [activeTab, setActiveTab] = useState<string>();
    const [totalNormalPoints, setTotalNormalPoints] = useState<number>(0)
    const [totalBonusPoints, setTotalBonusPoints] = useState<number>(0)
    const [totalPenaltyPoints, setTotalPenaltyPoints] = useState<number>(0)
    const diemDanhGiaTotal = useRef(0);

    diemDanhGiaTotal.current = danhGiaContext.phuLucDatas?.filter((x: any) => x.hasDiemLiet == false)?.reduce((sum, item: any) => sum + (item.totalPoint || 0), 0) || 0;

    useEffect(() => {
        (async () => {
            if (!danhGiaContext.userDanhGia && buttonActionContext.lanhDaoTrucTiepChamDiemModalVisible && buttonActionContext.danhGiaId) {
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
    }, [danhGiaContext.userDanhGia, buttonActionContext.lanhDaoTrucTiepChamDiemModalVisible])

    useEffect(() => { // Kiểm tra xem đánh giá đã được gửi tới người tiếp theo hay chưa
        if (danhGiaContext.userDanhGia && danhGiaContext.thongTinPhieuChamDiem) {
            if (danhGiaContext.userDanhGia.maNguoiDung?.toLowerCase() != danhGiaContext.thongTinPhieuChamDiem.nguoiDangXuLyId?.toLowerCase()) {
                danhGiaContext.setDisableDanhGia(true)
                handlerCancel()
                toast.warning("Không có quyền xử lý tại bước này")
            }
        }

    }, [danhGiaContext.userDanhGia, danhGiaContext.thongTinPhieuChamDiem])

    useEffect(() => {
        (async () => {
            if (danhGiaContext.userDanhGia && !danhGiaContext.nextNode && buttonActionContext.lanhDaoTrucTiepChamDiemModalVisible && !danhGiaContext.disableDanhGia) {
                const resUserXuLyTiep: any = await userService.SearchDanhSachNguoiXuLyTiep({
                    sourceId: danhGiaContext.thongTinPhieuChamDiem?.buocHienTaiId,
                    groupCode: danhGiaContext.userDanhGia.maPhongBan,
                    officeCode: danhGiaContext.userDanhGia.maDonVi,
                    quyTrinhXuLyId: danhGiaContext.thongTinPhieuChamDiem?.quyTrinhXuLyId as any
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
            if (buttonActionContext.danhGiaId && buttonActionContext.lanhDaoTrucTiepChamDiemModalVisible) {
                buttonActionContext.setLoading(true)
                const resGetPhieuDanhGia = await danhGiaCanBoServiceApi.GetPhieuDanhGia({ _id: buttonActionContext.danhGiaId, daXem: 1 })
                if (resGetPhieuDanhGia.data.data) {
                    const data: IDanhGiaCanBo = resGetPhieuDanhGia.data.data
                    danhGiaContext.setThongTinPhieuChamDiem(data)

                    danhGiaContext.setPhanLoaiDanhGiaArr(JSON.parse(data.danhSachPhanLoaiDanhGia || ''))

                    if (data.mauPhieus) {
                        const phuLucArr: IPhuLucItem[] = []
                        data.mauPhieus.map((ele: IDanhGiaCanBo) => {
                            const item: IDanhGiaColumn = JSON.parse(ele.dataNhanXet || ele.dataTuDanhGia as any)
                            const point = ele.chiTietDiemNhanXet ? ele.chiTietDiemNhanXet?.split('#')
                                : ele.chiTietDiemTuDanhGia ? ele.chiTietDiemTuDanhGia?.split('#') : [0, 0, 0]

                            phuLucArr.push({
                                label: ele.tenMauPhieu,
                                key: ele.id,
                                totalPoint: Number(ele.diemNhanXet ?? ele.diemTuDanhGia ?? 0),
                                normalPoint: Number(point ? point[0] : 0),
                                bonusPoint: Number(point ? point[1] : 0),
                                penaltyPoint: Number(point ? point[2] : 0),
                                content: item,
                                scorePoint: ele.scorePoint,
                                hasDiemLiet: ele.hasDiemLietNhanXet
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


    useEffect(() => {
        if (danhGiaContext.phuLucDatas && danhGiaContext.phuLucDatas.length > 0) {
            const lichSuGiaiTrinhArr: ILichSuDanhGiaSwapper[] = []
            danhGiaContext.phuLucDatas.forEach((item: IPhuLucItem) => {

                if (item.content.DanhSachTieuChiCon)
                    traverseNodes(item.content.DanhSachTieuChiCon)

                function traverseNodes(nodes: IDanhGiaColumn[]) {
                    nodes.forEach((node) => {
                        if (node.NoiDungGiaiTrinh || node.NoiDungGiaiTrinhNX || node.NoiDungGiaiTrinhTM || node.NoiDungGiaiTrinhDG) {
                            const newLichSu: ILichSuDanhGia[] = []
                            if (node.NoiDungGiaiTrinh) {
                                newLichSu.push({
                                    id: 'Người tự chấm điểm',
                                    type: 'Người tự chấm điểm',
                                    fullName: danhGiaContext.thongTinPhieuChamDiem?.nguoiTuDanhGia,
                                    noiDungGiaiTrinh: node.NoiDungGiaiTrinh,
                                    dinhKem: node.DinhKem
                                })
                            }
                            if (node.NoiDungGiaiTrinhNX) {
                                newLichSu.push({
                                    id: 'Lãnh đạo trực tiếp chấm điểm',
                                    type: 'Lãnh đạo trực tiếp chấm điểm',
                                    fullName: danhGiaContext.thongTinPhieuChamDiem?.nguoiNhanXet || parseToken?.fullName,
                                    noiDungGiaiTrinh: node.NoiDungGiaiTrinhNX,
                                    dinhKem: node.DinhKemNX
                                })
                            }
                            if (node.NoiDungGiaiTrinhTM) {
                                newLichSu.push({
                                    id: 'Phó thủ trưởng cơ quan, đơn vị',
                                    type: 'Phó thủ trưởng cơ quan, đơn vị',
                                    fullName: danhGiaContext.thongTinPhieuChamDiem?.nguoiThamMuu,
                                    noiDungGiaiTrinh: node.NoiDungGiaiTrinhTM,
                                    dinhKem: node.DinhKemTM
                                })
                            }
                            if (node.NoiDungGiaiTrinhDG) {
                                newLichSu.push({
                                    id: 'Thủ trưởng cơ quan, đơn vị',
                                    type: 'Thủ trưởng cơ quan, đơn vị',
                                    fullName: danhGiaContext.thongTinPhieuChamDiem?.nguoiDanhGia,
                                    noiDungGiaiTrinh: node.NoiDungGiaiTrinhDG,
                                    dinhKem: node.DinhKemDG
                                })
                            }

                            if (newLichSu && newLichSu.length > 0) {
                                lichSuGiaiTrinhArr.push({
                                    tieuChiId: node.MaTieuChi,
                                    datas: newLichSu
                                })
                            }

                        }
                        if (node.DanhSachTieuChiCon && node.DanhSachTieuChiCon.length > 0) {
                            traverseNodes(node.DanhSachTieuChiCon);
                        }
                    })
                }
            })
            if (lichSuGiaiTrinhArr && lichSuGiaiTrinhArr.length > 0) {
                buttonActionContext.setLichSuDanhGias(lichSuGiaiTrinhArr)
            }
        }
    }, [danhGiaContext.phuLucDatas])


    const handlerCancel = () => {
        setActiveTab(undefined)
        buttonActionContext.setLanhDaoTrucTiepChamDiemModalVisible(false)
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

    // useEffect(() => {
    //     if (buttonActionContext.danhGiaId || !diemDanhGiaTotal.current)
    //         return

    //     let result: string | undefined = buttonActionContext.PhanLoaiChamDiemHandler(danhGiaContext.phuLucDatas as any, diemDanhGiaTotal.current)
    //     if (result)
    //         form.setFieldValue('phanLoaiNhanXet', result)
    //     else
    //         form.setFieldValue('phanLoaiNhanXet', undefined)

    // }, [diemDanhGiaTotal.current])

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
    }, [activeTab, danhGiaContext.setPhuLucDatas]);

    const updatePhuLucData = useCallback((key: string, data: IDanhGiaColumn) => {
        danhGiaContext.setPhuLucDatas((prevData: any) => {
            if (!prevData) return prevData;
            return prevData.map((item: IPhuLucItem) =>
                item.key === key ? { ...item, content: data } : item
            );
        });
    }, [activeTab, danhGiaContext.setPhuLucDatas]);

    const PhuLucTab: IAntdTabsProps["items"] = danhGiaContext.phuLucDatas?.map((item: IPhuLucItem) => {
        return ({
            label: <p>{item.label} {item.totalPoint ? `(${item.totalPoint})` : null}</p>,
            key: item.key,
            children: (
                <div style={{ display: activeTab === item.key ? 'block' : 'none' }}>
                    <PhuLucComponentLanhDaoTrucTiepChamDiem
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

    return <AntdModal className="chamDiemModal" visible={buttonActionContext.lanhDaoTrucTiepChamDiemModalVisible} title={"Thông tin chấm điểm, xếp loại"} fullsizeScrollable handlerCancel={handlerCancel}
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
                    Lưu chấm điểm
                </Button>
                <Button
                    type="primary"
                    onClick={() => danhGiaContext.handlerSaveAndSendDanhGia(form, handlerCancel)}
                    disabled={buttonActionContext.loading}
                    loading={buttonActionContext.loading}
                    style={{ backgroundColor: '#34bfa3' }}
                >
                    Chấm điểm
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
            <HeaederLanhDaoTrucTiepChamDiemDetailModal form={form} diemDanhGiaTotal={diemDanhGiaTotal.current} />

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
            <LichSuDanhGiaModal />

        </Spin>
    </AntdModal>
}
const LanhDaoTrucTiepChamDiemDetailModal = () => (
    <LanhDaoTrucTiepChamDiemDetailModalVisible />
);


export default LanhDaoTrucTiepChamDiemDetailModal