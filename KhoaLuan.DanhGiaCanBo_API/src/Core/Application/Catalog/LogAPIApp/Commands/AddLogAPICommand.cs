using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAPIApp.Commands;
public class AddLogAPICommand : ICommand<Guid>
{

    [MaxLength(500)]
    public string? Ten { get; set; }
    [MaxLength(50)]
    public string? Ma { get; set; }
    [MaxLength(500)]
    public string? TenAPI { get; set; }
    [MaxLength(50)]
    public string? LoaiDichVu { get; set; }
    [MaxLength(50)]
    public string? LoaiQuanLy { get; set; }

}
