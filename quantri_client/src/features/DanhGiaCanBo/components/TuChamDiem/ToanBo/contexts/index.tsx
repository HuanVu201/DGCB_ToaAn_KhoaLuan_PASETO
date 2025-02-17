import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

import { IDanhMuc_BoTieuChuan } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/models";
import { toast } from "react-toastify";
import { IPhuLucItem } from "../components/TuChamDiemDetailModal/DanhGiaDetailModal";
import { IChiTietDanhGia, IDanhGiaCanBo, IUserDanhGia } from "@/features/DanhGiaCanBo/components/common/models";
import { chiTietDanhGiaServiceApi } from "@/features/DanhGiaCanBo/components/common/service/ChiTietDanhGiaService";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { CURRENTTIME_ISOSTRING } from "@/data";
import { userService } from "@/features/user/services";
import { INguoiXuLyTiep } from "@/features/user/models/ApplicationUserGroups";
import { LienKetbuocXuLyApi } from "@/features/lienKetBuocXuLy/services";
import { StringGradients } from "antd/es/progress/progress";
import { IBuocHienTaiRes, IDanhGia, IDanhGiaColumn, IPhanLoaiDanhGia, ITieuChiCouple } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { IBuocXuLyTiep } from "@/models/lienKetBuocXuLy";
import { Gui_Tu_DanhGia, Luu_Tu_DanhGia, Tao_Danh_Gia } from "../../../common/TenVetXuLyConstants";

const DanhGiaContext = createContext<IDanhGiaContext | null>(null)

export interface IDanhGiaContext {
    boTieuChuans: IDanhMuc_BoTieuChuan[] | undefined
    setBoTieuChuans: React.Dispatch<React.SetStateAction<IDanhMuc_BoTieuChuan[] | undefined>>;
    phuLucDatas: [] | undefined
    setPhuLucDatas: React.Dispatch<React.SetStateAction<[] | undefined>>;

    boTieuChuanId: string | undefined;
    setBoTieuChuanId: React.Dispatch<React.SetStateAction<string | undefined>>;

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

    handlerValidate: (form: any, currNode: IBuocHienTaiRes) => void;
    handlerSaveDanhGia: (form: any, currNode: IBuocHienTaiRes, handlerCancel: () => void) => void;
    handlerSaveAndSendDanhGia: (form: any, currNode: IBuocHienTaiRes, handlerCancel: () => void) => void;
}

export const useDanhGiaContext = () => {
    const context = useContext(DanhGiaContext)
    if (!context)
        throw new Error("DanhGiaContext must be used inside DanhGiaContext.Provider")
    return context
}

export const DanhGiaProvider = ({ children }: IWithChildren) => {
    const [boTieuChuans, setBoTieuChuans] = useState<IDanhMuc_BoTieuChuan[]>()
    const [phuLucDatas, setPhuLucDatas] = useState<[] | undefined>([]);
    const [boTieuChuanId, setBoTieuChuanId] = useState<string>()

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

    const handlerValidate = async (form: any, currNode: IBuocHienTaiRes) => {
        if (!currNode)
            return false

        if (!userDanhGia) {
            toast.error("Không có thông tin người đánh giá hiện tại")
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

    const handlerSubmitPhieu = async (form: any, nextStep: boolean, currNode: IBuocHienTaiRes, handlerCancel: () => void) => {
        buttonActionContext.setLoading(true)
        const funcCheck = await handlerValidate(form, currNode)

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
            const resCreate = await danhGiaCanBoServiceApi.Create({
                ...formData as any,
                tenThaoTacVetXuLy: nextStep ? Gui_Tu_DanhGia : Tao_Danh_Gia,
                trangThai: nextStep ? nextNode?.tenTrangThai : currNode.tenTrangThai,
                buocTruocId: nextStep ? currNode.id : undefined,
                buocHienTaiId: nextStep ? nextNode?.buocXuLyId : currNode.id,
                nguoiDangXuLyId: nextStep ? nextNode?.id : userDanhGia?.maNguoiDung,
                laNguoiDaXuLy: nextStep ? true : false,
                maBoTieuChuan: boTieuChuanId,
                tenBoTieuChuan: boTieuChuanId && boTieuChuans && boTieuChuans.length > 0
                    ? boTieuChuans.filter(x => x.maBoTieuChi == boTieuChuanId)[0].tenBoTieuChi : '',
                loaiDanhGia: "Cá nhân",
                maMauPhieuDanhGia: maMauPhieuDanhGiaRequest.join('#') || "",
                tenMauPhieuDanhGia: tenMauPhieuDanhGiaRequest.join('#') || "",
                chiTietDiemDanhGia: chiTietDiemDanhGiaRequest.join('#') || "",
                phanLoaiDanhGia: formData.phanLoaiTuDanhGia,
                phanLoaiTuDanhGia: formData.phanLoaiTuDanhGia,
                diemDanhGia: formData.diemTuDanhGia,
                diemTuDanhGia: formData.diemTuDanhGia,
                yKienDanhGia: formData.yKienTuDanhGia,
                yKienTuDanhGia: formData.yKienTuDanhGia,
                nguoiTuDanhGia: userDanhGia?.fullName,
                nguoiTuDanhGiaId: userDanhGia?.maNguoiDung,
                thoiGianQuery: thoiGianQueryReq,
                hoVaTen: userDanhGia?.fullName,
                taiKhoan: userDanhGia?.userName,
                maNguoiDung: userDanhGia?.maNguoiDung,
                chucVu: userDanhGia?.chucVu,
                chucDanh: userDanhGia?.chucDanh,
                maPhongBan: userDanhGia?.maPhongBan,
                tenPhongBan: userDanhGia?.tenPhongBan,
                tenDonVi: userDanhGia?.tenDonVi,
                maDonVi: userDanhGia?.maDonVi,
                thoiGianTao: CURRENTTIME_ISOSTRING,
                suDung: true,
                maDonViCha: userDanhGia?.maDonViCha,
                khongDanhGia: userDanhGia?.khongDanhGia,
                kiemNhiem: userDanhGia?.kiemNhiem,
                noiDungKiemNhiem: userDanhGia?.noiDungKiemNhiem,
                phone: userDanhGia?.phone,
                email: userDanhGia?.email,
                thuTu: userDanhGia?.thuTu,
                danhSachPhanLoaiDanhGia: JSON.stringify(phanLoaiDanhGiaArr),
                daXem: '0',
                quyTrinhXuLyId: currNode.quyTrinhXuLyId,
                isKySoCaNhan: nextStep ? false : undefined,
                maDonViFull: userDanhGia.maDonViFull
            })

            if (resCreate.data.succeeded && resCreate.data.data) {

                const chiTietDanhGiaArr: IChiTietDanhGia[] = []
                phuLucDatas?.map((item: IPhuLucItem, index) => {
                    if (item) {
                        chiTietDanhGiaArr.push({
                            id: item.key,
                            tenMauPhieu: item.label,
                            maMauPhieu: item.key,
                            maPhieu: resCreate.data.data,
                            chiTietDiemTuDanhGia: `${item.normalPoint ?? 0}#${item.bonusPoint ?? 0}#${item.penaltyPoint ?? 0}`,
                            chiTietDiemDanhGia: `${item.normalPoint ?? 0}#${item.bonusPoint ?? 0}#${item.penaltyPoint ?? 0}`,
                            dataTuDanhGia: JSON.stringify(item.content),
                            diemDanhGia: item.totalPoint,
                            diemTuDanhGia: item.totalPoint,
                            thuTu: index + 1,
                            scorePoint: item.scorePoint,
                            hasDiemLietTuDanhGia: item.hasDiemLiet

                        })
                    }
                })
                if (chiTietDanhGiaArr && chiTietDanhGiaArr.length > 0) {
                    const resCreateChiTietArr = await chiTietDanhGiaServiceApi.AddListChiTietDanhGia(chiTietDanhGiaArr)
                    if (resCreateChiTietArr.data.succeeded) {
                        if (nextStep) toast.success("Đánh giá thành công")
                        else toast.success("Lưu đánh giá thành công")
                        setReload(!reload)

                        handlerCancel()
                    } else {
                        toast.error(resCreateChiTietArr.data.message)
                    }
                }
            } else {
                toast.error('Đánh giá thất bại')
            }
        } catch (error) {
            buttonActionContext.setLoading(false)
        }

        buttonActionContext.setLoading(false)
    }


    const handlerSaveDanhGia = async (form: any, currNode: IBuocHienTaiRes, handlerCancel: () => void) => {
        buttonActionContext.setLoading(true)

        await handlerSubmitPhieu(form, false, currNode, handlerCancel)

        buttonActionContext.setLoading(false)

    }

    const handlerSaveAndSendDanhGia = async (form: any, currNode: IBuocHienTaiRes, handlerCancel: () => void) => {
        buttonActionContext.setLoading(true)

        if (!nextNode) {
            toast.error("Không có thông tin bước xử lý tiếp theo")
            return
        }

        await handlerSubmitPhieu(form, true, currNode, handlerCancel)

        buttonActionContext.setLoading(false)
    }


    return <DanhGiaContext.Provider value={{
        boTieuChuans, setBoTieuChuans,
        phuLucDatas, setPhuLucDatas,
        boTieuChuanId, setBoTieuChuanId,
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
    </DanhGiaContext.Provider>
}