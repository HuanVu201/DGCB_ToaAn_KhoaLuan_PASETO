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
import { Gui_Danh_Gia_Xep_Loai, Luu_Danh_Gia_Xep_Loai, TrangThai_DaDanhGia } from "@/features/DanhGiaCanBo/components/common/TenVetXuLyConstants";

const LanhDaoDanhGiaChamDiemContext = createContext<ILanhDaoDanhGiaChamDiemContext | null>(null)

export interface ILanhDaoDanhGiaChamDiemContext {
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

    diemTuDanhGiaTotal: number;
    setDiemTuDanhGiaTotal: React.Dispatch<React.SetStateAction<number>>;

    handlerValidate: (form: any) => void;
    handlerSaveDanhGia: (form: any, handlerCancel: () => void) => void;
    handlerSaveAndSendDanhGia: (form: any, handlerCancel: () => void) => void;
}

export const useLanhDaoDanhGiaChamDiemContext = () => {
    const context = useContext(LanhDaoDanhGiaChamDiemContext)
    if (!context)
        throw new Error("LanhDaoDanhGiaChamDiemContext must be used inside LanhDaoDanhGiaChamDiemContext.Provider")
    return context
}

export const LanhDaoDanhGiaChamDiemProvider = ({ children }: IWithChildren) => {
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
        phuLucDatas.forEach((element: IPhuLucItem) => {
            let validateFields: boolean = true

            if (!element.totalPoint)
                validateFields = false

            MapForCheck(element.content.DanhSachTieuChiCon as any)
            function MapForCheck(data: IDanhGiaColumn[]) {
                data.map(item => {
                    const diemSoSanh = item.DiemThamMuu != null ? item.DiemThamMuu : item.DiemNhanXet != null ? item.DiemNhanXet : item.DiemTuCham
                    if (item.isGiaiTrinhDG) {
                        if (((item.DiemThuong && !item.DiemTru) || (item.DiemTru && !item.DiemThuong)) && item.DiemDanhGia != null && item.DiemDanhGia != 0) {
                            const validate = item.NoiDungGiaiTrinhDG ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err DG isGiaiTrinh: ((item.DiemThuong && !item.DiemTru) || (item.DiemTru && !item.DiemThuong)) && item.DiemDanhGia && item.DiemDanhGia != 0`, item)
                            }
                        }
                        if ((item.DuocChamNhieuLan) && item.DiemDanhGia != null && item.DiemDanhGia != 0) {
                            const validate = item.NoiDungGiaiTrinhDG ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err DG isGiaiTrinh: (item.DuocChamNhieuLan) && item.DiemDanhGia && item.DiemDanhGia != 0`, item)
                            }
                        }
                        if (!item.DiemThuong && !item.DiemTru && item.DiemDanhGia != null && item.DiemDanhGia != diemSoSanh) {
                            const validate = item.NoiDungGiaiTrinhDG ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err DG isGiaiTrinh: !item.DiemThuong && !item.DiemTru && item.DiemDanhGia && item.DiemDanhGia != diemSoSanh`, item)
                            }
                        }
                    } else if (!item.DiemLiet) {
                        if (!item.DiemThuong && !item.DiemTru && !(item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0)) {
                            const validate = item.DiemDanhGia != null && item.DiemDanhGia == Number(diemSoSanh) ? true : false
                            if (!validate) {
                                validateFields = false
                                console.log(`Err DG normal: !item.DiemThuong && !item.DiemTru && !(item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0`, item)
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

        if (!thongTinPhieuChamDiem?.nguoiDangXuLyId) {
            console.log('!thongTinPhieuChamDiem?.nguoiDangXuLyId')
            toast.error("Không có thông tin người xử lý bước hiện tại")
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
                    tenThaoTacVetXuLy: nextStep ? Gui_Danh_Gia_Xep_Loai : Luu_Danh_Gia_Xep_Loai,
                    trangThai: nextStep ? TrangThai_DaDanhGia : thongTinPhieuChamDiem?.trangThai,
                    buocTruocId: nextStep ? thongTinPhieuChamDiem?.buocHienTaiId : thongTinPhieuChamDiem?.buocTruocId,
                    buocHienTaiId: nextStep ? thongTinPhieuChamDiem?.buocHienTaiId : thongTinPhieuChamDiem?.buocHienTaiId,
                    nguoiDangXuLyId: nextStep ? "Da ket thuc danh gia" : thongTinPhieuChamDiem?.nguoiDangXuLyId,
                    laNguoiDaXuLy: nextStep ? true : false,
                    phanLoaiDanhGia: formData.phanLoaiLanhDaoDanhGia,
                    phanLoaiLanhDaoDanhGia: formData.phanLoaiLanhDaoDanhGia,
                    diemDanhGia: formData.diemLanhDaoDanhGia,
                    diemLanhDaoDanhGia: formData.diemLanhDaoDanhGia,
                    yKienDanhGia: formData.yKienLanhDao,
                    yKienLanhDao: formData.yKienLanhDao,
                    thoiGianDanhGia: nextStep ? CURRENTTIME_ISOSTRING : undefined,
                    nguoiDanhGia: nextStep ? userDanhGia?.fullName : undefined,
                    nguoiDanhGiaId: nextStep ? userDanhGia?.maNguoiDung : undefined,
                    suDung: true,
                    isKySoLanhDao: nextStep ? false : undefined
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
                            chiTietDiemLanhDaoDanhGia: `${item.normalPoint ?? 0}#${item.bonusPoint ?? 0}#${item.penaltyPoint ?? 0}`,
                            chiTietDiemDanhGia: `${item.normalPoint ?? 0}#${item.bonusPoint ?? 0}#${item.penaltyPoint ?? 0}`,
                            dataLanhDaoDanhGia: JSON.stringify(item.content),
                            diemDanhGia: item.totalPoint,
                            diemLanhDaoDanhGia: item.totalPoint,
                            thuTu: index + 1,
                            hasDiemLietLanhDaoDanhGia: item.hasDiemLiet
                        })
                    }
                })
                if (chiTietDanhGiaArr && chiTietDanhGiaArr.length > 0) {
                    const resUpdateChiTietArr = await chiTietDanhGiaServiceApi.UpdateListChiTietDanhGia(chiTietDanhGiaArr)

                    if (resUpdateChiTietArr.data.succeeded) {
                        toast.success("Đánh giá, xếp loại thành công")
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


    return <LanhDaoDanhGiaChamDiemContext.Provider value={{
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
        handlerValidate,
        handlerSaveDanhGia,
        handlerSaveAndSendDanhGia,
    }}>
        {children}
    </LanhDaoDanhGiaChamDiemContext.Provider>
}