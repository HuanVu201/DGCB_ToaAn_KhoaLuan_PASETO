import { StringContainer } from "docx";
import {SearchThongBaoDanhGiaCoQuan } from "./SearchThongBaoDanhGiaCoQuan";
import WordBaoCao from "./WordBaoCao/WordBaoCao";

const thongBaoDanhGiaCoQuan = ({title}: {title:string}) =>
{
 

  
  return(
   <>
    <div className="thongKeSwapper">
        <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
        {/* //Thông báo đánh giá cơ quan */}
        {title}
        </div>
    </div>
    <SearchThongBaoDanhGiaCoQuan/>
    <WordBaoCao/>
   </>
  )
}
export default thongBaoDanhGiaCoQuan;