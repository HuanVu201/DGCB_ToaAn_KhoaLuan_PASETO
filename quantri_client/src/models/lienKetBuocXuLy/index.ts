import { IBaseExt } from "../basemodel";
import { BuocXuLy } from "../buocXuLy";
import { CoCauToChuc } from "../cocautochuc";
import { QuyTrinhXuLy } from "../quytrinhxuly";

export interface LienKetBuocXuLy extends IBaseExt {
    type: string;
    markerEndType: string;
    animated: boolean;
    styleStrokeWidth: number;
    styleStroke: string;
    source: string;
    target: string;
    quyTrinhXuLyId: string;
    sourceHandle: string;
    targetHandle: string;
    label: string;
    buocXuLySource: BuocXuLy;
    buocXuLyTarget: BuocXuLy;
    quyTrinhXuLy: QuyTrinhXuLy
}

export interface IBuocXuLyTiep extends IBaseExt {
    chucVuIds?: string[]
    chucDanhIds?: string[]
    nhomNguoiDungIds?: string[]
    tenTrangThai?: string
}