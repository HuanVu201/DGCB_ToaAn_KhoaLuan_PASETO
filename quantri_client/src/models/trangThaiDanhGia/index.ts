import { IBaseExt } from "../basemodel";
import { BuocXuLy } from "../buocXuLy";

export interface TrangThaiDanhGia extends IBaseExt {
    ten : string;
    ma : string;
    active : boolean;
    buocXuLys : BuocXuLy[];
}