using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
public sealed class CapNhatDuLieuThongKeCommand : ICommand
{
    [JsonIgnore]
    public string? Type { get; set; }
    public string? XuLy { get; set; }
    public DanhGia? Input { get; set; }

    public string? InputKT { get; set; } /// KieuKeHoachCongviec tam thoi chua co
    public string? PhanLoaiCu { get; set; }
    public string? TrangThaiCVCu { get; set; }

}
