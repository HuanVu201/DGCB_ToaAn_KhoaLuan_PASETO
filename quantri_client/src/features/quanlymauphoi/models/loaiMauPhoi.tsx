import { IBaseExt, IBasePagination, IBaseSearch, IPickSearch } from "../../../models";
export interface ILoaiMauPhoi extends IBaseExt {
    loaiPhoi: string,
    maMauPhoi: string,
    tenMaMauPhoi: string,
}


export interface ISearchLoaiMauPhoi extends IBasePagination, IBaseSearch, IPickSearch<ILoaiMauPhoi> {
    loaiPhoi?: string,
    maMauPhoi?: string,
    tenMaMauPhoi?: string,

}

export const loaiPhois = [
    { label: 'Mẫu phôi phiếu đánh giá', value: 'phoi-phieu' },
    { label: 'Mẫu phôi thống kê excel', value: 'phoi-excel' },
    { label: 'Mẫu phôi thống kê word', value: 'phoi-word' },
]