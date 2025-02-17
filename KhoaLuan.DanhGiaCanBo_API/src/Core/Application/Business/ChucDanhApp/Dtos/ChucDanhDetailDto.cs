using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Dtos;
public class ChucDanhDetailDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string Ten { get; set; }
    public string Ma { get; set; }
    public string? MoTa { get; set; }
    public string? TenCapDanhGia { get; set; }
    public string? MaCapDanhGia { get; set; }
    public bool Active { get; set; }
    public List<MauPhieuDanhGiaDto> MauPhieuDanhGias { get; set; }

    public ChucDanhDetailDto(string ten, string ma, string? moTa, string? tenCapDanhGia, string? maCapDanhGia, List<MauPhieuDanhGiaDto> mauPhieuDanhGias)
    {
        Ten = ten;
        Ma = ma;
        MoTa = moTa;
        TenCapDanhGia = ten;
        MaCapDanhGia = maCapDanhGia;
        MauPhieuDanhGias = mauPhieuDanhGias;
    }

    public class MauPhieuDanhGiaDto
    {
        public string Ten { get; set; }
        public DefaultIdType Id { get; set; }
        public MauPhieuDanhGiaDto(string ten, DefaultIdType id)
        {
            Ten = ten;
            Id = id;
        }
    }
}
