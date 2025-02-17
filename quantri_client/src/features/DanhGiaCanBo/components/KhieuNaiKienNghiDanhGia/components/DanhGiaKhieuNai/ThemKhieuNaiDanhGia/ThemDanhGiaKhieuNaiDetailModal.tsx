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
import '../../../../common/PhieuChamDiem.scss'
import { IPhuLucItem } from "@/features/DanhGiaCanBo/components/TuChamDiem/ToanBo/components/TuChamDiemDetailModal/DanhGiaDetailModal";
import { useAppSelector } from "@/lib/redux/Hooks";
import LichSuDanhGiaModal from "@/features/DanhGiaCanBo/components/common/components/LichSuDanhGia/LichSuDanhGiaModal";
import { useKhieuNaiDanhGiaContext } from "../../../contexts/useKhieuNaiKienNghiContext";
import PhuLucThemDanhGiaKhieuNaiComponent from "./PhuLucThemDanhGiaKhieuNaiComponent";
import HeaderThemDanhGiaKhieuNaiDetailModal from "./HeaderThemDanhGiaKhieuNaiDetailModal";
import { KhieuNaiDanhGiaServiceApi } from "../../../services";



const ThemDanhGiaKhieuNaiDetailModalVisible = () => {
    const { parseToken } = useAppSelector((state) => state.auth);
    const danhGiaContext = useKhieuNaiDanhGiaContext()
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<IDanhGia>()
    const [activeTab, setActiveTab] = useState<string>();
    const [totalNormalPoints, setTotalNormalPoints] = useState<number>(0)
    const [totalBonusPoints, setTotalBonusPoints] = useState<number>(0)
    const [totalPenaltyPoints, setTotalPenaltyPoints] = useState<number>(0)


    useEffect(() => {
        (async () => {
            if (buttonActionContext.danhGiaId && buttonActionContext.themKhieuNaiDanhGiaModalVisible) {
                buttonActionContext.setLoading(true)

                const resGetPhieuDanhGia = await danhGiaCanBoServiceApi.GetPhieuDanhGia({ _id: buttonActionContext.danhGiaId, daXem: -1 })
                if (resGetPhieuDanhGia.data.data) {
                    const data: IDanhGiaCanBo = resGetPhieuDanhGia.data.data
                    danhGiaContext.setThongTinPhieuChamDiem(data)

                    danhGiaContext.setPhanLoaiDanhGiaArr(JSON.parse(data.danhSachPhanLoaiDanhGia || ''))

                    if (data.mauPhieus) {
                        const phuLucArr: IPhuLucItem[] = []

                        data.mauPhieus.map((ele: IDanhGiaCanBo) => {
                            const item: IDanhGiaColumn = JSON.parse(ele.dataXuLyKhieuNai || ele.dataKhieuNai || ele.dataLanhDaoDanhGia || ele.dataThamMuu || ele.dataNhanXet || ele.dataTuDanhGia as any)

                            const point = ele.chiTietDiemLanhDaoDanhGia ? ele.chiTietDiemLanhDaoDanhGia?.split('#')
                                : ele.chiTietDiemThamMuu ? ele.chiTietDiemThamMuu?.split('#')
                                    : ele.chiTietDiemNhanXet ? ele.chiTietDiemNhanXet?.split('#')
                                        : ele.chiTietDiemTuDanhGia ? ele.chiTietDiemTuDanhGia?.split('#') : [0, 0, 0]
                            phuLucArr.push({
                                label: ele.tenMauPhieu,
                                key: ele.id,
                                totalPoint: Number(ele.diemLanhDaoDanhGia ?? ele.diemThamMuu ?? ele.diemNhanXet ?? ele.diemTuDanhGia ?? 0),
                                normalPoint: Number(point ? point[0] : 0),
                                bonusPoint: Number(point ? point[1] : 0),
                                penaltyPoint: Number(point ? point[2] : 0),
                                content: item,
                                scorePoint: ele.scorePoint,
                                hasDiemLiet: ele.hasDiemLietLanhDaoDanhGia,
                                totalKhieuNai: ele.soLuongKhieuNai
                            } as any)
                        })
                        setActiveTab(phuLucArr[0].key)
                        danhGiaContext.setPhuLucDatas(phuLucArr as any)
                    }
                    form.setFieldsValue({
                        ...data as any,
                        phanLoaiLanhDaoDanhGia: data.phanLoaiDanhGia,
                        diemLanhDaoDanhGia: data.diemDanhGia
                    })
                } else {
                    toast.error(resGetPhieuDanhGia.data.message)
                }
                if (danhGiaContext.khieuNaiId) {
                    const resGetKhieuNai = await KhieuNaiDanhGiaServiceApi.Get(danhGiaContext.khieuNaiId)
                    if (resGetKhieuNai.data.data && resGetKhieuNai.data.data.maPhieu) {
                        form.setFieldsValue({
                            ...resGetKhieuNai.data.data as any,
                        })

                        buttonActionContext.setDanhGiaId(resGetKhieuNai.data.data.maPhieu)

                        if (resGetKhieuNai.data.data.ketQua) {
                            danhGiaContext.setHasKetQuaKhieuNai(true)
                        }
                    } else {
                        toast.error("Không có thông tin kiến nghị")
                    }
                }

                buttonActionContext.setLoading(false)
            }
        })()
    }, [buttonActionContext.danhGiaId, buttonActionContext.themKhieuNaiDanhGiaModalVisible])

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
                                    fullName: danhGiaContext.thongTinPhieuChamDiem?.nguoiNhanXet,
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
                                    fullName: danhGiaContext.thongTinPhieuChamDiem?.nguoiDanhGia || parseToken?.fullName,
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
        buttonActionContext.setThemKhieuNaiDanhGiaModalVisible(false)
        danhGiaContext.setDanhGiaModalVisible(false)
        danhGiaContext.setKhieuNaiId(undefined)
        buttonActionContext.setReadOnlyKhieuNaiModalVisible(false)
        danhGiaContext.setDanhGia(undefined)
        buttonActionContext.setDanhGiaId(undefined)
        danhGiaContext.setPhuLucDatas(undefined)
        danhGiaContext.setThongTinPhieuChamDiem(undefined)
        danhGiaContext.setTrangThaiKhieuNai(undefined)
        danhGiaContext.setHasKetQuaKhieuNai(false)
        buttonActionContext.setKhieuNaiId(undefined)
        buttonActionContext.setTrangThaiKhieuNai(undefined)
        form.resetFields()
    }

    const updateTotalKhieuNai = useCallback((totalKhieuNai: number) => {
        danhGiaContext.setPhuLucDatas((prevData: any) => {
            if (!prevData) return prevData;
            const data = prevData.map((item: IPhuLucItem) =>
                item.key === activeTab ? {
                    ...item,
                    totalKhieuNai: totalKhieuNai,
                } : item
            );
            return data
        })

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
            label: <p>{item.label} {item.totalPoint ? `(${item.totalPoint})` : null} {item.totalKhieuNai ? `(${item.totalKhieuNai} kiến nghị)` : null} </p>,
            key: item.key,
            children: (
                <div style={{ display: activeTab === item.key ? 'block' : 'none' }}>
                    <PhuLucThemDanhGiaKhieuNaiComponent
                        dataRoot={item.content}
                        scorePoint={item.scorePoint}
                        updateData={(newData: IDanhGiaColumn) => updatePhuLucData(item.key, newData)}
                        updateTotalKhieuNai={updateTotalKhieuNai}
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

    const onFinish = async () => {
        if (!danhGiaContext.thongTinPhieuChamDiem?.maPhieu) {
            toast.error("Không có thông tin đánh giá cần kiến nghị")
            return
        }

        const formData = await form.validateFields()
        // if (!formData.lyDo) {
        //     toast.error("Nhập nội dung kiến nghị")
        //     return
        // }

        // if (!formData.dinhKemKhieuNai) {
        //     toast.error("Đính kèm nội dung kiến nghị")
        //     return
        // }

        danhGiaContext.handlerSaveKhieuNai(formData as any, handlerCancel)
    }

    return <AntdModal className="chamDiemModal" visible={buttonActionContext.themKhieuNaiDanhGiaModalVisible && buttonActionContext.danhGiaId ? true : false} title={"Thông tin đánh giá chấm điểm"} fullsizeScrollable handlerCancel={handlerCancel}
        style={{ zIndex: 1000 }}
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
                    hidden={buttonActionContext.readOnlyKhieuNaiModalVisible}
                    type="primary"
                    onClick={() => onFinish()}
                    loading={danhGiaContext.loading}
                >
                    Xác nhận
                </Button>
                <Button
                    onClick={handlerCancel}
                    disabled={buttonActionContext.loading}
                    loading={buttonActionContext.loading}
                    style={{ backgroundColor: '#f4516c', color: '#fff' }}
                >
                    Hủy
                </Button>
            </div>


        ]}
    >
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <HeaderThemDanhGiaKhieuNaiDetailModal form={form} />

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
        <LichSuDanhGiaModal />

    </AntdModal>
}
const ThemDanhGiaKhieuNaiDetailModal = () => (
    <ThemDanhGiaKhieuNaiDetailModalVisible />
);


export default ThemDanhGiaKhieuNaiDetailModal