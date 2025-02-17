import { IBaseExt, PartialBaseExtAndExtractPrimitiveProps } from "@/models";
import { BuocXuLy } from "@/models/buocXuLy";
import { CoCauToChuc } from "@/models/cocautochuc";
import { LienKetBuocXuLy } from "@/models/lienKetBuocXuLy";
import { QuyTrinhXuLy } from "@/models/quytrinhxuly";
import {Edge, Node} from "reactflow"

export type AddReactFlowQuyTrinhCommand = {
    lienKetBuocXuLys : LienKetBuocXuLy[];
    buocXuLys : BuocXuLy[];
    quyTrinhXuLyId : string;
}
export type UpdateReactFlowQuyTrinhCommandLienKetBuocXuLy = PartialBaseExtAndExtractPrimitiveProps<LienKetBuocXuLy> & Pick<IBaseExt, "id">
export type UpdateReactFlowQuyTrinhCommandBuocXuLy = Pick<BuocXuLy, "laBuocCuoiCung" | "khongCoChucDanh" | "khongCoChucVu" | "layDonViCapTren" | "positionAbsoluteX" | "positionAbsoluteY" | "positionX" | "positionY" | "id" | "laBuocDauTien" | "deletable" | "selected" | "dragging" | "layNguoiQuanLy" | "cungDonVi" | "cungPhongBan">
export type UpdateReactFlowQuyTrinhCommand = {
    lienKetBuocXuLys : UpdateReactFlowQuyTrinhCommandLienKetBuocXuLy[];
    buocXuLys? : UpdateReactFlowQuyTrinhCommandBuocXuLy[];
    quyTrinhXuLyId? : string;
}

export type GetReactFlowQuyTrinhXuLyQuery = {
    id : string;
}
export type ReactFlowQuyTrinhXuLyDto = {
    nodes : Node<BuocXuLy>[];
    edges : Edge<LienKetBuocXuLy>[];
}

export type AddQuyTrinhXuLyRequest = Pick<QuyTrinhXuLy, "tenQuyTrinh" | "thuTu" | "laQuyTrinhDonVi"> & {
    donViIds: string[];
    donViLoaiTrus?: string[];
}