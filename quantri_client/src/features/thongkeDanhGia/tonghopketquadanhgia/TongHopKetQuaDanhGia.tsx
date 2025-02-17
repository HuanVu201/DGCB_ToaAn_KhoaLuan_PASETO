import { useAppDispatch } from "@/lib/redux/Hooks";
import { SearchTongHopKetQuaDanhGia } from "./SearchTongHopKetQuaDanhGia";
import WordBaoCao from "./WordBaoCao/WordBaoCao";
import { useEffect } from "react";
import { SearchListUserByPermision } from "@/features/danhsachnguoidung/components/SearchListUserByPermision";
import { SearchLstUsers } from "@/features/lstusers/redux/action";

const TongHopKetQuaDanhGia = () =>
{
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(SearchLstUsers({ pageNumber: 1, pageSize: 1000 }));
  }, []);
  return(
   <>
    <div className="thongKeSwapper">
        <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
        Tổng hợp kết quả đánh giá, xếp loại chất lượng hằng tháng của công chức, viên chức
        </div>
    </div>
    <SearchTongHopKetQuaDanhGia/>
   </>
  )
}
export default TongHopKetQuaDanhGia;