using TD.DanhGiaCanBo.Domain.Business;

public class ChiTietNhomDonViDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string TenNhom { get; set; }
    public string MoTa { get; set; }
    public List<DonVi> DanhSachNhomDonVis { get; set; }
    public int ThuTu { get; set; }
    public ChiTietNhomDonViDto() { }
    public ChiTietNhomDonViDto(NhomDonVi NhomDonVi, IReadOnlyCollection<DonVi> group)
    {
        Id = NhomDonVi.Id;
        TenNhom = NhomDonVi.TenNhom;
        MoTa = NhomDonVi.MoTa;
        if (group != null)
        {
            DanhSachNhomDonVis = group.ToList();
        }
    }
    public class DonVi
    {
        public string Id { get; set; }
        public string GroupName { get; set; }
        public string GroupCode { get; set; }
    }
}
