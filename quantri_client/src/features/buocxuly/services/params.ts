import { ExtractPrimitiveProps, IBaseExt, PartialBaseExtAndExtractPrimitiveProps } from "@/models";
import { BuocXuLy } from "@/models/buocXuLy";
import { LienKetBuocXuLy } from "@/models/lienKetBuocXuLy";

type BangLienKet = {
    buocXuLyChucDanhIds?: string[];
    buocXuLyNhomNguoiDungIds?: string[];
    buocXuLyChucVuIds?: string[];
    buocXuLyDonVis?: string[];
}

export type AddBuocXuLyCommand = PartialBaseExtAndExtractPrimitiveProps<BuocXuLy> & BangLienKet

export type UpdateBuocXuLyCommand = Partial<ExtractPrimitiveProps<BuocXuLy>> & BangLienKet

export type GetBuocXuLyQuery = Pick<BuocXuLy, "id"> & {
    inCludeChucVu?: boolean;
    inCludeChucDanh?: boolean;
    inCludeNhomNguoiDung?: boolean;
    inCludeTrangThaiDanhGia?: boolean;
    inCludeSource?: boolean;
    inCludeTarget?: boolean;
    inCludeDonVi?: boolean;
}
