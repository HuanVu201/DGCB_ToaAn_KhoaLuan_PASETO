using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;
public class GetQuyTrinhXuLyByCurrentUserQuery : IQuery<ChiTietBuocXuLy>
{
    public string? LoaiBuoc { get; set; } = "START";
    public bool? LaQuyTrinhDonVi { get; set; } = false;
}
