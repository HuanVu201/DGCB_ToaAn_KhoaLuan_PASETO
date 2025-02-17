import { IBaseEntityWithoutAuditable, IBaseExt } from "../basemodel";
import { BuocXuLy } from "../buocXuLy";
import { ChucDanh } from "../chucDanh";

export interface BuocXuLyChucDanh extends IBaseEntityWithoutAuditable {
    chucDanhId : string;
    buocXuLyId : string;
    buocXuLy : BuocXuLy;
    chucDanh : ChucDanh;
}