import { IBaseEntityWithoutAuditable, IBaseExt } from "../basemodel";
import { CoCauToChuc } from "../cocautochuc";
import { QuyTrinhXuLy } from "../quytrinhxuly";

export interface DonViSuDungQuyTrinhXuLy extends IBaseEntityWithoutAuditable {
    donViId : string;
    quyTrinhXuLyId : string; 
    donVi : CoCauToChuc;
    quyTrinhXuLy: QuyTrinhXuLy;
    biLoaiTru: boolean;
}