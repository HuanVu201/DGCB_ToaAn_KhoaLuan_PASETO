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
import { IBuocHienTaiRes, IDanhGia, IDanhGiaColumn } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import '../../../common/PhieuChamDiem.scss'
import { useTTDVChamDiemContext } from "../../contexts/useTTDVChamDiemContext";
import HeaederTTDVChamDiemDetailModal from "./TTDVHeaderDanhGiaDetailModal";
import PhuLucComponentTTDVChamDiem from "./TTDVPhuLucComponent";
import { buocXuLyApi } from "@/features/buocxuly/services";

export interface IPhuLucItemTTDVChamDiem {
    key: string;
    label: string;
    content: IDanhGiaColumn;
    scorePoint: string,
    scorePointKiemNhiem: string,
    totalPoint: number,

    totalPointTuDG: number,
    hasDiemLietTuDG?: boolean,
    normalPointTuDG: number,
    bonusPointTuDG: number,
    penaltyPointTuDG: number,

    totalPointDG: number,
    hasDiemLietDG?: boolean,
    normalPointDG: number,
    bonusPointDG: number,
    penaltyPointDG: number,
}

const TTDVChamDiemDetailModalVisible = () => {
    const danhGiaContext = useTTDVChamDiemContext()
    const buttonActionContext = useButtonActionContext()
    const [form] = Form.useForm<IDanhGia>()
    const [activeTab, setActiveTab] = useState<string>();
    const [totalNormalPointsTuDG, setTotalNormalPointsTuDG] = useState<number>(0)
    const [totalBonusPointsTuDG, setTotalBonusPointsTuDG] = useState<number>(0)
    const [totalPenaltyPointsTuDG, setTotalPenaltyPointsTuDG] = useState<number>(0)
    const [currNode, setCurrNode] = useState<IBuocHienTaiRes>(); // Lấy ra bước đánh giá cuối cùng
    const [totalNormalPointsDG, setTotalNormalPointsDG] = useState<number>(0)
    const [totalBonusPointsDG, setTotalBonusPointsDG] = useState<number>(0)
    const [totalPenaltyPointsDG, setTotalPenaltyPointsDG] = useState<number>(0)
    const diemTuDanhGiaTotal = useRef(0);
    const diemLanhDaoDanhGiaTotal = useRef(0);

    diemTuDanhGiaTotal.current = danhGiaContext.phuLucDatas?.filter((x: any) => x.hasDiemLietTuDG == false)?.reduce((sum, item: any) => sum + (item.totalPointTuDG || 0), 0) || 0;
    diemLanhDaoDanhGiaTotal.current = danhGiaContext.phuLucDatas?.filter((x: any) => x.hasDiemLietDG == false)?.reduce((sum, item: any) => sum + (item.totalPointDG || 0), 0) || 0;

    useEffect(() => {
        (async () => {
            if (!danhGiaContext.userDanhGia && buttonActionContext.thuTruongDonViChamDiemModalVisible) {
                try {
                    const resUserDanhGia = await userService.DanhSachTruongDonVi()
                    if (resUserDanhGia.data.data[0]) {
                        const dataUser = resUserDanhGia.data.data[0]
                        if (dataUser.khongDanhGia) {
                            toast.error("Tài khoản này không được đánh giá")
                            handlerCancel()
                            return
                        } else {
                            danhGiaContext.setUserDanhGia(dataUser)
                        }
                    } else {
                        toast.error(resUserDanhGia.data.message)
                        handlerCancel()
                    }
                } catch (error) {
                    toast.error("Không có thông tin của trưởng đơn vị")
                    handlerCancel()

                }
            }
        })()
    }, [danhGiaContext.userDanhGia, buttonActionContext.thuTruongDonViChamDiemModalVisible])


    useEffect(() => {
        (async () => {
            if (!currNode && buttonActionContext.thuTruongDonViChamDiemModalVisible && danhGiaContext.userDanhGia) {
                try {
                    const resBuocXuLy = await buocXuLyApi.GetBuocHienTai({ loaiBuoc: "END" });

                    if (!resBuocXuLy.data.succeeded) {
                        toast.error(resBuocXuLy.data.message)
                        handlerCancel()
                    }
                    else {
                        if (resBuocXuLy.data.data) {
                            setCurrNode(resBuocXuLy.data.data)
                        } else {
                            toast.error("Không có thông tin bước đánh giá")
                            handlerCancel()
                        }
                    }
                } catch {
                    toast.error("Không có thông tin bước đánh giá")
                    handlerCancel()
                }
            }
        })()
    }, [danhGiaContext.userDanhGia, buttonActionContext.thuTruongDonViChamDiemModalVisible])


    useEffect(() => {
        if (buttonActionContext.danhGiaId || !diemTuDanhGiaTotal.current)
            return

        let result: string | undefined = danhGiaContext.PhanLoaiTuChamDiemHandler(danhGiaContext.phuLucDatas as any, diemTuDanhGiaTotal.current)
        if (result)
            form.setFieldValue('phanLoaiTuDanhGia', result)
        else
            form.setFieldValue('phanLoaiTuDanhGia', undefined)
    }, [diemTuDanhGiaTotal.current])

    useEffect(() => {
        if (buttonActionContext.danhGiaId || !diemLanhDaoDanhGiaTotal.current)
            return

        let result: string | undefined = danhGiaContext.PhanLoaiLanhDaoDanhGiaHandler(danhGiaContext.phuLucDatas as any, diemLanhDaoDanhGiaTotal.current)
        if (result)
            form.setFieldValue('phanLoaiLanhDaoDanhGia', result)
        else
            form.setFieldValue('phanLoaiLanhDaoDanhGia', undefined)
    }, [diemLanhDaoDanhGiaTotal.current])



    useEffect(() => {
        (async () => {
            if (danhGiaContext.boTieuChuans && danhGiaContext.boTieuChuans.length > 0 && !buttonActionContext.danhGiaId)
                danhGiaContext.setBoTieuChuanId(danhGiaContext.boTieuChuans[0].maBoTieuChi)
        })()
    }, [danhGiaContext.boTieuChuans])


    useEffect(() => { // Tạo mới phiếu đánh giá
        (async () => {
            if (danhGiaContext.boTieuChuanId && !buttonActionContext.danhGiaId && danhGiaContext.userDanhGia) {
                console.log(danhGiaContext.userDanhGia.maNguoiDung)
                buttonActionContext.setLoading(true)
                try {
                    const res = await danhMuc_PhieuDanhGiaApi.SearchMauPhieusByUserAndBoTieuChuan({
                        maBoTieuChuan: danhGiaContext.boTieuChuanId,
                        truongDonViUserGroupId: danhGiaContext.userDanhGia.maNguoiDung as any,
                        pageSize: 3,
                        pageNumber: 1
                    })
                    if (res.data.data) {
                        const phuLucArr: IPhuLucItemTTDVChamDiem[] = []
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
    }, [danhGiaContext.boTieuChuanId, danhGiaContext.userDanhGia])

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

    const handlerCancel = () => {
        setActiveTab(undefined)
        buttonActionContext.setThuTruongDonViChamDiemModalVisible(false)
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
        setCurrNode(undefined)
        form.resetFields()
    }


    const updatePoint = useCallback((totalPoint: number, totalPointTuDG: number, normalPointTuDG: number, bonusPointTuDG: number, penaltyPointTuDG: number, hasDiemLietTuDG: boolean,
        totalPointDG: number, normalPointDG: number, bonusPointDG: number, penaltyPointDG: number, hasDiemLietDG: boolean
    ) => {

        danhGiaContext.setPhuLucDatas((prevData: any) => {
            if (!prevData) return prevData;
            const data = prevData.map((item: IPhuLucItemTTDVChamDiem) =>
                item.key === activeTab ? {
                    ...item,
                    totalPoint: totalPoint,
                    totalPointTuDG: totalPointTuDG,
                    normalPointTuDG: normalPointTuDG,
                    bonusPointTuDG: bonusPointTuDG,
                    penaltyPointTuDG: penaltyPointTuDG,
                    hasDiemLietTuDG: hasDiemLietTuDG,

                    totalPointDG: totalPointDG,
                    normalPointDG: normalPointDG,
                    bonusPointDG: bonusPointDG,
                    penaltyPointDG: penaltyPointDG,
                    hasDiemLietDG: hasDiemLietDG,

                } : item
            );

            data?.map((item: IPhuLucItemTTDVChamDiem) => {
                if (item.key == activeTab) {
                    setTotalNormalPointsTuDG(item.normalPointTuDG || 0)
                    setTotalBonusPointsTuDG(item.bonusPointTuDG || 0)
                    setTotalPenaltyPointsTuDG(item.penaltyPointTuDG || 0)

                    setTotalNormalPointsDG(item.normalPointDG || 0)
                    setTotalBonusPointsDG(item.bonusPointDG || 0)
                    setTotalPenaltyPointsDG(item.penaltyPointDG || 0)
                }
            })

            return data
        })

    }, [activeTab, danhGiaContext.setPhuLucDatas]);

    const updatePhuLucData = useCallback((key: string, data: IDanhGiaColumn) => {
        danhGiaContext.setPhuLucDatas((prevData: any) => {
            if (!prevData) return prevData;
            return prevData.map((item: IPhuLucItemTTDVChamDiem) =>
                item.key === key ? { ...item, content: data } : item
            )
        })
    }, [activeTab, danhGiaContext.setPhuLucDatas])

    const PhuLucTab: IAntdTabsProps["items"] = danhGiaContext.phuLucDatas?.map((item: IPhuLucItemTTDVChamDiem) => {
        return ({
            label: <p>{item.label} {item.totalPointTuDG || item.totalPointDG ? `(${item.totalPointTuDG || '...'} - ${item.totalPointDG || '...'})` : null}</p>,
            key: item.key,
            children: (
                <div style={{ display: activeTab === item.key ? 'block' : 'none' }}>
                    <PhuLucComponentTTDVChamDiem
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
            danhGiaContext.phuLucDatas?.map((item: IPhuLucItemTTDVChamDiem) => {
                if (item.key == activeTab) {
                    setTotalNormalPointsTuDG(Number(item.normalPointTuDG || 0))
                    setTotalBonusPointsTuDG(Number(item.bonusPointTuDG || 0))
                    setTotalPenaltyPointsTuDG(Number(item.penaltyPointTuDG || 0))

                    setTotalNormalPointsDG(Number(item.normalPointDG || 0))
                    setTotalBonusPointsDG(Number(item.bonusPointDG || 0))
                    setTotalPenaltyPointsDG(Number(item.penaltyPointDG || 0))
                }
            })
        }
    }, [activeTab])

    return <AntdModal className="chamDiemModal" visible={buttonActionContext.thuTruongDonViChamDiemModalVisible} title={"Thông tin chấm điểm, xếp loại"} fullsizeScrollable handlerCancel={handlerCancel}
        footer={[
            <>
                <div className="infoChamDiem">
                    {totalNormalPointsTuDG || totalBonusPointsTuDG || totalPenaltyPointsTuDG
                        ?
                        <p>Tổng điểm tự chấm: Điểm đạt yêu cầu (<b>{totalNormalPointsTuDG}</b>) -
                            <span className="diemThuongRow"> Tổng điểm thưởng (<b>{totalBonusPointsTuDG}</b>) </span> -
                            <span className="diemTruRow"> Tổng điểm trừ (<b>{Math.abs(totalPenaltyPointsTuDG)}</b>) </span>
                        </p>
                        : null
                    }
                    {totalNormalPointsDG || totalBonusPointsDG || totalPenaltyPointsDG
                        ?
                        <p>Tổng điểm lãnh đạo chấm: Điểm đạt yêu cầu (<b>{totalNormalPointsDG}</b>) -
                            <span className="diemThuongRow"> Tổng điểm thưởng (<b>{totalBonusPointsDG}</b>) </span> -
                            <span className="diemTruRow"> Tổng điểm trừ (<b>{Math.abs(totalPenaltyPointsDG)}</b>) </span>
                        </p>
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
                    onClick={() => danhGiaContext.handlerSaveAndSendDanhGia(form, currNode as any, handlerCancel)}
                    disabled={buttonActionContext.loading}
                    loading={buttonActionContext.loading}
                    style={{ backgroundColor: '#5867dd' }}
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
            <HeaederTTDVChamDiemDetailModal form={form} diemTuDanhGiaTotal={diemTuDanhGiaTotal.current} diemLanhDaoDanhGiaTotal={diemLanhDaoDanhGiaTotal.current} />

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
const TTDVChamDiemDetailModal = () => (
    <TTDVChamDiemDetailModalVisible />
);


export default TTDVChamDiemDetailModal