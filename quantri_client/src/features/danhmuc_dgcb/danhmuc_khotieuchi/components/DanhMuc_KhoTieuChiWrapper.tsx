import { FolderContextProvider } from "@/contexts/FolderContext"
import { Spliter } from "@/lib/spliter/Spliter"
import { DanhMuc_KhoTieuChi } from "./leftside/DanhMuc_KhoTieuChi"
import { DanhMuc_KhoTieuChiProvider } from "../contexts/DanhMuc_KhoTieuChiContext"
import { useEffect } from "react"
import { SearchDanhMuc_DonViTinh } from "../../danhmuc_donvitinh/redux/action"
import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchDanhMuc_PhieuDanhGia } from "../../danhmuc_phieudanhgia/redux/action"
import { SearchDanhMuc_KhoTieuChi } from "../../danhmuc_khotieuchi/redux/action"


const DanhMuc_KhoTieuChiWrapper = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        // dispatch(SearchDonVi({}));
         dispatch(SearchDanhMuc_DonViTinh({ pageNumber: 1, pageSize: 50, type:"DonViTinh"}))
         dispatch(SearchDanhMuc_KhoTieuChi({pageNumber: 1, pageSize: 50,}))
        // dispatch(SearchDanhMuc_PhieuDanhGia({ pageNumber: 1, pageSize: 50}))
     }, []);
   return <>
   <DanhMuc_KhoTieuChiProvider>
   <Spliter
                customClassName='custom-react-spliter'
                primaryIndex={1}
                percentage={true}
                primaryMinSize={25}
                secondaryMinSize={15}
                secondaryInitialSize={20}>
                <section style={{marginRight:12}}><DanhMuc_KhoTieuChi /></section>
                {/* <section style={{marginLeft:12}}><DanhSachTab/></section> */}
            </Spliter>
   </DanhMuc_KhoTieuChiProvider>
   </>
}

export default DanhMuc_KhoTieuChiWrapper