import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { IDanhMuc_BoTieuChuan } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/models";
import { toast } from "react-toastify";
import { IChiTietDanhGia, IDanhGiaCanBo, IUserDanhGia } from "@/features/DanhGiaCanBo/components/common/models";
import { chiTietDanhGiaServiceApi } from "@/features/DanhGiaCanBo/components/common/service/ChiTietDanhGiaService";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { CURRENTTIME_ISOSTRING } from "@/data";
import { INguoiXuLyTiep } from "@/features/user/models/ApplicationUserGroups";
import { IDanhGiaColumn, IPhanLoaiDanhGia, ITieuChiCouple } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { IPhuLucItem } from "@/features/DanhGiaCanBo/components/TuChamDiem/ToanBo/components/TuChamDiemDetailModal/DanhGiaDetailModal";
import { Gui_Tham_Muu, Luu_Tham_Muu } from "@/features/DanhGiaCanBo/components/common/TenVetXuLyConstants";

const LanhDaoThamMuuChamDiemContext = createContext<ILanhDaoThamMuuChamDiemContext | null>(null)

export interface ILanhDaoThamMuuChamDiemContext {
    boTieuChuans: IDanhMuc_BoTieuChuan[] | undefined
    setBoTieuChuans: React.Dispatch<React.SetStateAction<IDanhMuc_BoTieuChuan[] | undefined>>;
    phuLucDatas: [] | undefined
    setPhuLucDatas: React.Dispatch<React.SetStateAction<[] | undefined>>;

    boTieuChuanId: string | undefined;
    setBoTieuChuanId: React.Dispatch<React.SetStateAction<string | undefined>>;

    thongTinPhieuChamDiem: IDanhGiaCanBo | undefined
    setThongTinPhieuChamDiem: React.Dispatch<React.SetStateAction<IDanhGiaCanBo | undefined>>;


    kiemNhiem: boolean;
    setKiemNhiem: React.Dispatch<React.SetStateAction<boolean>>;
    saoChepDiemHandler: boolean;
    setSaoChepDiemHandler: React.Dispatch<React.SetStateAction<boolean>>;
    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
    disableDanhGia: boolean;
    setDisableDanhGia: React.Dispatch<React.SetStateAction<boolean>>;
    opposeArr: ITieuChiCouple[] | undefined;
    setOpposeArr: React.Dispatch<React.SetStateAction<ITieuChiCouple[] | undefined>>;
    diemLietArr: ITieuChiCouple[] | undefined;
    setDiemLietArr: React.Dispatch<React.SetStateAction<ITieuChiCouple[] | undefined>>;
    phanLoaiDanhGiaArr: IPhanLoaiDanhGia[] | undefined;
    setPhanLoaiDanhGiaArr: React.Dispatch<React.SetStateAction<IPhanLoaiDanhGia[] | undefined>>;
    userDanhGia: IUserDanhGia | undefined;
    setUserDanhGia: React.Dispatch<React.SetStateAction<IUserDanhGia | undefined>>;

    nextNode: INguoiXuLyTiep | undefined;
    setNextNode: React.Dispatch<React.SetStateAction<INguoiXuLyTiep | undefined>>;

    diemTuDanhGiaTotal: number;
    setDiemTuDanhGiaTotal: React.Dispatch<React.SetStateAction<number>>;

    handlerValidate: (form: any) => void;
    handlerSaveDanhGia: (form: any, handlerCancel: () => void) => void;
    handlerSaveAndSendDanhGia: (form: any, handlerCancel: () => void) => void;
}

export const useLanhDaoThamMuuChamDiemContext = () => {
    const context = useContext(LanhDaoThamMuuChamDiemContext)
    if (!context)
        throw new Error("LanhDaoThamMuuChamDiemContext must be used inside LanhDaoThamMuuChamDiemContext.Provider")
    return context
}

export const LanhDaoThamMuuChamDiemProvider = ({ children }: IWithChildren) => {
    const [boTieuChuans, setBoTieuChuans] = useState<IDanhMuc_BoTieuChuan[]>()
    const [phuLucDatas, setPhuLucDatas] = useState<[] | undefined>([]);
    const [boTieuChuanId, setBoTieuChuanId] = useState<string>()
    const [thongTinPhieuChamDiem, setThongTinPhieuChamDiem] = useState<IDanhGiaCanBo>()
    const [kiemNhiem, setKiemNhiem] = useState<boolean>(false)
    const [saoChepDiemHandler, setSaoChepDiemHandler] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    const [disableDanhGia, setDisableDanhGia] = useState<boolean>(false)
    const [opposeArr, setOpposeArr] = useState<ITieuChiCouple[]>()
    const [diemLietArr, setDiemLietArr] = useState<ITieuChiCouple[]>()
    const [phanLoaiDanhGiaArr, setPhanLoaiDanhGiaArr] = useState<IPhanLoaiDanhGia[]>()
    const [diemTuDanhGiaTotal, setDiemTuDanhGiaTotal] = useState<number>(0)
    const [userDanhGia, setUserDanhGia] = useState<IUserDanhGia>()
    const [nextNode, setNextNode] = useState<INguoiXuLyTiep>()

    const buttonActionContext = useButtonActionContext()

    const handlerValidate = async (form: any) => {
        if (!nextNode?.buocXuLyId) {
            toast.error("Không có thông tin bước xử lý tiếp theo")
            return
        }
        if (!userDanhGia) {
            return false
        }

        if (!phuLucDatas) {
            toast.error("Không có dữ liệu")
            return false
        }
        let checkAll: boolean = true
        phuLucDatas.forEach((element: IPhuLucItem) => {
            let validateFields: boolean = true
            if (!element.totalPoint)
                validateFields = false

            MapForCheck(element.content.DanhSachTieuChiCon as any)
            function MapForCheck(data: IDanhGiaColumn[]) {
                data.map(item => {
                    const diemSoSanh = item.DiemNhanXet != null ? item.DiemNhanXet : item.DiemTuCham

                    if (item.isGiaiTrinhTM) {
                        if (((item.DiemThuong && !item.DiemTru) || (item.DiemTru && !item.DiemThuong)) && item.DiemThamMuu != null && item.DiemThamMuu != 0) {
                            const validate = item.NoiDungGiaiTrinhTM ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err TM isGiaiTrinh: ((item.DiemThuong && !item.DiemTru) || (item.DiemTru && !item.DiemThuong)) && item.DiemThamMuu && item.DiemThamMuu != 0`, item)
                            }
                        }
                        if ((item.DuocChamNhieuLan) && item.DiemThamMuu != null && item.DiemThamMuu != 0) {
                            const validate = item.NoiDungGiaiTrinhTM ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err TM isGiaiTrinh: (item.DuocChamNhieuLan) && item.DiemThamMuu && item.DiemThamMuu != 0`, item)
                            }
                        }
                        if (!item.DiemThuong && !item.DiemTru && item.DiemThamMuu != null && item.DiemThamMuu != diemSoSanh) {
                            const validate = item.NoiDungGiaiTrinhTM ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err TM isGiaiTrinh: !item.DiemThuong && !item.DiemTru && item.DiemThamMuu && item.DiemThamMuu != diemSoSanh`, item)
                            }
                        }
                    } else if (!item.DiemLiet) {
                        if (!item.DiemThuong && !item.DiemTru && !(item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0)) {
                            const validate = item.DiemThamMuu != null && item.DiemThamMuu == Number(diemSoSanh) ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err TM normal: !item.DiemThuong && !item.DiemTru && !(item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0`, item)
                            }
                        }
                    }

                    if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0)
                        MapForCheck(item.DanhSachTieuChiCon)
                })
            }
            if (!validateFields) {
                checkAll = false
                toast.error(`"${element.label}" chưa hoàn thiện đánh giá!`)
            }
        })

        const formData = await form.validateFields()

        if (!checkAll || !formData)
            return false

        return true
    }


    const handlerUpdatePhieu = async (form: any, nextStep: boolean, handlerCancel: () => void) => {
        buttonActionContext.setLoading(true)
        const funcCheck = await handlerValidate(form)

        if (!funcCheck) {
            buttonActionContext.setLoading(false)
            return
        }

        const formData = await form.validateFields()

        const chiTietDiemDanhGiaRequest: number[] = []
        const tenMauPhieuDanhGiaRequest: string[] = []
        const maMauPhieuDanhGiaRequest: string[] = []
        phuLucDatas?.forEach((ele: IPhuLucItem) => {
            if (ele.totalPoint)
                chiTietDiemDanhGiaRequest.push(ele.totalPoint)
            if (ele.label)
                tenMauPhieuDanhGiaRequest.push(ele.label)
            if (ele.key)
                maMauPhieuDanhGiaRequest.push(ele.key)
        })

        let thoiGianQueryReq: string = ''
        if (formData.loaiThoiGian?.toLowerCase() == 'năm') {
            thoiGianQueryReq = `${formData.namDanhGia || ''}`
        } else
            thoiGianQueryReq = `${formData.namDanhGia || ''}${formData.thoiGian || ''}`

        try {
            const resUpdate = await danhGiaCanBoServiceApi.Update({
                id: buttonActionContext.danhGiaId,
                data: {
                    ...formData as any,
                    tenThaoTacVetXuLy: nextStep ? Gui_Tham_Muu : Luu_Tham_Muu,
                    trangThai: nextStep ? nextNode?.tenTrangThai : thongTinPhieuChamDiem?.trangThai,
                    buocTruocId: nextStep ? thongTinPhieuChamDiem?.buocHienTaiId : thongTinPhieuChamDiem?.buocTruocId,
                    buocHienTaiId: nextStep ? nextNode?.buocXuLyId : thongTinPhieuChamDiem?.buocHienTaiId,
                    nguoiDangXuLyId: nextStep ? nextNode?.id : thongTinPhieuChamDiem?.nguoiDangXuLyId,
                    laNguoiDaXuLy: nextStep ? true : false,
                    phanLoaiDanhGia: formData.phanLoaiThamMuu,
                    phanLoaiThamMuu: formData.phanLoaiThamMuu,
                    diemDanhGia: formData.diemThamMuu,
                    diemThamMuu: formData.diemThamMuu,
                    yKienDanhGia: formData.yKienThamMuu,
                    yKienThamMuu: formData.yKienThamMuu,
                    nguoiThamMuu: nextStep ? userDanhGia?.fullName : undefined,
                    nguoiThamMuuId: nextStep ? userDanhGia?.maNguoiDung : undefined,
                    thoiGianThamMuu: nextStep ? CURRENTTIME_ISOSTRING : undefined,
                    suDung: true,
                    isKySoThamMuu: nextStep ? false : undefined
                }
            }
            )

            if (resUpdate.data.succeeded) {

                const chiTietDanhGiaArr: IChiTietDanhGia[] = []
                phuLucDatas?.map((item: IPhuLucItem, index) => {
                    if (item) {
                        chiTietDanhGiaArr.push({
                            id: item.key,
                            tenMauPhieu: item.label,
                            maMauPhieu: item.key,
                            maPhieu: resUpdate.data.data,
                            chiTietDiemThamMuu: `${item.normalPoint ?? 0}#${item.bonusPoint ?? 0}#${item.penaltyPoint ?? 0}`,
                            chiTietDiemDanhGia: `${item.normalPoint ?? 0}#${item.bonusPoint ?? 0}#${item.penaltyPoint ?? 0}`,
                            dataThamMuu: JSON.stringify(item.content),
                            diemDanhGia: item.totalPoint,
                            diemThamMuu: item.totalPoint,
                            thuTu: index + 1,
                            hasDiemLietThamMuu: item.hasDiemLiet
                        })
                    }
                })
                if (chiTietDanhGiaArr && chiTietDanhGiaArr.length > 0) {
                    const resUpdateChiTietArr = await chiTietDanhGiaServiceApi.UpdateListChiTietDanhGia(chiTietDanhGiaArr)

                    if (resUpdateChiTietArr.data.succeeded) {
                        toast.success("Tham mưu đánh giá, chấm điểm thành công")
                        setReload(!reload)

                        handlerCancel()
                    } else {
                        toast.error(resUpdate.data.message)
                        toast.error(resUpdateChiTietArr.data.message)
                    }
                }
            } else {
                toast.error('Cập nhật đánh giá thất bại')
            }
        } catch (error) {
            buttonActionContext.setLoading(false)
        }

        buttonActionContext.setLoading(false)
    }

    const handlerSaveDanhGia = async (form: any, handlerCancel: () => void) => {
        buttonActionContext.setLoading(true)

        await handlerUpdatePhieu(form, false, handlerCancel)

        buttonActionContext.setLoading(false)

    }

    const handlerSaveAndSendDanhGia = async (form: any, handlerCancel: () => void) => {
        buttonActionContext.setLoading(true)

        await handlerUpdatePhieu(form, true, handlerCancel)

        buttonActionContext.setLoading(false)
    }


    return <LanhDaoThamMuuChamDiemContext.Provider value={{
        boTieuChuans, setBoTieuChuans,
        phuLucDatas, setPhuLucDatas,
        boTieuChuanId, setBoTieuChuanId,
        thongTinPhieuChamDiem, setThongTinPhieuChamDiem,
        kiemNhiem, setKiemNhiem,
        saoChepDiemHandler, setSaoChepDiemHandler,
        reload, setReload,
        disableDanhGia, setDisableDanhGia,
        opposeArr, setOpposeArr,
        diemLietArr, setDiemLietArr,
        phanLoaiDanhGiaArr, setPhanLoaiDanhGiaArr,
        diemTuDanhGiaTotal, setDiemTuDanhGiaTotal,
        userDanhGia, setUserDanhGia,
        nextNode, setNextNode,
        handlerValidate,
        handlerSaveDanhGia,
        handlerSaveAndSendDanhGia,
    }}>
        {children}
    </LanhDaoThamMuuChamDiemContext.Provider>
}