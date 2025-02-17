import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";

import { IDanhMuc_BoTieuChuan } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/models";
import { toast } from "react-toastify";
import { IChiTietDanhGia, IDanhGiaCanBo, IUserDanhGia } from "@/features/DanhGiaCanBo/components/common/models";
import { chiTietDanhGiaServiceApi } from "@/features/DanhGiaCanBo/components/common/service/ChiTietDanhGiaService";
import { danhGiaCanBoServiceApi } from "@/features/DanhGiaCanBo/components/common/service/DanhGiaService";
import { CURRENTTIME_ISOSTRING } from "@/data";
import { userService } from "@/features/user/services";
import { DanhSachTruongDonViDto, INguoiXuLyTiep } from "@/features/user/models/ApplicationUserGroups";
import { LienKetbuocXuLyApi } from "@/features/lienKetBuocXuLy/services";
import { StringGradients } from "antd/es/progress/progress";
import { IBuocHienTaiRes, IDanhGia, IDanhGiaColumn, IPhanLoaiDanhGia, ITieuChiCouple } from "@/features/DanhGiaCanBo/components/common/models/phieuDanhGia";
import { useButtonActionContext } from "@/features/DanhGiaCanBo/components/common/contexts/useButtonActionContext";
import { IBuocXuLyTiep } from "@/models/lienKetBuocXuLy";
import { Gui_Danh_Gia_Xep_Loai, Gui_Nhan_Xet, Luu_Nhan_Xet, TrangThai_DaDanhGia } from "../../common/TenVetXuLyConstants";
import { IPhuLucItemTTDVChamDiem } from "../components/TTDVChamDiemDetailModal/TTDVDanhGiaDetailModal";
import { IPhuLucItem } from "../../TuChamDiem/ToanBo/components/TuChamDiemDetailModal/DanhGiaDetailModal";
import { DoiTuong_Pho, DoiTuong_Truong, PhanLoai_A, PhanLoai_B, PhanLoai_C, PhanLoai_D } from "../../common/DanhGiaCommon";

const TTDVChamDiemContext = createContext<ITTDVChamDiemContext | null>(null)

export interface ITTDVChamDiemContext {
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
    userDanhGia: DanhSachTruongDonViDto | undefined;
    setUserDanhGia: React.Dispatch<React.SetStateAction<DanhSachTruongDonViDto | undefined>>;

    nextNode: INguoiXuLyTiep | undefined;
    setNextNode: React.Dispatch<React.SetStateAction<INguoiXuLyTiep | undefined>>;

    diemTuDanhGiaTotal: number;
    setDiemTuDanhGiaTotal: React.Dispatch<React.SetStateAction<number>>;

    handlerValidate: (form: any) => void;
    handlerSaveAndSendDanhGia: (form: any, currNode: IBuocHienTaiRes, handlerCancel: () => void) => void;

    PhanLoaiTuChamDiemHandler: (phuLucDatas: IPhuLucItemTTDVChamDiem[], totalPoint: number) => string | undefined
    PhanLoaiLanhDaoDanhGiaHandler: (phuLucDatas: IPhuLucItemTTDVChamDiem[], totalPoint: number) => string | undefined

}

export const useTTDVChamDiemContext = () => {
    const context = useContext(TTDVChamDiemContext)
    if (!context)
        throw new Error("TTDVChamDiemContext must be used inside TTDVChamDiemContext.Provider")
    return context
}

export const TTDVChamDiemProvider = ({ children }: IWithChildren) => {
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
    const [userDanhGia, setUserDanhGia] = useState<DanhSachTruongDonViDto>()
    const [nextNode, setNextNode] = useState<INguoiXuLyTiep>()

    const buttonActionContext = useButtonActionContext()

    const handlerValidate = async (form: any) => {

        if (!userDanhGia) {
            return false
        }

        if (!phuLucDatas) {
            toast.error("Không có dữ liệu")
            return false
        }
        let checkAll: boolean = true
        phuLucDatas.forEach((element: IPhuLucItemTTDVChamDiem) => {
            let validateFields: boolean = true

            if (!element.totalPointTuDG || !element.totalPointDG)
                validateFields = false
            MapForCheck(element.content.DanhSachTieuChiCon as any)
            function MapForCheck(data: IDanhGiaColumn[]) {
                data.map(item => {
                    if (item.isGiaiTrinhDG) {
                        if (((item.DiemThuong && !item.DiemTru) || (item.DiemTru && !item.DiemThuong)) && ((item.DiemDanhGia != null && item.DiemDanhGia != 0) || (item.DiemTuCham != null && item.DiemTuCham != 0))) {
                            const validate = item.NoiDungGiaiTrinhDG ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err isGiaiTrinhDG: ((item.DiemThuong && !item.DiemTru) || (item.DiemTru && !item.DiemThuong)) && item.DiemDanhGia && item.DiemDanhGia != 0`, item)
                            }
                        }
                        if ((item.DuocChamNhieuLan) && ((item.DiemDanhGia != null && item.DiemDanhGia != 0) || (item.DiemTuCham != null && item.DiemTuCham != 0))) {
                            const validate = item.NoiDungGiaiTrinhDG ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err isGiaiTrinhDG: (item.DuocChamNhieuLan) && item.DiemDanhGia && item.DiemDanhGia != 0`, item)
                            }
                        }
                        if (!item.DiemThuong && !item.DiemTru && ((item.DiemDanhGia != null && item.DiemDanhGia != item.ThangDiem) || (item.DiemTuCham != null && item.DiemTuCham != item.ThangDiem))) {
                            const validate = item.NoiDungGiaiTrinhDG ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err isGiaiTrinhDG: !item.DiemThuong && !item.DiemTru && item.DiemDanhGia && item.DiemDanhGia != item.ThangDiem`, item)
                            }
                        }
                    } else if (!item.DiemLiet) {
                        if (!item.DiemThuong && !item.DiemTru && !(item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0)) {
                            const validate1 = item.DiemTuCham != null && item.DiemTuCham == Number(item.ThangDiem) ? true : false
                            const validate2 = item.DiemDanhGia != null && item.DiemDanhGia == Number(item.ThangDiem) ? true : false
                            if (!validate1) {
                                validateFields = false
                                console.log(`Err DiemTuCham normal: !item.DiemThuong && !item.DiemTru && !(item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0`, item)
                            }
                            if (!validate2) {
                                validateFields = false
                                console.log(`Err DiemDanhGia normal: !item.DiemThuong && !item.DiemTru && !(item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0`, item)
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


    const handlerSubmitPhieu = async (form: any, currNode: IBuocHienTaiRes, handlerCancel: () => void) => {
        buttonActionContext.setLoading(true)
        if (!currNode) {
            toast.error("Không có thông tin bước đánh giá cuối")
            return
        }
        const funcCheck = await handlerValidate(form)

        if (!funcCheck) {
            buttonActionContext.setLoading(false)
            return
        }

        const formData = await form.validateFields()

        const chiTietDiemTuDanhGiaRequest: number[] = []
        const chiTietDiemDanhGiaRequest: number[] = []

        const tenMauPhieuDanhGiaRequest: string[] = []
        const maMauPhieuDanhGiaRequest: string[] = []
        phuLucDatas?.forEach((ele: IPhuLucItemTTDVChamDiem) => {
            if (ele.totalPointTuDG)
                chiTietDiemTuDanhGiaRequest.push(ele.totalPointTuDG)
            if (ele.totalPointDG)
                chiTietDiemDanhGiaRequest.push(ele.totalPointDG)
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
                tenThaoTacVetXuLy: Gui_Danh_Gia_Xep_Loai + " thủ trưởng đơn vị",
                trangThai: TrangThai_DaDanhGia,
                truongDonVi: 1,
                buocTruocId: currNode.id,
                buocHienTaiId: currNode.id,
                nguoiDangXuLyId: null,
                laNguoiDaXuLy: null,
                maBoTieuChuan: boTieuChuanId,
                tenBoTieuChuan: boTieuChuanId && boTieuChuans && boTieuChuans.length > 0
                    ? boTieuChuans.filter(x => x.maBoTieuChi == boTieuChuanId)[0].tenBoTieuChi : '',
                loaiDanhGia: "Cá nhân",
                maMauPhieuDanhGia: maMauPhieuDanhGiaRequest.join('#') || "",
                tenMauPhieuDanhGia: tenMauPhieuDanhGiaRequest.join('#') || "",
                chiTietDiemDanhGia: chiTietDiemDanhGiaRequest.join('#') || "",

                phanLoaiTuDanhGia: formData.phanLoaiTuDanhGia,
                phanLoaiDanhGia: formData.phanLoaiLanhDaoDanhGia,
                phanLoaiLanhDaoDanhGia: formData.phanLoaiLanhDaoDanhGia,

                diemTuDanhGia: formData.diemTuDanhGia,
                diemDanhGia: formData.diemLanhDaoDanhGia,
                diemLanhDaoDanhGia: formData.diemLanhDaoDanhGia,

                yKienTuDanhGia: formData.yKienTuDanhGia,
                yKienDanhGia: formData.yKienLanhDao,
                yKienLanhDao: formData.yKienLanhDao,

                nguoiTuDanhGia: userDanhGia?.fullName,
                nguoiTuDanhGiaId: userDanhGia?.maNguoiDung,

                nguoiDanhGia: userDanhGia?.fullName,
                nguoiDanhGiaId: userDanhGia?.maNguoiDung,

                thoiGianQuery: thoiGianQueryReq,

                hoVaTen: userDanhGia?.fullName,
                taiKhoan: userDanhGia?.userName,
                maNguoiDung: userDanhGia?.maNguoiDung,
                chucVu: userDanhGia?.chucVu?.ten,
                chucDanh: userDanhGia?.chucDanh?.ten,
                maPhongBan: userDanhGia?.groupCode,
                tenPhongBan: userDanhGia?.groupName,
                tenDonVi: userDanhGia?.officeName,
                maDonVi: userDanhGia?.officeCode,
                thoiGianTao: CURRENTTIME_ISOSTRING,
                thoiGianDanhGia: CURRENTTIME_ISOSTRING,
                suDung: true,
                maDonViCha: userDanhGia?.maDonViCha,
                khongDanhGia: userDanhGia?.khongDanhGia,
                kiemNhiem: formData.kiemNhiem,
                noiDungKiemNhiem: formData.noiDungKiemNhiem || userDanhGia?.noiDungKiemNhiem,
                phone: userDanhGia?.phone,
                email: userDanhGia?.email,
                thuTu: userDanhGia?.thuTu,
                danhSachPhanLoaiDanhGia: JSON.stringify(phanLoaiDanhGiaArr),
                isKySoCaNhan: false,
                isKySoLanhDao: false,
                maDonViFull: userDanhGia?.maDonViFull
            })

            if (resCreate.data.succeeded && resCreate.data.data) {

                const chiTietDanhGiaArr: IChiTietDanhGia[] = []
                phuLucDatas?.map((item: IPhuLucItemTTDVChamDiem, index) => {
                    if (item) {
                        chiTietDanhGiaArr.push({
                            id: item.key,
                            tenMauPhieu: item.label,
                            maMauPhieu: item.key,
                            maPhieu: resCreate.data.data,
                            chiTietDiemTuDanhGia: `${item.normalPointTuDG ?? 0}#${item.bonusPointTuDG ?? 0}#${item.penaltyPointTuDG ?? 0}`,
                            chiTietDiemDanhGia: `${item.normalPointDG ?? 0}#${item.bonusPointDG ?? 0}#${item.penaltyPointDG ?? 0}`,
                            chiTietDiemLanhDaoDanhGia: `${item.normalPointDG ?? 0}#${item.bonusPointDG ?? 0}#${item.penaltyPointDG ?? 0}`,
                            dataTuDanhGia: JSON.stringify(item.content),
                            dataLanhDaoDanhGia: JSON.stringify(item.content),
                            diemTuDanhGia: item.totalPointTuDG,
                            diemDanhGia: item.totalPointDG,
                            diemLanhDaoDanhGia: item.totalPointDG,
                            thuTu: index + 1,
                            scorePoint: item.scorePoint,
                            hasDiemLietTuDanhGia: item.hasDiemLietTuDG,
                            hasDiemLietLanhDaoDanhGia: item.hasDiemLietDG

                        })
                    }
                })
                if (chiTietDanhGiaArr && chiTietDanhGiaArr.length > 0) {
                    const resCreateChiTietArr = await chiTietDanhGiaServiceApi.AddListChiTietDanhGia(chiTietDanhGiaArr)

                    if (resCreateChiTietArr.data.succeeded) {
                        toast.success("Đánh giá thành công")
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

    const handlerSaveAndSendDanhGia = async (form: any, currNode: IBuocHienTaiRes, handlerCancel: () => void) => {
        buttonActionContext.setLoading(true)

        await handlerSubmitPhieu(form, currNode, handlerCancel)

        buttonActionContext.setLoading(false)
    }


    const PhanLoaiTuChamDiemHandler = (phuLucDatas: IPhuLucItemTTDVChamDiem[], totalPoint: number) => {
        if (!(phuLucDatas && phuLucDatas.length > 0))
            return undefined

        let doiTuongChamDiem: string = ''

        const datas: IPhanLoaiChamDiemHandler[] = []

        phuLucDatas.forEach(item => {

            doiTuongChamDiem = item.label.includes("Lãnh đạo cấp trưởng") ? DoiTuong_Truong :
                item.label.includes("Lãnh đạo cấp phó") ? DoiTuong_Pho : 'Công chức bình thường'

            datas.push({
                doiTuongChamDiem: doiTuongChamDiem,
                totalPoint: item.totalPointTuDG,
                diemDat: parseInt(item.scorePoint.split('#')[0]),
                isPhieuLanhDao: item.label.includes("Lãnh đạo cấp trưởng") || item.label.includes("Lãnh đạo cấp phó") ? true : false,
                isPhieuChuyenMon: !item.label.includes("Phụ lục 01") && !item.label.includes("Phụ lục 02") ? true : false
            })

        })

        if (doiTuongChamDiem == DoiTuong_Truong) {
            if (totalPoint >= 430 && datas.filter(x => x.isPhieuLanhDao && x.totalPoint >= 60).length > 0 && datas.filter(x => x.totalPoint < x.diemDat).length == 0)
                return PhanLoai_A
            else if (totalPoint > 360 && totalPoint < 430 && datas.filter(x => x.totalPoint < x.diemDat * 0.8).length == 0)
                return PhanLoai_B
            else if (totalPoint == 360 && datas.filter(x => x.totalPoint < x.diemDat * 0.5).length == 0)
                return PhanLoai_C
            else return PhanLoai_D
        } else if (doiTuongChamDiem == DoiTuong_Pho) {
            if (totalPoint >= 400 && datas.filter(x => x.isPhieuLanhDao && x.totalPoint >= 30).length > 0 && datas.filter(x => x.totalPoint < x.diemDat).length == 0)
                return PhanLoai_A
            else if (totalPoint > 340 && totalPoint < 400 && datas.filter(x => x.totalPoint < x.diemDat * 0.8).length == 0)
                return PhanLoai_B
            else if (totalPoint == 340 && datas.filter(x => x.totalPoint < x.diemDat * 0.5).length == 0)
                return PhanLoai_C
            else return PhanLoai_D
        } else {
            // Phiếu chuyên môn có nhiều phiếu nên so sách ngược
            if (totalPoint >= 350 && datas.filter(x => x.isPhieuChuyenMon && x.totalPoint <= 220).length == 0 && datas.filter(x => x.totalPoint < x.diemDat).length == 0)
                return PhanLoai_A
            else if (totalPoint > 300 && totalPoint < 350 && datas.filter(x => x.totalPoint < x.diemDat * 0.8).length == 0)
                return PhanLoai_B
            else if (totalPoint == 300 && datas.filter(x => x.totalPoint < x.diemDat * 0.5).length == 0)
                return PhanLoai_C
            else return PhanLoai_D
        }

    }

    const PhanLoaiLanhDaoDanhGiaHandler = (phuLucDatas: IPhuLucItemTTDVChamDiem[], totalPoint: number) => {
        if (!(phuLucDatas && phuLucDatas.length > 0))
            return undefined

        let doiTuongChamDiem: string = ''

        const datas: IPhanLoaiChamDiemHandler[] = []

        phuLucDatas.forEach(item => {

            doiTuongChamDiem = item.label.includes("Lãnh đạo cấp trưởng") ? DoiTuong_Truong :
                item.label.includes("Lãnh đạo cấp phó") ? DoiTuong_Pho : 'Công chức bình thường'

            datas.push({
                doiTuongChamDiem: doiTuongChamDiem,
                totalPoint: item.totalPointDG,
                diemDat: parseInt(item.scorePoint.split('#')[0]),
                isPhieuLanhDao: item.label.includes("Lãnh đạo cấp trưởng") || item.label.includes("Lãnh đạo cấp phó") ? true : false,
                isPhieuChuyenMon: !item.label.includes("Phụ lục 01") && !item.label.includes("Phụ lục 02") ? true : false
            })
        })

        if (doiTuongChamDiem == DoiTuong_Truong) {
            if (totalPoint >= 430 && datas.filter(x => x.isPhieuLanhDao && x.totalPoint >= 60).length > 0 && datas.filter(x => x.totalPoint < x.diemDat).length == 0)
                return PhanLoai_A
            else if (totalPoint > 360 && totalPoint < 430 && datas.filter(x => x.totalPoint < x.diemDat * 0.8).length == 0)
                return PhanLoai_B
            else if (totalPoint == 360 && datas.filter(x => x.totalPoint < x.diemDat * 0.5).length == 0)
                return PhanLoai_C
            else return PhanLoai_D
        } else if (doiTuongChamDiem == DoiTuong_Pho) {
            if (totalPoint >= 400 && datas.filter(x => x.isPhieuLanhDao && x.totalPoint >= 30).length > 0 && datas.filter(x => x.totalPoint < x.diemDat).length == 0)
                return PhanLoai_A
            else if (totalPoint > 340 && totalPoint < 400 && datas.filter(x => x.totalPoint < x.diemDat * 0.8).length == 0)
                return PhanLoai_B
            else if (totalPoint == 340 && datas.filter(x => x.totalPoint < x.diemDat * 0.5).length == 0)
                return PhanLoai_C
            else return PhanLoai_D
        } else {
            // Phiếu chuyên môn có nhiều phiếu nên so sách ngược
            if (totalPoint >= 350 && datas.filter(x => x.isPhieuChuyenMon && x.totalPoint <= 220).length == 0 && datas.filter(x => x.totalPoint < x.diemDat).length == 0)
                return PhanLoai_A
            else if (totalPoint > 300 && totalPoint < 350 && datas.filter(x => x.totalPoint < x.diemDat * 0.8).length == 0)
                return PhanLoai_B
            else if (totalPoint == 300 && datas.filter(x => x.totalPoint < x.diemDat * 0.5).length == 0)
                return PhanLoai_C
            else return PhanLoai_D
        }

    }

    interface IPhanLoaiChamDiemHandler {
        doiTuongChamDiem?: string,
        totalPoint: number,
        diemDat: number,
        isPhieuLanhDao: boolean
        isPhieuChuyenMon: boolean
    }



    return <TTDVChamDiemContext.Provider value={{
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
        handlerSaveAndSendDanhGia,
        PhanLoaiTuChamDiemHandler, PhanLoaiLanhDaoDanhGiaHandler,
    }}>
        {children}
    </TTDVChamDiemContext.Provider>
}