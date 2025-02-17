import { Service } from "@/services"
import { Badge } from "antd"
import { Link } from "react-router-dom"

export interface NhacViecResponse {
    choLanhDaoTrucTiepChamDiem : number;
    choPhoThuTruongDonViChamDiem : number;
    choThuTruongDonViChamDiem : number;
  }
  
  


const { primaryRoutes } = Service

export const nhacViecMapper: Record<string, keyof NhacViecResponse> = {
    [primaryRoutes.danhGiaCanBo.lanhDaoTrucTiepChamDiem.choChamDiem]: "choLanhDaoTrucTiepChamDiem",
    [primaryRoutes.danhGiaCanBo.lanhDaoDonViChamDiem.choThamMuu]: "choPhoThuTruongDonViChamDiem",
    [primaryRoutes.danhGiaCanBo.lanhDaoDonViChamDiem.choDanhGia]: "choThuTruongDonViChamDiem",
   
}
export type NhacViecLinkResponseKey = Extract<keyof NhacViecResponse, "choLanhDaoTrucTiepChamDiem" | "choPhoThuTruongDonViChamDiem" | "choThuTruongDonViChamDiem" >

export const nhacViecLinkMapper: Record<NhacViecLinkResponseKey, string> = {
   
    "choLanhDaoTrucTiepChamDiem": primaryRoutes.danhGiaCanBo.lanhDaoTrucTiepChamDiem.choChamDiem,
    "choPhoThuTruongDonViChamDiem": primaryRoutes.danhGiaCanBo.lanhDaoDonViChamDiem.choThamMuu,
    "choThuTruongDonViChamDiem": primaryRoutes.danhGiaCanBo.lanhDaoDonViChamDiem.choDanhGia,
    
}

const getLabel = (value: string, suffix: string, link: string) => {
    return <Link to={link}><Badge count={+value} showZero color='#2C62B9' overflowCount={9999} /> <span style={{ fontWeight: 600 }}>{suffix}</span></Link>
}

export const nhacViecLabelMapper: Record<NhacViecLinkResponseKey, (value: string) => JSX.Element> = {
   
    "choLanhDaoTrucTiepChamDiem": (value: string) => getLabel(value, "Phiếu chấm điểm chờ lãnh đạo trực tiếp chấm điểm", primaryRoutes.danhGiaCanBo.lanhDaoTrucTiepChamDiem.choChamDiem),
    "choPhoThuTruongDonViChamDiem": (value: string) => getLabel(value, "Phiếu chấm điểm chờ Phó thủ trưởng đơn vị tham mưu", primaryRoutes.danhGiaCanBo.lanhDaoDonViChamDiem.choThamMuu),
    "choThuTruongDonViChamDiem": (value: string) => getLabel(value, "Phiếu chấm điểm chờ Thủ trưởng đơn vị xếp loại, đánh giá", primaryRoutes.danhGiaCanBo.lanhDaoDonViChamDiem.choDanhGia),
    
}