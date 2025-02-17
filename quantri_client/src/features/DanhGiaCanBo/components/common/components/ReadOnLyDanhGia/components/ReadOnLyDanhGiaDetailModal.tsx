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
import '../../../PhieuChamDiem.scss'
import { IPhuLucItem } from "@/features/DanhGiaCanBo/components/TuChamDiem/ToanBo/components/TuChamDiemDetailModal/DanhGiaDetailModal";
import { useReadOnlyDanhGiaContext } from "../contexts/useReadOnlyDanhGiaContext";
import PhuLucComponentReadOnlyDanhGia from "./ReadOnLyPhuLucComponents";
import HeaederReadOnlyDanhGiaDetailModal from "./ReadOnlyHeaderDanhGiaDetailModal";
import LichSuDanhGiaModal from "../../LichSuDanhGia/LichSuDanhGiaModal";



const ReadOnlyDanhGiaDetailModalVisible = () => {
    const danhGiaContext = useReadOnlyDanhGiaContext()
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<IDanhGia>()
    const [activeTab, setActiveTab] = useState<string>();
    const [totalNormalPoints, setTotalNormalPoints] = useState<number>(0)
    const [totalBonusPoints, setTotalBonusPoints] = useState<number>(0)
    const [totalPenaltyPoints, setTotalPenaltyPoints] = useState<number>(0)
    const diemDanhGiaTotal = useRef(0);

    useEffect(() => {
        (async () => {
            if (buttonActionContext.danhGiaId && buttonActionContext.readOnlyDanhGiaModalVisible) {
                buttonActionContext.setLoading(true)

                const resGetPhieuDanhGia = await danhGiaCanBoServiceApi.GetPhieuDanhGia({ _id: buttonActionContext.danhGiaId, daXem: -1 })
                if (resGetPhieuDanhGia.data.data) {
                    const data: IDanhGiaCanBo = resGetPhieuDanhGia.data.data
                    danhGiaContext.setThongTinPhieuChamDiem(data)

                    danhGiaContext.setPhanLoaiDanhGiaArr(JSON.parse(data.danhSachPhanLoaiDanhGia || ''))

                    if (data.mauPhieus) {
                        const phuLucArr: IPhuLucItem[] = []

                        data.mauPhieus.map((ele: IDanhGiaCanBo) => {
                            const item: IDanhGiaColumn = JSON.parse(ele.dataXuLyKhieuNai || ele.dataLanhDaoDanhGia || ele.dataThamMuu || ele.dataNhanXet || ele.dataTuDanhGia as any)

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
                                scorePoint: ele.scorePoint
                            } as any)
                        })
                        setActiveTab(phuLucArr[0].key)
                        danhGiaContext.setPhuLucDatas(phuLucArr as any)
                    }

                    form.setFieldsValue({
                        ...data as any,

                    })
                } else {
                    toast.error(resGetPhieuDanhGia.data.message)
                }

                buttonActionContext.setLoading(false)
            }
        })()
    }, [buttonActionContext.danhGiaId])

    useCallback((totalPoint: number, normalPoint: number, bonusPoint: number, penaltyPoint: number) => {

        danhGiaContext.setPhuLucDatas((prevData: any) => {
            if (!prevData) return prevData;
            const data = prevData.map((item: IPhuLucItem) =>
                item.key === activeTab ? {
                    ...item,
                    totalPoint: totalPoint,
                    normalPoint: normalPoint,
                    bonusPoint: bonusPoint,
                    penaltyPoint: penaltyPoint
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
    }, [activeTab, danhGiaContext.setPhuLucDatas, danhGiaContext.phuLucDatas]);

    const handlerCancel = () => {
        setActiveTab(undefined)
        buttonActionContext.setReadOnlyDanhGiaModalVisible(false)
        danhGiaContext.setBoTieuChuans(undefined)
        buttonActionContext.setDanhGiaId(undefined)
        danhGiaContext.setDiemLietArr(undefined)
        danhGiaContext.setOpposeArr(undefined)
        danhGiaContext.setPhuLucDatas(undefined)
        danhGiaContext.setKiemNhiem(false)
        danhGiaContext.setDisableDanhGia(false)
        form.resetFields()
    }


    useCallback((key: string, data: IDanhGiaColumn) => {
        danhGiaContext.setPhuLucDatas((prevData: any) => {
            if (!prevData) return prevData;
            return prevData.map((item: IPhuLucItem) =>
                item.key === key ? { ...item, content: data } : item
            );
        });
    }, [activeTab, danhGiaContext.phuLucDatas]);

    const PhuLucTab: IAntdTabsProps["items"] = danhGiaContext.phuLucDatas?.map((item: IPhuLucItem) => {
        return ({
            label: <p>{item.label} {item.totalPoint ? `(${item.totalPoint})` : null}</p>,
            key: item.key,
            children: (
                <div style={{ display: activeTab === item.key ? 'block' : 'none' }}>
                    <PhuLucComponentReadOnlyDanhGia
                        dataRoot={item.content}
                        scorePoint={item.scorePoint}
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


    return <AntdModal className="chamDiemModal" visible={buttonActionContext.readOnlyDanhGiaModalVisible} title={"Xem thông tin chấm điểm"} fullsizeScrollable handlerCancel={handlerCancel}
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
                {/* <Button
                    type="primary"
                    onClick={() => {}}
                    disabled={buttonActionContext.loading}
                    loading={buttonActionContext.loading}
                >
                    Xuất phiếu
                </Button> */}

                <Button key="back" onClick={handlerCancel} loading={buttonActionContext.loading} style={{ backgroundColor: '#f4516c', color: '#fff' }}>
                    Đóng
                </Button>
            </div>


        ]}
    >
        <Spin spinning={buttonActionContext.loading}
            indicator={<LoadingOutlined spin />}
        >
            <HeaederReadOnlyDanhGiaDetailModal form={form} diemDanhGiaTotal={diemDanhGiaTotal.current} />
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
const ReadOnlyDanhGiaDetailModal = () => (
    <ReadOnlyDanhGiaDetailModalVisible />
);


export default ReadOnlyDanhGiaDetailModal