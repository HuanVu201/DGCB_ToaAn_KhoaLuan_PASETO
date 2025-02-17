using Mapster;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos;
public class ChiTietQuyTrinhXuLyDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string TenQuyTrinh { get; set; }
    public bool LaQuyTrinhDonVi { get; set; }
    public List<DonVi> DonVis { get; set; }
    public int ThuTu { get; set; }
    public ChiTietQuyTrinhXuLyDto() { }
    public ChiTietQuyTrinhXuLyDto(QuyTrinhXuLy quyTrinhXuLy, IReadOnlyCollection<DonVi> group)
    {
        Id = quyTrinhXuLy.Id;
        TenQuyTrinh = quyTrinhXuLy.TenQuyTrinh;
        ThuTu = quyTrinhXuLy.ThuTu;
        LaQuyTrinhDonVi = quyTrinhXuLy.LaQuyTrinhDonVi;
        if (group != null)
        {
            DonVis = group.ToList();
        }
    }
    public class DonVi
    {
        public string Id { get; set; }
        public string GroupName { get; set; }
        public string GroupCode { get; set; }
    }
}
