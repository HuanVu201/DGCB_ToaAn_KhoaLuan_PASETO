using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Commands;
public sealed class UpdateChucDanhCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    [MaxLength(200)]
    public string Ten { get; set; }
    [MaxLength(100)]
    public string Ma { get; set; }
    public string MoTa { get; set; }
    public bool Active { get; set; }
    public List<DefaultIdType>? MauPhieuDanhGiaIds { get; set; }
    public string? MaCapDanhGia { get; set; }
    public string? TenCapDanhGia { get; set; }

}
