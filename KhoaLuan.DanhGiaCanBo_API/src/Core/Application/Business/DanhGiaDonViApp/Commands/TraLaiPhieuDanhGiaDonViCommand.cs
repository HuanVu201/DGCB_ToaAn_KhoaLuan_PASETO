using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;
public sealed class TraLaiPhieuDanhGiaDonViCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType Id { get; set; }
    [MaxLength(100)]
    public string TenBuocXuLy { get; set; }
}

public class GetVetXuLyPrevDto
{
    public DefaultIdType Id { get; set; }
    public DefaultIdType? NguoiXuLyId { get; set; }
    public DefaultIdType? BuocXuLyId { get; set; }
    public string? TaiKhoanXuLy { get; set; }
    public string? TenNguoiXuLy { get; set; }
    public string? TenBuocXuLy { get; set; }
    public string? TenTrangThai { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; } = 0;
}