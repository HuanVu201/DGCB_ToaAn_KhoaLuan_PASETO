import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

import { IDanhMuc_BoTieuChuan } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/models";
import { toast } from "react-toastify";
import { IChiTietDanhGia, IDanhGiaCanBo, IUserDanhGia } from "@/features/DanhGiaCanBo/components/common/models";
import { chiTietDanhGiaServiceApi } from "@/features/DanhGiaCanBo/components/common/service/ChiTietDanhGiaService";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { INguoiXuLyTiep } from "@/features/user/models/ApplicationUserGroups";
import { IDanhGiaColumn, IPhanLoaiDanhGia, ITieuChiCouple } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { IPhuLucItem } from "../../TuChamDiem/ToanBo/components/TuChamDiemDetailModal/DanhGiaDetailModal";
import { useTaoDanhGiaDonViPhongBanContext } from "./useTaoDanhGiaDonViPhongBanContext";
import { Gui_Tu_DanhGia, Luu_Tu_DanhGia } from "../../common/TenVetXuLyConstants";
import { danhGiaDonViServiceApi } from "../services/DanhGiaDonViService";
import { ChiTietDanhGiaDonViServiceApi } from "../services/ChiTietDanhGiaDonViService";


const CapNhatDanhGiaDonViPhongBanContext = createContext<ICapNhatDanhGiaDonViPhongBanContext | null>(null)

export interface ICapNhatDanhGiaDonViPhongBanContext {
    boTieuChuans: IDanhMuc_BoTieuChuan[] | undefined
    setBoTieuChuans: React.Dispatch<React.SetStateAction<IDanhMuc_BoTieuChuan[] | undefined>>;
    phuLucDatas: IPhuLucItem[] | undefined
    setPhuLucDatas: React.Dispatch<React.SetStateAction<IPhuLucItem[] | undefined>>;

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

export const useCapNhatDanhGiaDonViPhongBanContext = () => {
    const context = useContext(CapNhatDanhGiaDonViPhongBanContext)
    if (!context)
        throw new Error("CapNhatDanhGiaDonViPhongBanContext must be used inside CapNhatDanhGiaDonViPhongBanContext.Provider")
    return context
}

export const CapNhatDanhGiaDonViPhongBanProvider = ({ children }: IWithChildren) => {
    const [boTieuChuans, setBoTieuChuans] = useState<IDanhMuc_BoTieuChuan[]>()
    const [phuLucDatas, setPhuLucDatas] = useState<IPhuLucItem[] | undefined>([]);
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
    const danhGiaContext = useTaoDanhGiaDonViPhongBanContext()

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
                    if (item.isGiaiTrinh) {
                        if (((item.DiemThuong && !item.DiemTru) || (item.DiemTru && !item.DiemThuong)) && item.DiemTuCham != null && item.DiemTuCham != 0) {
                            const validate = item.NoiDungGiaiTrinh ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err isGiaiTrinh: ((item.DiemThuong && !item.DiemTru) || (item.DiemTru && !item.DiemThuong)) && item.DiemTuCham && item.DiemTuCham != 0`, item)
                            }
                        }
                        if ((item.DuocChamNhieuLan) && item.DiemTuCham != null && item.DiemTuCham != 0) {
                            const validate = item.NoiDungGiaiTrinh ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err isGiaiTrinh: (item.DuocChamNhieuLan) && item.DiemTuCham && item.DiemTuCham != 0`, item)
                            }
                        }
                        if (!item.DiemThuong && !item.DiemTru && item.DiemTuCham != null && item.DiemTuCham != item.ThangDiem) {
                            const validate = item.NoiDungGiaiTrinh ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err isGiaiTrinh: !item.DiemThuong && !item.DiemTru && item.DiemTuCham && item.DiemTuCham != item.ThangDiem`, item)
                            }
                        }
                    } else if (!item.DiemLiet) {
                        if (!item.DiemThuong && !item.DiemTru && !(item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0)) {
                            const validate = item.DiemTuCham != null && item.DiemTuCham == Number(item.ThangDiem) ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err normal: !item.DiemThuong && !item.DiemTru && !(item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0`, item)
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

        if (!nextNode?.id || !userDanhGia?.maNguoiDung) {
            console.log('!nextNode?.id || !userDanhGia?.maNguoiDung')
            toast.error("Không có thông tin người xử lý bước tiếp theo")
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
            const resUpdate = await danhGiaDonViServiceApi.Update({
                id: buttonActionContext.danhGiaId,
                data: {
                    ...formData as any,
                    tenThaoTacVetXuLy: nextStep ? Gui_Tu_DanhGia : Luu_Tu_DanhGia,
                    trangThai: nextStep ? nextNode?.tenTrangThai : thongTinPhieuChamDiem?.trangThai,
                    buocTruocId: nextStep ? thongTinPhieuChamDiem?.buocHienTaiId : thongTinPhieuChamDiem?.buocTruocId,
                    buocHienTaiId: nextStep ? nextNode?.buocXuLyId : thongTinPhieuChamDiem?.buocHienTaiId,
                    nguoiDangXuLyId: nextStep ? nextNode?.id : thongTinPhieuChamDiem?.nguoiDangXuLyId,

                    phanLoaiDanhGia: formData.phanLoaiTuDanhGia,
                    phanLoaiTuDanhGia: formData.phanLoaiTuDanhGia,
                    diemDanhGia: formData.diemTuDanhGia,
                    diemTuDanhGia: formData.diemTuDanhGia,
                    yKienDanhGia: formData.yKienTuDanhGia,
                    yKienTuDanhGia: formData.yKienTuDanhGia,
                    nguoiTuDanhGia: userDanhGia?.fullName,
                    nguoiTuDanhGiaId: userDanhGia?.maNguoiDung,
                    daXem: '0',
                    suDung: true,
                    isKySoDonVi: nextStep ? false : undefined

                }
            }
            )

            if (resUpdate.data.succeeded) {


                const chiTietDanhGiaArr: IChiTietDanhGia[] = []
                phuLucDatas?.map((item: IPhuLucItem, index) => {
                    if (item) {
                        chiTietDanhGiaArr.push({
                            id: item.key, //
                            tenMauPhieu: item.label,
                            maMauPhieu: item.key,
                            maPhieu: resUpdate.data.data,
                            chiTietDiemTuDanhGia: `${item.normalPoint ?? 0}#${item.bonusPoint ?? 0}#${item.penaltyPoint ?? 0}`,//
                            chiTietDiemDanhGia: `${item.normalPoint ?? 0}#${item.bonusPoint ?? 0}#${item.penaltyPoint ?? 0}`,
                            dataTuDanhGia: JSON.stringify(item.content),//
                            diemDanhGia: item.totalPoint,
                            diemTuDanhGia: item.totalPoint,//
                            thuTu: index + 1,
                            hasDiemLietTuDanhGia: item.hasDiemLiet
                        })
                    }
                })
                if (chiTietDanhGiaArr && chiTietDanhGiaArr.length > 0) {
                    const resUpdateChiTietArr = await ChiTietDanhGiaDonViServiceApi.UpdateListChiTietDanhGia(chiTietDanhGiaArr)

                    if (resUpdateChiTietArr.data.succeeded) {
                        toast.success("Cập nhật đánh giá thành công")
                        danhGiaContext.setReload(!danhGiaContext.reload)

                        handlerCancel()
                    } else {
                        toast.error(resUpdateChiTietArr.data.message)
                    }
                }
            } else {
                toast.error(resUpdate.data.message)
                // toast.error('Cập nhật đánh giá thất bại')
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


    return <CapNhatDanhGiaDonViPhongBanContext.Provider value={{
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
    </CapNhatDanhGiaDonViPhongBanContext.Provider>
}