import { IBaseEntityWithoutAuditable, IBaseExt } from "../basemodel";
import { BuocXuLy } from "../buocXuLy";
import { ChucVu } from "../chucVu";

export interface BuocXuLyChucVu extends IBaseEntityWithoutAuditable {
    chucVuId : string;
    buocXuLyId : string;
    buocXuLy : BuocXuLy;
    chucVu : ChucVu;
}