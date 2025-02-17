using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.DanhMucChungApp.Commands;
public class AddDanhMucChungCommand : ICommand<Guid>
{

    [MaxLength(200)]
    public string? TenDanhMuc { get; set; }
    [MaxLength(100)]
    public string? Code { get; set; }
    public int ThuTu { get; set; } = 1;
    public bool DuocChamNhieuLan { get; set; }
    public bool Active { get; set; } = true;
    [MaxLength(100)]
    public string Type { get; set; }
    public string? DinhKem { get; set; }

}
