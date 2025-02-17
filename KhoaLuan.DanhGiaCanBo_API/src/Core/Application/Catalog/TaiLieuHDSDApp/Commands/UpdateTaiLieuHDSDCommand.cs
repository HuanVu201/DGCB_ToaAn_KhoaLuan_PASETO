using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp.Commands;
public sealed class UpdateTaiLieuHDSDCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public int? ThuTu { get; set; }
    public string? TenTaiLieu { get; set; }
    public string? TepDinhKem { get; set; }
    public string? TaiLieuDanhCho { get; set; }
    public string? MoTa { get; set; }
    public DateTime? NgayDang { get; set; }
}
