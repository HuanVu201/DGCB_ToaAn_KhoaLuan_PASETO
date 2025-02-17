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
import '../../../../../common/PhieuChamDiem.scss'
import { IPhuLucItem } from "@/features/DanhGiaCanBo/components/TuChamDiem/ToanBo/components/TuChamDiemDetailModal/DanhGiaDetailModal";
import { useLanhDaoDanhGiaChamDiemContext } from "../../contexts/useLDDGChamDiemContext";
import HeaederLanhDaoDanhGiaChamDiemDetailModal from "./LDDGHeaderDanhGiaDetailModal";
import PhuLucComponentLanhDaoDanhGiaChamDiem from "./LDDGPhuLucComponent";
import { useAppSelector } from "@/lib/redux/Hooks";
import LichSuDanhGiaModal from "@/features/DanhGiaCanBo/components/common/components/LichSuDanhGia/LichSuDanhGiaModal";



const LanhDaoDanhGiaChamDiemDetailModalVisible = () => {
    const { parseToken } = useAppSelector((state) => state.auth);
    const danhGiaContext = useLanhDaoDanhGiaChamDiemContext()
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
            if (!danhGiaContext.userDanhGia && buttonActionContext.lanhDaoDanhGiaChamDiemModalVisible && buttonActionContext.danhGiaId) {
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
    }, [danhGiaContext.userDanhGia, buttonActionContext.lanhDaoDanhGiaChamDiemModalVisible])

    useEffect(() => { // Kiểm tra xem đánh giá đã được gửi tới người tiếp theo hay chưa
        if (danhGiaContext.userDanhGia && danhGiaContext.thongTinPhieuChamDiem) {
            if (danhGiaContext.userDanhGia.maNguoiDung?.toLowerCase() != danhGiaContext.thongTinPhieuChamDiem.nguoiDangXuLyId?.toLowerCase()) {
                danhGiaContext.setDisableDanhGia(true)
                console.log("Không có quyền xử lý tại bước này")
            }
        }

    }, [danhGiaContext.userDanhGia, danhGiaContext.thongTinPhieuChamDiem])


    useEffect(() => { // Trưởng đơn vị đánh giá
        (async () => {
            if (buttonActionContext.danhGiaId && buttonActionContext.lanhDaoDanhGiaChamDiemModalVisible) {
                buttonActionContext.setLoading(true)

                const resGetPhieuDanhGia = await danhGiaCanBoServiceApi.GetPhieuDanhGia({ _id: buttonActionContext.danhGiaId, daXem: 3 })
                if (resGetPhieuDanhGia.data.data) {
                    const data: IDanhGiaCanBo = resGetPhieuDanhGia.data.data
                    danhGiaContext.setThongTinPhieuChamDiem(data)

                    danhGiaContext.setPhanLoaiDanhGiaArr(JSON.parse(data.danhSachPhanLoaiDanhGia || ''))

                    if (data.mauPhieus) {
                        const phuLucArr: IPhuLucItem[] = []

                        data.mauPhieus.map((ele: IDanhGiaCanBo) => {
                            const item: IDanhGiaColumn = JSON.parse(ele.dataLanhDaoDanhGia || ele.dataThamMuu || ele.dataNhanXet || ele.dataTuDanhGia as any)

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
                                hasDiemLiet: ele.hasDiemLietLanhDaoDanhGia
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
        setActiveTab(undefined)
        buttonActionContext.setLanhDaoDanhGiaChamDiemModalVisible(false)
        danhGiaContext.setBoTieuChuans(undefined)
        buttonActionContext.setDanhGiaId(undefined)
        danhGiaContext.setDiemLietArr(undefined)
        danhGiaContext.setOpposeArr(undefined)
        danhGiaContext.setPhuLucDatas(undefined)
        danhGiaContext.setKiemNhiem(false)
        danhGiaContext.setUserDanhGia(undefined)
        danhGiaContext.setDisableDanhGia(false)
        form.resetFields()
    }

    // useEffect(() => {
    //     if (buttonActionContext.danhGiaId || !diemDanhGiaTotal.current)
    //         return

    //     let result: string | undefined = buttonActionContext.PhanLoaiChamDiemHandler(danhGiaContext.phuLucDatas as any, diemDanhGiaTotal.current)
    //     if (result)
    //         form.setFieldValue('phanLoaiLanhDaoDanhGia', result)
    //     else
    //         form.setFieldValue('phanLoaiLanhDaoDanhGia', undefined)

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
                form.setFieldValue('phanLoaiLanhDaoDanhGia', result)
        } else {
            form.setFieldValue('phanLoaiLanhDaoDanhGia', undefined)
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
    }, [activeTab, danhGiaContext.setPhuLucDatas, danhGiaContext.phuLucDatas]);

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
                    <PhuLucComponentLanhDaoDanhGiaChamDiem
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



    return <AntdModal className="chamDiemModal" visible={buttonActionContext.lanhDaoDanhGiaChamDiemModalVisible} title={"Đánh giá thông tin chấm điểm"} fullsizeScrollable handlerCancel={handlerCancel}
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
                    Chấm điểm, xếp loại
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
            <HeaederLanhDaoDanhGiaChamDiemDetailModal form={form} diemDanhGiaTotal={diemDanhGiaTotal.current} />

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
        <LichSuDanhGiaModal />

    </AntdModal>
}
const LanhDaoDanhGiaChamDiemDetailModal = () => (
    <LanhDaoDanhGiaChamDiemDetailModalVisible />
);


export default LanhDaoDanhGiaChamDiemDetailModal