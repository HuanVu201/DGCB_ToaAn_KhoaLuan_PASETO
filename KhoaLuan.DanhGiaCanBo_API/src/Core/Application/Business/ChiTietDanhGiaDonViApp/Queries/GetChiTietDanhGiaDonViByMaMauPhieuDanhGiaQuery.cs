using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp.Queries;
public class GetChiTietDanhGiaDonViByMauPhieuDanhGiaQuery : IQuery<ChiTietDanhGiaDonVi>
{
    public Guid ID { get; set; }

    public string MaPhieu { get; set; }
    public string MaMauPhieu { get; set; }
}
