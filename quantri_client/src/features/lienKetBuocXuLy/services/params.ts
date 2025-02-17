import { ExtractPrimitiveProps, PartialBaseExtAndExtractPrimitiveProps } from "@/models";
import { LienKetBuocXuLy } from "@/models/lienKetBuocXuLy";

export type UpdateLienKetBuocXuLyCommand = Partial<ExtractPrimitiveProps<LienKetBuocXuLy>>
