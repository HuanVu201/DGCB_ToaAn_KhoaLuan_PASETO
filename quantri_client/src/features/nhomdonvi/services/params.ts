import { NhomDonVi } from "@/models/nhomDonVi";

export type AddNhomDonViRequest = Pick<NhomDonVi, "tenNhom" | "moTa"> & {
    donViIds: string[];
}