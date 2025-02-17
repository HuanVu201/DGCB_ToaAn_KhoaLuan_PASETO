import { useAppDispatch, useAppSelector } from "@/lib/redux/Hooks";
import { SearchTongHopXepLoaiCoQuan} from "./SearchTongHopXepLoaiCoQuan"
import WordBaoCao from "./WordBaoCao/WordBaoCao";

const TongHopXepLoaiCoQuan = ({title}:{title: string}) =>
{
  const dispatch = useAppDispatch()
  const { datas: dataThongKe, count } = useAppSelector(state => state.danhmuc_thongkedanhgias)
  
  return(
   <>
    <div className="thongKeSwapper">
        <div className="title" style={{ fontSize: 18, fontWeight: 600 }}>
        {/* Tổng hợp đánh giá hàng tháng của đơn vị - Mẫu số 09 */}
        {title}
        </div>
    </div>
    <SearchTongHopXepLoaiCoQuan/>
    <WordBaoCao/>
   </>
  )
}
export default TongHopXepLoaiCoQuan;