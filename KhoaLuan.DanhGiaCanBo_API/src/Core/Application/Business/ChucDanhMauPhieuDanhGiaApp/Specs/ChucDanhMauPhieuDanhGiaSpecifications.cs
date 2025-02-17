using TD.DanhGiaCanBo.Domain.Business;
using static TD.DanhGiaCanBo.Application.Business.ChucDanhMauPhieuDanhGiaApp.Specs.ChucDanhMauPhieuDanhGiaSpecifications.Response;

namespace TD.DanhGiaCanBo.Application.Business.ChucDanhMauPhieuDanhGiaApp.Specs;
public class ChucDanhMauPhieuDanhGiaSpecifications
{
    public class DanhSachMauPhieuDanhGiaByChucDanh : Specification<ChucDanhMauPhieuDanhGia, MauPhieuDanhGiaResponse>
    {
        public DanhSachMauPhieuDanhGiaByChucDanh(DefaultIdType chucDanhId)
        {
            Query
                .Select(x => new MauPhieuDanhGiaResponse(x.MauPhieuDanhGia.Ten, x.MauPhieuDanhGia.Id, x.MauPhieuDanhGia.MaBoTieuChi))
                .Where(x => x.ChucDanhId == chucDanhId).AsNoTracking();
        }
    }

    public class Response
    {
        public class MauPhieuDanhGiaResponse
        {
            public string Ten { get; set; }
            public string MaBoTieuChi { get; set; }
            public DefaultIdType Id { get; set; }
            public MauPhieuDanhGiaResponse(string ten, DefaultIdType id, string maBoTieuChi)
            {
                Ten = ten;
                Id = id;
                MaBoTieuChi = maBoTieuChi;
            }
        }
    }
}
