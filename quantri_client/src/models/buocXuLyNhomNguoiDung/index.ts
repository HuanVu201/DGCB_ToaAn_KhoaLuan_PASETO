import { INhomNguoiDung } from "@/features/nhomnguoidung/models";
import { IBaseEntityWithoutAuditable, IBaseExt } from "../basemodel";
import { BuocXuLy } from "../buocXuLy";

export interface BuocXuLyNhomNguoiDung extends IBaseEntityWithoutAuditable {
    buocXuLyId : string;
    nhomNguoiDungId : string;
    buocXuLy : BuocXuLy;
    nhomNguoiDung : INhomNguoiDung;
}