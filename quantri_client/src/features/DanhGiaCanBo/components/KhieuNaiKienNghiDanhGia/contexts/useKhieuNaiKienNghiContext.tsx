import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { IChiTietDanhGia, IDanhGiaCanBo, IUserDanhGia } from "../../common/models";
import { IDanhGia, IDanhGiaColumn, IPhanLoaiDanhGia, ITieuChiCouple } from "../../common/models/phieuDanhGia";
import { IDanhGia_KhieuNai, IKhieuNaiDanhGia } from "../model";
import { IDanhMuc_BoTieuChuan } from "@/features/danhmuc_dgcb/danhmuc_botieuchuan/models";
import { toast } from "react-toastify";
import { KhieuNaiDanhGiaServiceApi } from "../services";
import { useAppSelector } from "@/lib/redux/Hooks";
import { IPhuLucItem } from "../../TuChamDiem/ToanBo/components/TuChamDiemDetailModal/DanhGiaDetailModal";
import { chiTietDanhGiaServiceApi } from "../../common/service/ChiTietDanhGiaService";
import { useButtonActionContext } from "../../common/contexts/useButtonActionContext";
import { danhGiaCanBoServiceApi } from "../../common/service/DanhGiaService";
import { CURRENTTIME, CURRENTTIME_ISOSTRING } from "@/data";

const KhieuNaiDanhGiaContext = createContext<IKhieuNaiDanhGiaContext | null>(null);

export interface IKhieuNaiDanhGiaContext {
    khieuNaiId: string | undefined;
    setKhieuNaiId: React.Dispatch<React.SetStateAction<string | undefined>>;

    trangThaiKhieuNai: string | undefined;
    setTrangThaiKhieuNai: React.Dispatch<React.SetStateAction<string | undefined>>;

    selectedKhieuNais: React.Key[];
    setSelectedKhieuNais: React.Dispatch<React.SetStateAction<React.Key[]>>;


    hasKetQuaKhieuNai: boolean;
    setHasKetQuaKhieuNai: React.Dispatch<React.SetStateAction<boolean>>;

    boTieuChuans: IDanhMuc_BoTieuChuan[] | undefined
    setBoTieuChuans: React.Dispatch<React.SetStateAction<IDanhMuc_BoTieuChuan[] | undefined>>;

    phuLucDatas: [] | undefined
    setPhuLucDatas: React.Dispatch<React.SetStateAction<[] | undefined>>;


    changeDanhGia: boolean;
    setChangeDanhGia: React.Dispatch<React.SetStateAction<boolean>>; // Chưa được sử dụng

    kiemNhiem: boolean;
    setKiemNhiem: React.Dispatch<React.SetStateAction<boolean>>;

    thongTinPhieuChamDiem: IDanhGiaCanBo | undefined
    setThongTinPhieuChamDiem: React.Dispatch<React.SetStateAction<IDanhGiaCanBo | undefined>>;

    phanLoaiDanhGiaArr: IPhanLoaiDanhGia[] | undefined;
    setPhanLoaiDanhGiaArr: React.Dispatch<React.SetStateAction<IPhanLoaiDanhGia[] | undefined>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    reload: boolean;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;

    xuLyKhieuNaiModalVisible: boolean;
    setXuLyKhieuNaiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    danhGiaModalVisible: boolean;
    setDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    sendKhieuNaiModalVisible: boolean;
    setSendKhieuNaiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    danhGia: IDanhGia_KhieuNai | undefined;
    setDanhGia: React.Dispatch<React.SetStateAction<IDanhGia_KhieuNai | undefined>>;

    userDanhGia: IUserDanhGia | undefined;
    setUserDanhGia: React.Dispatch<React.SetStateAction<IUserDanhGia | undefined>>;

    opposeArr: ITieuChiCouple[] | undefined;
    setOpposeArr: React.Dispatch<React.SetStateAction<ITieuChiCouple[] | undefined>>;
    diemLietArr: ITieuChiCouple[] | undefined;
    setDiemLietArr: React.Dispatch<React.SetStateAction<ITieuChiCouple[] | undefined>>;

    handlerSaveKhieuNai: (formData: IKhieuNaiDanhGia, handlerCancel: () => void) => void;
    handlerSaveXuLyKhieuNai: (formData: IKhieuNaiDanhGia, handlerCancel: () => void, ketThucXuLy: boolean) => void;

}


export const useKhieuNaiDanhGiaContext = () => {
    const context = useContext(KhieuNaiDanhGiaContext);
    if (!context)
        throw new Error(
            "KhieuNaiDanhGiaContext must be used inside KhieuNaiDanhGiaContext.Provider"
        );
    return context;
};
export const KhieuNaiDanhGiaProvider = ({ children }: IWithChildren) => {
    const [khieuNaiId, setKhieuNaiId] = useState<string>()
    const [trangThaiKhieuNai, setTrangThaiKhieuNai] = useState<string>()
    const [selectedKhieuNais, setSelectedKhieuNais] = useState<React.Key[]>([]);
    const [boTieuChuans, setBoTieuChuans] = useState<IDanhMuc_BoTieuChuan[]>();
    const [phuLucDatas, setPhuLucDatas] = useState<[]>();
    const [changeDanhGia, setChangeDanhGia] = useState<boolean>(false)
    const [kiemNhiem, setKiemNhiem] = useState<boolean>(false)
    const [thongTinPhieuChamDiem, setThongTinPhieuChamDiem] = useState<IDanhGiaCanBo>()
    const [loading, setLoading] = useState<boolean>(false)
    const [reload, setReload] = useState<boolean>(false)
    const [xuLyKhieuNaiModalVisible, setXuLyKhieuNaiModalVisible] = useState<boolean>(false)
    const [danhGiaModalVisible, setDanhGiaModalVisible] = useState<boolean>(false)
    const [sendKhieuNaiModalVisible, setSendKhieuNaiModalVisible] = useState<boolean>(false)
    const [hasKetQuaKhieuNai, setHasKetQuaKhieuNai] = useState<boolean>(false)
    const [danhGia, setDanhGia] = useState<IDanhGia_KhieuNai>()
    const [userDanhGia, setUserDanhGia] = useState<IUserDanhGia>()
    const [phanLoaiDanhGiaArr, setPhanLoaiDanhGiaArr] = useState<IPhanLoaiDanhGia[]>()
    const [opposeArr, setOpposeArr] = useState<ITieuChiCouple[]>()
    const [diemLietArr, setDiemLietArr] = useState<ITieuChiCouple[]>()

    const { parseToken } = useAppSelector((state) => state.auth);
    const buttonActionContext = useButtonActionContext()


    const handlerSaveKhieuNai = async (formData: IKhieuNaiDanhGia, handlerCancel: () => void) => {
        setLoading(true)
        let totalKhieuNai: number = 0
        const chiTietDanhGiaArr: IChiTietDanhGia[] = []
        phuLucDatas?.map((item: IPhuLucItem, index) => {
            if (item) {
                if (item.totalKhieuNai) {
                    totalKhieuNai = totalKhieuNai + item.totalKhieuNai
                }
                chiTietDanhGiaArr.push({
                    id: item.key,
                    dataKhieuNai: JSON.stringify(item.content),//
                    soLuongKhieuNai: item.totalKhieuNai
                })
            }
        })

        if (totalKhieuNai == 0) {
            toast.error("Chưa có tiêu chí nào được kiến nghị")
            setLoading(false)
            return
        }

        if (chiTietDanhGiaArr && chiTietDanhGiaArr.length > 0) {
            const resUpdateChiTietArr = await chiTietDanhGiaServiceApi.UpdateListChiTietDanhGia(chiTietDanhGiaArr)

            if (!resUpdateChiTietArr.data.succeeded) {
                toast.error(resUpdateChiTietArr.data.message)
                return
            }
        }

        if (!khieuNaiId) {
            const resCreate = await KhieuNaiDanhGiaServiceApi.Create({
                ...formData,
                trangThai: 'Chờ gửi',
                maPhieu: thongTinPhieuChamDiem?.id,
                maDonVi: parseToken?.officeCode,
                maDonViCha: parseToken?.maDonViCha,
                soLuongKhieuNai: totalKhieuNai
            })

            if (resCreate.data.succeeded) {
                toast.success("Thêm mới kiến nghị thành công")
                handlerCancel()
                setReload(!reload)
            } else {
                toast.error("Thêm mới thất bại")
            }
        } else if (khieuNaiId) {
            const resUpdate = await KhieuNaiDanhGiaServiceApi.Update({
                id: khieuNaiId,
                data: {
                    ...formData,
                    trangThai: 'Chờ gửi',
                    soLuongKhieuNai: totalKhieuNai
                }
            })
            if (resUpdate.data.succeeded) {
                toast.success("Cập nhật kiến nghị thành công")
                handlerCancel()
                setReload(!reload)
            } else {
                toast.error("Cập nhật thất bại")
            }
        }

        setLoading(false)

    }

    const handlerSaveXuLyKhieuNai = async (formData: IKhieuNaiDanhGia, handlerCancel: () => void, ketThucXuLy: boolean) => {
        setLoading(true)

        if (ketThucXuLy) {
            const validate = handlerValidateXuLyKhieuNai()

            if (validate == false) {
                console.log('validate: false')
                setLoading(false)
                return
            }
        }

        let resetUrlPhieu: boolean = false

        const chiTietDanhGiaArr: IChiTietDanhGia[] = []
        phuLucDatas?.map((item: IPhuLucItem, index) => {
            if (item) {
                chiTietDanhGiaArr.push({
                    id: item.key,
                    dataXuLyKhieuNai: JSON.stringify(item.content),
                    chiTietDiemLanhDaoDanhGia: `${item.normalPoint ?? 0}#${item.bonusPoint ?? 0}#${item.penaltyPoint ?? 0}`,
                    chiTietDiemDanhGia: `${item.normalPoint ?? 0}#${item.bonusPoint ?? 0}#${item.penaltyPoint ?? 0}`,
                    diemDanhGia: item.totalPoint,
                    diemLanhDaoDanhGia: item.totalPoint,
                    thuTu: index + 1,
                    hasDiemLietLanhDaoDanhGia: item.hasDiemLiet

                })
            }
        })
        if (chiTietDanhGiaArr && chiTietDanhGiaArr.length > 0) {
            const resUpdateChiTietArr = await chiTietDanhGiaServiceApi.UpdateListChiTietDanhGia(chiTietDanhGiaArr)

            if (!resUpdateChiTietArr.data.succeeded) {
                toast.error(resUpdateChiTietArr.data.message)
                return
            }
        }

        const resUpdateKhieuNai = await KhieuNaiDanhGiaServiceApi.Update({
            id: khieuNaiId,
            data: {
                ...formData,
                trangThai: ketThucXuLy ? 'Đã xử lý' : undefined,
                thoiGianCapNhat: CURRENTTIME_ISOSTRING,
                nguoiCapNhatKQId: parseToken?.userGroupId
            }
        })

        const resUpdateDanhGia = await danhGiaCanBoServiceApi.UpdateDanhGiaWithoutBuocId({
            id: thongTinPhieuChamDiem?.id,
            data: {
                ...formData,
                phanLoaiDanhGia: formData.phanLoaiLanhDaoDanhGia,
                phanLoaiLanhDaoDanhGia: formData.phanLoaiLanhDaoDanhGia,
                diemDanhGia: formData.diemLanhDaoDanhGia,
                diemLanhDaoDanhGia: formData.diemLanhDaoDanhGia,
                yKienDanhGia: formData.yKienLanhDao,
                yKienLanhDao: formData.yKienLanhDao,
                isKySoCaNhan: thongTinPhieuChamDiem?.diemTuDanhGia && ketThucXuLy ? false : undefined,
                isKySoNhanXet: thongTinPhieuChamDiem?.diemNhanXet && ketThucXuLy ? false : undefined,
                isKySoThamMuu: thongTinPhieuChamDiem?.diemThamMuu && ketThucXuLy ? false : undefined,
                isKySoLanhDao: thongTinPhieuChamDiem?.diemLanhDaoDanhGia && ketThucXuLy ? false : undefined,
                // resetUrlPhieu: ketThucXuLy ? true : undefined
            }
        })



        if (resUpdateKhieuNai.data.succeeded && resUpdateDanhGia.data.succeeded) {
            toast.success(ketThucXuLy ? "Xử lý kiến nghị thành công" : "Lưu xử lý kiến nghị thành công")
            handlerCancel()
            setReload(!reload)
        } else {
            toast.error("Thao tác thất bại")
        }

        setLoading(false)

    }

    const handlerValidateXuLyKhieuNai = () => {
        if (!thongTinPhieuChamDiem) {
            toast.error("Không có thông tin phiếu đánh giá")
            return
        }

        if (!phuLucDatas) {
            toast.error("Không có dữ liệu phiếu đánh giá")
            return false
        }
        let checkAll: boolean = true
        phuLucDatas.forEach((element: IPhuLucItem) => {
            let validateFields: boolean = true
            let validateFieldXuLy: boolean = true
            let validateFieldTuChoi: boolean = true

            if (!element.totalPoint) {
                toast.error("Không có thông tin tổng điểm")
                checkAll = false
                return
            }

            MapForCheck(element.content.DanhSachTieuChiCon as any)
            function MapForCheck(data: IDanhGiaColumn[]) {
                data.map(item => {
                    if (item.NoiDungKhieuNai) {
                        if (item.isXuLyKhieuNai == null) {
                            validateFields = false
                        } else if (item.isXuLyKhieuNai == true) {
                            if (!item.DiemLiet && item.DiemDanhGia == item.DiemDanhGiaPrev) {
                                validateFieldXuLy = false
                            } else if (item.DiemLiet && item.isCheckedDG == item.isCheckedDGPrev) {
                                validateFieldXuLy = false
                            }
                        } else if (item.isXuLyKhieuNai == false) {
                            if (!item.NoiDungXuLyKhieuNai)
                                validateFieldTuChoi = false
                        }

                        if (!item.NoiDungXuLyKhieuNai) {
                            return
                        }
                    }

                    if (item.DanhSachTieuChiCon && item.DanhSachTieuChiCon.length > 0)
                        MapForCheck(item.DanhSachTieuChiCon)
                })
            }

            if (!validateFields) {
                checkAll = false
                toast.error(`"${element.label}" hoàn thiện việc giải quyết/không chấp nhận kiến nghị`)
            }
            if (!validateFieldXuLy) {
                checkAll = false
                toast.error(`"${element.label}" chưa xử lý thay đổi điểm đánh giá, xếp loại`)
            }
            if (!validateFieldTuChoi) {
                checkAll = false
                toast.error(`"${element.label}" chưa nhập đầy đủ lý do không chấp nhận kiến nghị`)
            }

        })
        if (checkAll)
            return true
        else return false
    }

    return (
        <KhieuNaiDanhGiaContext.Provider
            value={{
                khieuNaiId, setKhieuNaiId,
                trangThaiKhieuNai, setTrangThaiKhieuNai,
                selectedKhieuNais, setSelectedKhieuNais,
                boTieuChuans, setBoTieuChuans,
                phuLucDatas, setPhuLucDatas,
                changeDanhGia, setChangeDanhGia,
                kiemNhiem, setKiemNhiem,
                thongTinPhieuChamDiem, setThongTinPhieuChamDiem,
                loading, setLoading,
                reload, setReload,
                xuLyKhieuNaiModalVisible, setXuLyKhieuNaiModalVisible,
                danhGiaModalVisible, setDanhGiaModalVisible,
                sendKhieuNaiModalVisible, setSendKhieuNaiModalVisible,
                danhGia, setDanhGia,
                userDanhGia, setUserDanhGia,
                phanLoaiDanhGiaArr, setPhanLoaiDanhGiaArr,
                handlerSaveKhieuNai, handlerSaveXuLyKhieuNai,
                opposeArr, setOpposeArr,
                diemLietArr, setDiemLietArr,
                hasKetQuaKhieuNai, setHasKetQuaKhieuNai,
            }}
        >
            {children}
        </KhieuNaiDanhGiaContext.Provider>
    );
};
