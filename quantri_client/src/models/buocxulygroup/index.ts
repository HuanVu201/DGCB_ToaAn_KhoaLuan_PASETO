import { IBaseEntityWithoutAuditable, IBaseExt } from "../basemodel";
import { BuocXuLy } from "../buocXuLy";
import { ChucVu } from "../chucVu";
import { NhomDonVi } from "../nhomDonVi";

export interface BuocXuLyGroup extends IBaseEntityWithoutAuditable {
    nhomDonViId : string;
    buocXuLyId: string;
    nhomDonVi: NhomDonVi;
    buocXuLy: BuocXuLy;
}