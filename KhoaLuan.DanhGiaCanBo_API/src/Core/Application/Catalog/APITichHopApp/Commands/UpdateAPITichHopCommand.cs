using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.APITichHopApp.Commands;
public sealed class UpdateAPITichHopCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    [MaxLength(500)]
    public string? Ten { get; set; }
    [MaxLength(50)]
    public string? Ma { get; set; }
    [MaxLength(500)]
    public string? Url { get; set; }
    [MaxLength(5000)]
    public string? Input { get; set; }
    [MaxLength(5000)]
    public string? Output { get; set; }
    [MaxLength(10)]
    public string? PhuongThuc { get; set; }
    [MaxLength(1000)]
    public string? MoTa { get; set; }
    [MaxLength(50)]
    public string? LoaiDichVu { get; set; }
    [MaxLength(50)]
    public string? LoaiQuanLy { get; set; }
    public bool SuDung { get; set; }

}
