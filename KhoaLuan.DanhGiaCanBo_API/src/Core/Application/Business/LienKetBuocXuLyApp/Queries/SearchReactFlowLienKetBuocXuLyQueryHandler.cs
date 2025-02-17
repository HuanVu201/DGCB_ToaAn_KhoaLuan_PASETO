using TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Dtos;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Queries;

public class SearchReactFlowLienKetBuocXuLySpec : Specification<LienKetBuocXuLy, DanhSachBuocXuLyTiepDto>
{
    public SearchReactFlowLienKetBuocXuLySpec(SearchDanhSachBuocXuLyTiepRequest req)
    {
        Query.Select(x => new DanhSachBuocXuLyTiepDto(
            x.BuocXuLyTarget.Id,
            x.BuocXuLyTarget.BuocXuLyChucVus.Select(x => x.ChucVuId).ToList(),
            x.BuocXuLyTarget.BuocXuLyChucDanhs.Select(x => x.ChucDanhId).ToList(),
            //x.BuocXuLyTarget.BuocXuLyNhomNguoiDungs.Select(x => x.NhomNguoiDungId).ToList(),
            x.BuocXuLyTarget.DonVis.Select(x => x.NhomDonViId).ToList(),
            x.BuocXuLyTarget.CungDonVi,
            x.BuocXuLyTarget.CungPhongBan,
            x.BuocXuLyTarget.LayNguoiQuanLy,
            x.BuocXuLyTarget.LayDonViCapTren,
            x.BuocXuLyTarget.KhongCoChucDanh,
            x.BuocXuLyTarget.KhongCoChucVu,
            x.BuocXuLyTarget.TrangThaiDanhGia.Ten))
            .Where(x => x.Source == req.SourceId)
            .AsNoTracking()
            .AsSplitQuery();
    }
}

public class SearchReactFlowBuocXuLySpec : Specification<BuocXuLy, DanhSachBuocXuLyTiepDto>
{
    public SearchReactFlowBuocXuLySpec(SearchDanhSachBuocXuLyTiepByQuyTrinhRequest req)
    {
        Query.Select(x => new DanhSachBuocXuLyTiepDto(
               x.Id,
               x.BuocXuLyChucVus.Select(x => x.ChucVuId).ToList(),
               x.BuocXuLyChucDanhs.Select(x => x.ChucDanhId).ToList(),
               x.DonVis.Select(x => x.NhomDonViId).ToList(),
               //x.BuocXuLyNhomNguoiDungs.Select(x => x.NhomNguoiDungId).ToList(),
               x.CungDonVi,
               x.CungPhongBan,
               x.LayNguoiQuanLy,
               x.LayDonViCapTren,
               x.KhongCoChucDanh,
               x.KhongCoChucVu,
               x.TrangThaiDanhGia.Ten))
               .Where(x => x.QuyTrinhXuLyId == req.QuyTrinhXuLyId && x.LaBuocCuoiCung == true)
               .AsNoTracking()
               .AsSplitQuery();
    }
}
