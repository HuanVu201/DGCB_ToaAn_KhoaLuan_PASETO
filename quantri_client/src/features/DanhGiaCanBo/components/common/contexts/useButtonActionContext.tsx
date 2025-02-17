import { IWithChildren } from "@/types";
import React, { createContext, useContext, useState } from "react";
import { IDanhGia, ILichSuDanhGiaSwapper } from "../models/phieuDanhGia";
import { ReadOnlyDanhGiaProvider } from "../components/ReadOnLyDanhGia/contexts/useReadOnlyDanhGiaContext";
import { XuLyPhieuProvider } from "./useXuLyPhieuContext";
import { toast } from "react-toastify";
import { DoiTuong_Pho, DoiTuong_Truong, PhanLoai_A, PhanLoai_B, PhanLoai_C, PhanLoai_D } from "../DanhGiaCommon";
import { IPhuLucItem } from "../../TuChamDiem/ToanBo/components/TuChamDiemDetailModal/DanhGiaDetailModal";

const ButtonActionContext = createContext<IButtonActionContext | null>(null);

export interface IButtonActionContext {
    danhGiaId: string | undefined;
    setDanhGiaId: React.Dispatch<React.SetStateAction<string | undefined>>;

    maPhieu: string | undefined;
    setMaPhieu: React.Dispatch<React.SetStateAction<string | undefined>>;

    selectedDanhGias: React.Key[];
    setSelectedDanhGias: React.Dispatch<React.SetStateAction<React.Key[]>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    vetXuLyDanhGiaModalVisible: boolean;
    setVetXuLyDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    traLaiChamDiemModalVisible: boolean;
    setTraLaiChamDiemModalVisible: React.Dispatch<React.SetStateAction<boolean>>;


    readOnlyDanhGiaModalVisible: boolean;
    setReadOnlyDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    danhGiaModalVisible: boolean;
    setDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    capNhatDanhGiaModalVisible: boolean;
    setCapNhatDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    thuTruongDonViChamDiemModalVisible: boolean;
    setThuTruongDonViChamDiemModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    lanhDaoTrucTiepChamDiemModalVisible: boolean;
    setLanhDaoTrucTiepChamDiemModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    lanhDaoThamMuuChamDiemModalVisible: boolean;
    setLanhDaoThamMuuChamDiemModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    lanhDaoDanhGiaChamDiemModalVisible: boolean;
    setLanhDaoDanhGiaChamDiemModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    thuHoiChamDiemModalVisible: boolean;
    setThuHoiChamDiemModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    duyetChamDiemModalVisible: boolean;
    setDuyetChamDiemModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    xoaChamDiemModalVisible: boolean;
    setXoaChamDiemModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    khoiPhucChamDiemModalVisible: boolean;
    setKhoiPhucChamDiemModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    tieuChiId: string | undefined
    setTieuChiId: React.Dispatch<React.SetStateAction<string | undefined>>;

    lichSuDanhGias: ILichSuDanhGiaSwapper[] | undefined
    setLichSuDanhGias: React.Dispatch<React.SetStateAction<ILichSuDanhGiaSwapper[] | undefined>>;

    lichSuDanhGiaModalVisible: boolean
    setLichSuDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    inDanhGiaCaNhanModalVisible: boolean;
    setInDanhGiaCaNhanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    inDanhGiaPhongBanDonViModalVisible: boolean;
    setInDanhGiaPhongBanDonViModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    themKhieuNaiDanhGiaModalVisible: boolean;
    setThemKhieuNaiDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    xuLyKhieuNaiDanhGiaModalVisible: boolean;
    setXuLyKhieuNaiDanhGiaModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    readOnlyKhieuNaiModalVisible: boolean; // readonly
    setReadOnlyKhieuNaiModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    ////////////////////////////////////////
    readOnlyDanhGiaDonViPhongBanModalVisible: boolean;
    setReadOnlyDanhGiaDonViPhongBanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    danhGiaDonViPhongBanModalVisible: boolean;
    setDanhGiaDonViPhongBanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    capNhatDanhGiaDonViPhongBanModalVisible: boolean;
    setCapNhatDanhGiaDonViPhongBanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    thamMuuDanhGiaDonViPhongBanModalVisible: boolean;
    setThamMuuDanhGiaDonViPhongBanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    danhGiaXepLoaiDonViPhongBanModalVisible: boolean;
    setDanhGiaXepLoaiDonViPhongBanModalVisible: React.Dispatch<React.SetStateAction<boolean>>;

    khieuNaiId: string | undefined;
    setKhieuNaiId: React.Dispatch<React.SetStateAction<string | undefined>>;

    trangThaiKhieuNai: string | undefined;
    setTrangThaiKhieuNai: React.Dispatch<React.SetStateAction<string | undefined>>;

    PhanLoaiChamDiemHandler: (phuLucDatas: IPhuLucItem[], totalPoint: number) => string | undefined

}


export const useButtonActionContext = () => {
    const context = useContext(ButtonActionContext);
    if (!context)
        throw new Error(
            "ButtonActionContext must be used inside ButtonActionContext.Provider"
        );
    return context;
};
export const ButtonActionProvider = ({ children }: IWithChildren) => {
    const [danhGiaId, setDanhGiaId] = useState<string>()
    const [maPhieu, setMaPhieu] = useState<string>()
    const [selectedDanhGias, setSelectedDanhGias] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [vetXuLyDanhGiaModalVisible, setVetXuLyDanhGiaModalVisible] = useState<boolean>(false)
    const [danhGiaModalVisible, setDanhGiaModalVisible] = useState<boolean>(false)
    const [capNhatDanhGiaModalVisible, setCapNhatDanhGiaModalVisible] = useState<boolean>(false)
    const [thuTruongDonViChamDiemModalVisible, setThuTruongDonViChamDiemModalVisible] = useState<boolean>(false)
    const [lanhDaoTrucTiepChamDiemModalVisible, setLanhDaoTrucTiepChamDiemModalVisible] = useState<boolean>(false)
    const [lanhDaoThamMuuChamDiemModalVisible, setLanhDaoThamMuuChamDiemModalVisible] = useState<boolean>(false)
    const [lanhDaoDanhGiaChamDiemModalVisible, setLanhDaoDanhGiaChamDiemModalVisible] = useState<boolean>(false)
    const [traLaiChamDiemModalVisible, setTraLaiChamDiemModalVisible] = useState<boolean>(false)
    const [thuHoiChamDiemModalVisible, setThuHoiChamDiemModalVisible] = useState<boolean>(false)
    const [duyetChamDiemModalVisible, setDuyetChamDiemModalVisible] = useState<boolean>(false)
    const [xoaChamDiemModalVisible, setXoaChamDiemModalVisible] = useState<boolean>(false)
    const [khoiPhucChamDiemModalVisible, setKhoiPhucChamDiemModalVisible] = useState<boolean>(false)
    const [readOnlyDanhGiaModalVisible, setReadOnlyDanhGiaModalVisible] = useState<boolean>(false)
    const [tieuChiId, setTieuChiId] = useState<string>()
    const [lichSuDanhGias, setLichSuDanhGias] = useState<ILichSuDanhGiaSwapper[]>()
    const [lichSuDanhGiaModalVisible, setLichSuDanhGiaModalVisible] = useState<boolean>(false)
    const [readOnlyDanhGiaDonViPhongBanModalVisible, setReadOnlyDanhGiaDonViPhongBanModalVisible] = useState<boolean>(false)
    const [danhGiaDonViPhongBanModalVisible, setDanhGiaDonViPhongBanModalVisible] = useState<boolean>(false)
    const [capNhatDanhGiaDonViPhongBanModalVisible, setCapNhatDanhGiaDonViPhongBanModalVisible] = useState<boolean>(false)
    const [inDanhGiaCaNhanModalVisible, setInDanhGiaCaNhanModalVisible] = useState<boolean>(false)
    const [inDanhGiaPhongBanDonViModalVisible, setInDanhGiaPhongBanDonViModalVisible] = useState<boolean>(false)
    const [themKhieuNaiDanhGiaModalVisible, setThemKhieuNaiDanhGiaModalVisible] = useState<boolean>(false)
    const [xuLyKhieuNaiDanhGiaModalVisible, setXuLyKhieuNaiDanhGiaModalVisible] = useState<boolean>(false)
    const [readOnlyKhieuNaiModalVisible, setReadOnlyKhieuNaiModalVisible] = useState<boolean>(false)

    const [thamMuuDanhGiaDonViPhongBanModalVisible, setThamMuuDanhGiaDonViPhongBanModalVisible] = useState<boolean>(false)
    const [danhGiaXepLoaiDonViPhongBanModalVisible, setDanhGiaXepLoaiDonViPhongBanModalVisible] = useState<boolean>(false)

    const [khieuNaiId, setKhieuNaiId] = useState<string>()
    const [trangThaiKhieuNai, setTrangThaiKhieuNai] = useState<string>()

    const PhanLoaiChamDiemHandler = (phuLucDatas: IPhuLucItem[], totalPoint: number) => {
        if (!(phuLucDatas && phuLucDatas.length > 0))
            return undefined

        let doiTuongChamDiem: string = 'Công chức bình thường'

        const datas: IPhanLoaiChamDiemHandler[] = []

        phuLucDatas.forEach(item => {
            console.log(item.label.includes("Lãnh đạo cấp trưởng"))
            doiTuongChamDiem = item.label.includes("Lãnh đạo cấp trưởng") ? DoiTuong_Truong :
                item.label.includes("Lãnh đạo cấp phó") ? DoiTuong_Pho : doiTuongChamDiem

            datas.push({
                doiTuongChamDiem: doiTuongChamDiem,
                totalPoint: item.totalPoint,
                diemDat: parseInt(item.scorePoint.split('#')[0]),
                isPhieuLanhDao: item.label.includes("Lãnh đạo cấp trưởng") || item.label.includes("Lãnh đạo cấp phó") ? true : false,
                isPhieuChuyenMon: !item.label.includes("Phụ lục 01") && !item.label.includes("Phụ lục 02") ? true : false
            })

        })
        console.log(doiTuongChamDiem)
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

    return (
        <ButtonActionContext.Provider
            value={{
                PhanLoaiChamDiemHandler,
                danhGiaId, setDanhGiaId,
                maPhieu, setMaPhieu,
                selectedDanhGias, setSelectedDanhGias,
                loading, setLoading,
                vetXuLyDanhGiaModalVisible, setVetXuLyDanhGiaModalVisible,
                danhGiaModalVisible, setDanhGiaModalVisible,
                capNhatDanhGiaModalVisible, setCapNhatDanhGiaModalVisible,
                thuTruongDonViChamDiemModalVisible, setThuTruongDonViChamDiemModalVisible,
                lanhDaoTrucTiepChamDiemModalVisible, setLanhDaoTrucTiepChamDiemModalVisible,
                lanhDaoThamMuuChamDiemModalVisible, setLanhDaoThamMuuChamDiemModalVisible,
                lanhDaoDanhGiaChamDiemModalVisible, setLanhDaoDanhGiaChamDiemModalVisible,
                thuHoiChamDiemModalVisible, setThuHoiChamDiemModalVisible,
                duyetChamDiemModalVisible, setDuyetChamDiemModalVisible,
                xoaChamDiemModalVisible, setXoaChamDiemModalVisible,
                khoiPhucChamDiemModalVisible, setKhoiPhucChamDiemModalVisible,
                traLaiChamDiemModalVisible, setTraLaiChamDiemModalVisible,
                readOnlyDanhGiaModalVisible, setReadOnlyDanhGiaModalVisible,
                tieuChiId, setTieuChiId,
                lichSuDanhGias, setLichSuDanhGias,
                lichSuDanhGiaModalVisible, setLichSuDanhGiaModalVisible,
                readOnlyDanhGiaDonViPhongBanModalVisible, setReadOnlyDanhGiaDonViPhongBanModalVisible,
                danhGiaDonViPhongBanModalVisible, setDanhGiaDonViPhongBanModalVisible,
                capNhatDanhGiaDonViPhongBanModalVisible, setCapNhatDanhGiaDonViPhongBanModalVisible,
                inDanhGiaCaNhanModalVisible, setInDanhGiaCaNhanModalVisible,
                inDanhGiaPhongBanDonViModalVisible, setInDanhGiaPhongBanDonViModalVisible,
                themKhieuNaiDanhGiaModalVisible, setThemKhieuNaiDanhGiaModalVisible,
                xuLyKhieuNaiDanhGiaModalVisible, setXuLyKhieuNaiDanhGiaModalVisible,
                thamMuuDanhGiaDonViPhongBanModalVisible, setThamMuuDanhGiaDonViPhongBanModalVisible,
                danhGiaXepLoaiDonViPhongBanModalVisible, setDanhGiaXepLoaiDonViPhongBanModalVisible,
                readOnlyKhieuNaiModalVisible, setReadOnlyKhieuNaiModalVisible,
                khieuNaiId, setKhieuNaiId,
                trangThaiKhieuNai, setTrangThaiKhieuNai,
            }}
        >
            <XuLyPhieuProvider>
                <ReadOnlyDanhGiaProvider>
                    {children}
                </ReadOnlyDanhGiaProvider>
            </XuLyPhieuProvider>
        </ButtonActionContext.Provider>
    );
};
