import { IBaseExt, IPaginationResponse, IOmitCreate, IOmitUpdate, IPickSearch, ICredential, IBasePagination, IResult, ISoftDelete } from "../models"
import { AxiosResponseWrapper } from '../lib/axios/typeHelper'
import { API_VERSION } from "../data/constant";
import axiosInstance from "../lib/axios";
import { DanhSachNguoiDung } from "@/features/nguoidungnhomnguoidung/components/DanhSachNguoiDungTable";
export namespace Service {
    export type IUpdateService<TObj> = IOmitUpdate<TObj> & { id: string }
    // weakly typed
    export interface ICrud<TObj extends IBaseExt> {
        Search(_params: IPickSearch<TObj>): AxiosResponseWrapper<IPaginationResponse<TObj[]>>
        Get(_id: string): AxiosResponseWrapper<IResult<TObj>>
        Create(_data: IOmitCreate<TObj>): AxiosResponseWrapper
        Delete(_id: ISoftDelete): AxiosResponseWrapper
        Restore(_id: string): AxiosResponseWrapper
        Update(_params: IOmitUpdate<TObj>): AxiosResponseWrapper
    }

    export const apiEndpoints = {
        tokens: "tokens",
        cocautochucs: "groups",
        cauhinhhethongs: "cauhinhhethongs",
        quytrinhxulys: "quytrinhxulys",
        nhomnguoidungs: "nhomnguoidungs",
        buocxulys: 'buocxulys',
        lienketbuocxulys: 'lienketbuocxulys',
        users: "users",
        "personals/changepassword": "personals/changepassword",
        roles: "roles",
        "auth/profile": "auth/profile",
        groups: "groups",
        menus: "menus",
        "personal/profile": "personal/profile",
        actions: "actions",
        screens: "screens",
        screenactions: "screenactions",
        nguoidungnhomnguoidungs: "nguoidungnhomnguoidungs",
        configs: "configs",
        banners: 'banners',
        footers: 'footers',
        userroles: "userroles",
        files: "files",
        logdeletedusers: "logdeletedusers",
        procgroup_mgrs: "nhomthutucs",
        typeofproc_mgrs: "loaithutucs",
        procofthistype_mgrs: "thutucthuocloais",
        danhmuc_chucdanhs: "chucdanhs",
        danhmuc_chucvus: "chucvus",
        danhmuc_trangthaidanhgias: "trangthaidanhgias",
        danhmuc_kieutieuchis: "danhmucchungs",
        danhmuc_donvitinhs: "danhmucchungs",
        danhmuc_loaidiems: "danhmucchungs",
        danhmuc_xeploaidanhgias: "xeploaidanhgias",
        danhmuc_khotieuchis: "khotieuchis",
        danhmuc_phieudanhgias: "mauphieudanhgias",
        danhmuc_botieuchuans: "botieuchuans",
        danhmuc_caccaps: "danhmucchungs",
        danhmuc_congviecchuyenmons: "danhmucchungs",
        danhmuc_trangthaicongviecs: "danhmucchungs",
        danhmuc_tailieuhuongdansudungs: "danhmucchungs",
        tieuchidanhgias: "tieuchidanhgias",
        tailieuhdsds: "tailieuhdsds",
        lstusers: "lstuserss",
        logauthens: "logauthens",
        danhmucchungs: "danhmucchungs",
        danhgias: "danhgias",
        chitietdanhgias: "chitietdanhgias",
        vetxulydanhgias: "vetxulydanhgias",
        vetxulydanhgiatochucs: "vetxulydanhgiatochucs",
        danhgiadonvis: "danhgiadonvis",
        chitietdanhgiadonvis: "chitietdanhgiadonvis",
        vetxulydanhgiadonvis: "vetxulydanhgiadonvis",
        danhmuc_thongkedanhgias: "danhgias",
        auditlogs: "auditlogs",
        hosocongtacdanhgias: "hosocongtacdanhgias",
        khieunaidanhgias: "khieunaidanhgias",
        giahandanhgias: "giahandanhgias",
        mauphois: "mauphois",
        loaimauphois: "loaimauphois",
        dashboards: "danhgias",
        exportDatas: "exportDatas",
        sharedulieudanhgias: "apitichhops",
        thongkekhieunais: "khieunaidanhgias",
        historycallapitichhops: "auditlogs",
        nhomdonvis: "nhomdonvis",
        dongbodulieus: "danhmucchungs",
        kydanhgias:"kydanhgias",
        cauhinhkysos:"danhmucchungs"
    } as const
    export const primaryRoutes = {
        redirectUser: "/redirect-user",
        login: "/login",
        admin: {
            root: "/admin",
            quanTriNguoiDung: {
                root: "/admin/quan-tri-nguoi-dung",
                coCauToChuc: "/admin/quan-tri-nguoi-dung/co-cau-to-chuc",
                coCauToChucDV: "/admin/quan-tri-nguoi-dung/co-cau-to-chuc-don-vi",
                vaiTro: "/admin/quan-tri-nguoi-dung/vai-tro",
                nguoiDungDonVi: '/admin/quan-tri-nguoi-dung/nguoi-dung-don-vi',
                taiKhoanTuCSDLDanCu: '/admin/quan-tri-nguoi-dung/tk-csdl-dan-cu',
                doimatkhau: '/admin/quan-tri-nguoi-dung/doi-mat-khau',
                chuyendulieutaikhoan: '/admin/quan-tri-nguoi-dung/chuyen-du-lieu-tai-khoan',
                thongtintaikhoan: '/admin/quan-tri-nguoi-dung/thong-tin-tai-khoan',
                danhsachnguoidung: '/admin/quan-tri-nguoi-dung/danh-sach-nguoi-dung',
                listuserbypermission: '/admin/quan-tri-nguoi-dung/danh-sach-nguoi-dung-theo-quyen',
                chuaPhanQuyenDanhGia: "/admin/quan-tri/chua-phan-quyen-danh-gia",
                userNotBuocXuLy: "/admin/quan-tri/chua-gan-tieu-chi",
                chuaPhanQuyen: "/admin/quan-tri/chua-phan-quyen",
                danhMucDonVi:"/admin/quan-tri/danh-muc-don-vi"
            },

            quanLyTruyCapDgcb: {
                root: "/admin/truy-cap-dgcb",
                quanLyTruyCapDgcb: "/admin/truy-cap-dgcb/quan-ly-truy-cap-dgcb",
                auditLog: "/admin/auditlog",
                dashboard: "/admin/dashboard"
            },
            quyTrinhXuLy: {
                root: "/admin/quy-trinh-xu-ly",
                danhSach: "/admin/quy-trinh-xu-ly/danh-sach",
                donVi: "/admin/quy-trinh-xu-ly/don-vi",
                caNhan: "/admin/quy-trinh-xu-ly/ca-nhan",
            },
            nhomDonVi: {
                root: "/admin/nhom-don-vi",
                danhSach: "/admin/nhom-don-vi/danh-sach",
            },
            danhMucDungChung: {
                root: "/admin/danh-muc-dung-chung",
                danhMuc: "/admin/danh-muc-dung-chung/danh-muc",
                danhMucNgayNghi: "/admin/danh-muc-dung-chung/ngay-nghi",
                danhMucDiaBan: "/admin/danh-muc-dung-chung/dia-ban"
            },

            danhMucDGCB: {
                root: "/admin/danh-muc-dgcb",
                danhmuc_chucdanh: "/admin/danh-muc-dgcb/danh-muc-chuc-danh",
                danhmuc_chucvu: "/admin/danh-muc-dgcb/danh-muc-chuc-vu",
                danhmuc_trangthaidanhgia: "/admin/danh-muc-dgcb/danh-muc-trang-thai-danh-gia",
                danhmuc_kieutieuchis: "/admin/danh-muc-dgcb/danh-muc-kieu-tieu-chi",
                danhmuc_donvitinhs: "/admin/danh-muc-dgcb/danh-muc-don-vi-tinh",
                danhmuc_caccaps: "/admin/danh-muc-dgcb/danh-muc-cac-cap",
                danhmuc_loaidiems: "/admin/danh-muc-dgcb/danh-muc-loai-diem",
                danhmuc_xeploaidanhgias: "/admin/danh-muc-dgcb/danh-muc-xep-loai-danh-gia",
                danhmuc_khotieuchis: "/admin/danh-muc-dgcb/danh-muc-kho-tieu-chi",
                danhmuc_phieudanhgias: "/admin/danh-muc-dgcb/danh-muc-phieu-danh-gia",
                danhmuc_botieuchuans: "/admin/danh-muc-dgcb/danh-muc-bo-tieu-chuan",
                tieuchidanhgias: "/admin/danh-muc-dgcb/tieu-chi-danh-gia",
                nhomnguoidungs: "/admin/danh-muc-dgcb/danh-muc-nhom-nguoi-dung",
                kydanhgia: "/admin/danh-muc-dgcb/kydanhgia",
                danhmuc_tailieuhuongdansudung: "/admin/quan-tri-tai-lieu/tai-lieu-hdsd",
               
            },
            danhmucQLCV:
            {
                root: "/admin/quan-ly-cong-viec",
                danhmuc_congviecchuyenmons: "/admin/quan-ly-cong-viec/danh-muc-cong-viec-chuyen-mon",
                danhmuc_trangthaicongviecs: "/admin/quan-ly-cong-viec/danh-muc-trang-thai-cong-viec",
            },
            danhmucQlTaiLieu:
            {
                root: "/admin/quan-tri-tai-lieu",
                danhmuc_tailieuhuongdansudung: "/admin/quan-tri-tai-lieu/tai-lieu-hdsd",
                danhmuc_tailieuhuongdansudungview:"/admin/quan-tri-tai-lieu/tai-lieu-hdsd-view"
            },
            quanTri: {
                root: "/admin/quan-tri",
                manager: "/admin/quan-tri/manager-procedure-menu",
                danhSachMenu: "/admin/quan-tri/danh-sach-menu",
                action: "/admin/quan-tri/action",
                screen: "/admin/quan-tri/screen",
                config: "/admin/quan-tri/config",
                quanLyTaiNguyen: "/admin/quan-tri/quan-ly-tai-nguyen",
                role: "/admin/roles",
                cauhinhkyso:"/admin/quan-tri/cau-hinh-ky-so"

            },
            quanTriDonVi: {
                root: "/admin/quan-tri-don-vi",
                danhMucCoCauToChuc: "/admin/quan-tri-don-vi/danh-muc-co-cau-to-chuc",
                thuTuc: "/admin/quan-tri-don-vi/danh-muc-thu-tuc",
                danhMucNguoiDung: "/admin/quan-tri-don-vi/danh-muc-nguoi-dung",
                hoSoTheoDonVi: "/admin/quan-tri-don-vi/ho-so-theo-don-vi",
                sochungthuc: "/admin/quan-tri-don-vi/so-chung-thuc",
                nhomnguoidung: "/admin/quan-tri-don-vi/nhom-nguoi-dung-don-vi",
                thongkedghlcongdan: "/admin/quan-tri-don-vi/thong-ke-dghl-cong-dan",
                thongkedghlcanbo: "/admin/quan-tri-don-vi/thong-ke-dghl-can-bo",
                giaodichthanhtoan: "/admin/quan-tri-don-vi/giao-dich-thanh-toan"
            },

            quanLymauPhoi: {
                root: "/admin/root-mau-phoi",
                loaiPhoi: "/admin/loai-phoi",
                mauPhoi: "/admin/mau-phoi",
            },
            cacHeThongKhac: {
                root: "/admin/cac-he-thong-khac",
                shareDuLieuDanhGia: "/admin/cac-he-thong-khac/share-du-lieu-danh-gia",
                shareKetQuaDanhGia: "/admin/cac-he-thong-khac/share-ket-qua-danh-gia",
                shareDuLieuVsTTGSDH: "/admin/cac-he-thong-khac/share-du-lieu-danh-gia-vs-ttgs-dieu-hanh",
                shareDuLieuDanhGiaKetQuaCacDoiTuong: "/admin/cac-he-thong-khac/share-du-lieu-ket-qua-cac-doi-tuong",
                dongBoDuLieu:
                {
                    root: "/admin/cac-he-thong-khac/dong-bo-du-lieu",
                    dongBoNguoiDung: "/admin/cac-he-thong-khac/dong-bo-du-lieu/dong-bo-nguoi-dung",
                    dongBoCoCau: "/admin/cac-he-thong-khac/dong-bo-du-lieu/dong-bo-co-cau",
                }
            }

        },
        danhGiaCanBo: {
            root: "/dgcb",
            tuChamDiem: {
                root: "/dgcb/tu-cham-diem",
                canBoTuDanhGia: "/dgcb/tu-cham-diem/can-bo-tu-cham-diem",
                choLanhDaoTrucTiepCham: "/dgcb/tu-cham-diem/cho-lanh-dao-truc-tiep-cham",
                choDanhGiaXepLoai: "/dgcb/tu-cham-diem/cho-danh-gia-xep-loai",
                daDanhGiaXepLoai: "/dgcb/tu-cham-diem/da-danh-gia-xep-loai",
            },
            lanhDaoTrucTiepChamDiem: {
                root: "/dgcb/cbql",
                choChamDiem: "/dgcb/cbql-cho-nhan-xet",
                daChamDiem: "/dgcb/cbql-da-nhan-xet",

            },
            lanhDaoDonViChamDiem: {
                root: "/dgcb/cbdg",
                choThamMuu: "/dgcb/cbdg-cho-tham-muu",
                daThamMuu: "/dgcb/cbdg-da-tham-muu",
                choDanhGia: "/dgcb/cbdg-cho-danh-gia",
                daDanhGia: "/dgcb/cbdg-da-danh-gia",
            },
            chamDiemThuTruongDonVi: {
                root: "/dgcb/dg-thu-truong",
            },
            danhGiaToanDonVi: {
                root: "/dgcb/dg-toan-don-vi",
                toanBo: "/dgcb/dgdv-toan-bo",
                dgdvDaXoa: "/dgcb/dgdv-danh-gia-da-xoa",
            },
            hoSoCongtacDanhGia: {
                root: "/dgcb/ho-so-cong-tac",
                caNhan: "/dgcb/ho-so-cong-tac-ca-nhan",
                donVi: "/dgcb/ho-so-cong-tac-don-vi",
            },
            khieuNaiKienNghiDanhGia: {
                root: "/dgcb/khieu-nai-kien-nghi",
                khieuNaiKienNghi: "/dgcb/khieu-nai-kien-nghi",
                xuLyKhieuNaiKienNghi: "/dgcb/xu-ly-khieu-nai-kien-nghi",
            },
            danhGiaDonVi: {
                root: "/dgcb/dgdv",
                danhGiaDonVi: "/dgcb/danh-gia-don-vi",
                thamMuuDanhGiaDonVi: "/dgcb/tham-muu-danh-gia-don-vi",
                danhGiaXepLoaiDonVi: "/dgcb/danh-gia-xep-loai-don-vi",
            },
            giaHanDanhGia: {
                root: "/dgcb/ghdg",
                danhSachGiaHanDanhGia: "/dgcb/danh-sach-gia-han-danh-gia",
                xuLyGiaHanDanhGia: "/dgcb/xu-ly-gia-han-danh-gia",
            }
        },

        thongkeDgcb: {
            root: '/thongKe',
            tongHopXepLoaiCoQuan: "/thongKe/tong-hop-xep-loai-co-quan",
            tongHopKetQuaDanhGia: "/thongKe/tong-hop-ket-qua-danh-gia",
            thongBaoDanhGiaCoQuan: "/thongKe/thong-bao-danh-gia-co-quan",
            thongKeKhieuNai: "/thongKe/thong-ke-khieu-nai-kien-nghi",
            tkdgTheoBTC: "/thongKe/tkdg-theo-bo-tieu-chi",
            tkdgBTCCacDoiTuong: "/thongKe/tkdg-btc-cac-doi-tuong",
            tkdgBTCCongTacLanhDao: "/thongKe/tkdg-btc-cong-tac-lanh-dao",
            tkdgBTCCacDoiTuongTHT: "/thongKe/tkdg-btc-cac-doi-tuong-toan-he-thong",
            tkdgBTCTHT: "/thongKe/tkdg-btc-toan-he-thong",
            tkdgBTChung: "/thongKe/tkdg-bo-tieu-chi-chung",
        },
        admin_tthc: {
            root: "/admin_tthc",
        },
        file: {
            root: "/files"
        },
        portaldvc: {
            root: '/portaldvc',
        },
        dashboard: {
            root: '/dashboard'
        }


    }
    export type AppEndpoint = keyof typeof apiEndpoints
    export class BaseApi {
        public readonly _urlSuffix: string
        // public readonly _axios = axiosInstance 
        constructor(keyEndpoint: AppEndpoint, apiVersion: string = API_VERSION) {
            this._urlSuffix = apiVersion + apiEndpoints[keyEndpoint]
        }
    }
}
