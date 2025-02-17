import { IBaseEntityWithoutAuditable, IBaseExt } from "../basemodel";
import { CoCauToChuc } from "../cocautochuc";
import { NhomDonVi } from "../nhomDonVi";
import { QuyTrinhXuLy } from "../quytrinhxuly";

export interface DanhSachNhomDonVis extends IBaseEntityWithoutAuditable {
    groupCode : string;
    nhomDonViId : string; 
    group : CoCauToChuc;
    nhomDonVi: NhomDonVi;
}