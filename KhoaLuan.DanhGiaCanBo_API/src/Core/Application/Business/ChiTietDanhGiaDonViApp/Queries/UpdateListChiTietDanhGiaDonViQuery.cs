using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;
using System.Text.Json.Serialization;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp.Queries;
public class UpdateListChiTietDanhGiaDonViQuery : IQuery<string>
{
    public List<UpdateItemChiTietDanhGiaDonVi>? Data { get; set; }
}

public class UpdateItemChiTietDanhGiaDonVi
{
    // [JsonIgnore]
    public Guid? Id { get; set; }
    public string? TenMauPhieu { get; set; }
    public string? MaMauPhieu { get; set; }
    public string? MaPhieu { get; set; }

    public string? ScorePoint { get; set; }


    [MaxLength(50)]
    public string? ChiTietDiemLanhDaoDanhGia { get; set; }
    [MaxLength(50)]
    public string? ChiTietDiemTuDanhGia { get; set; }
    [MaxLength(50)]
    public string? ChiTietDiemThamMuu { get; set; }
    [MaxLength(50)]
    public string? ChiTietDiemDanhGia { get; set; }

    public string? DataTuDanhGia { get; set; }
    public string? DataThamMuu { get; set; }
    public string? DataLanhDaoDanhGia { get; set; }
    public double? DiemDanhGia { get; set; }
    public double? DiemTuDanhGia { get; set; }
    public double? DiemThamMuu { get; set; }
    public double? DiemLanhDaoDanhGia { get; set; }
    public bool? HasDiemLietTuDanhGia { get; set; }
    public bool? HasDiemLietThamMuu { get; set; }
    public bool? HasDiemLietLanhDaoDanhGia { get; set; }
    public int? ThuTu { get; set; }
}
