using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;

public sealed record XoaDiemLanhDaoChamDGDVCommand : ICommand
{
    [JsonIgnore]
    public Guid? DanhGiaId { get; set; }
    public string? LoaiDiem { get; set; }
    // Loại điểm nhận 1 trong 3 giá trị : NhanXet, ThamMuu,DanhGia
    public string? TenThaoTac { get; set; }
    public bool? ThuHoi { get; set; } = false;
}
