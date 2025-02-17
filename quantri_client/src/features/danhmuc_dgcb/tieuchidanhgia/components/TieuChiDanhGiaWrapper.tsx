import { FolderContextProvider } from "@/contexts/FolderContext"
import { Spliter } from "@/lib/spliter/Spliter"
import { TieuChiDanhGia } from "./leftside/TieuChiDanhGia"
import { DanhSachTab } from "./rightside/DanhSachTab"
import { TieuChiDanhGiaProvider } from "../contexts/TieuChiDanhGiaContext"
import { useEffect } from "react"
import { SearchDanhMuc_DonViTinh } from "../../danhmuc_donvitinh/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchDanhMuc_PhieuDanhGia } from "../../danhmuc_phieudanhgia/redux/action"
import { SearchDanhMuc_KhoTieuChi } from "../../danhmuc_khotieuchi/redux/action"


const TieuChiDanhGiaWrapper = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        // dispatch(SearchDonVi({}));
         dispatch(SearchDanhMuc_DonViTinh({ pageNumber: 1, pageSize: 50, type:"DonViTinh"}))
         dispatch(SearchDanhMuc_KhoTieuChi({pageNumber: 1, pageSize: 50, isParrentCode : true}))
        // dispatch(SearchDanhMuc_PhieuDanhGia({ pageNumber: 1, pageSize: 50}))
     }, []);
   return <>
   <TieuChiDanhGiaProvider>
   <Spliter
                customClassName='custom-react-spliter'
                primaryIndex={1}
                percentage={true}
                primaryMinSize={25}
                secondaryMinSize={15}
                secondaryInitialSize={20}>
                <section style={{marginRight:12}}><TieuChiDanhGia /></section>
                {/* <section style={{marginLeft:12}}><DanhSachTab/></section> */}
            </Spliter>
   </TieuChiDanhGiaProvider>
   </>
}

export default TieuChiDanhGiaWrapper