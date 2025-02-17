using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Commands;
public sealed class UpdateBuocXuLyCommand : ICommand
{
    [JsonIgnore]
    public DefaultIdType? Id { get; set; }
    public string? TenBuoc { get; set; }
    public bool? LaBuocDauTien { get; set; }
    public bool? LaBuocCuoiCung { get; set; }
    public double? ThoiHanXuLy { get; set; }
    public bool? CungDonVi { get; set; }
    public bool? CungPhongBan { get; set; }
    public bool? LayNguoiQuanLy { get; set; }
    public bool? LayDonViCapTren { get; set; }
    public bool KhongCoChucVu { get; set; } = false;
    public bool KhongCoChucDanh { get; set; } = false;
    public DefaultIdType QuyTrinhXuLyId { get; set; }
    public DefaultIdType TrangThaiDanhGiaId { get; set; }

    public double PositionX { get; set; }
    public double PositionY { get; set; }
    public double PositionAbsoluteX { get; set; }
    public double PositionAbsoluteY { get; set; }
    public string? Type { get; set; }
    public bool Deletable { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public List<Guid>? BuocXuLyChucDanhIds { get; set; }
    public List<Guid>? BuocXuLyDonVis { get; set; }
    public List<Guid>? BuocXuLyChucVuIds { get; set; }
    public List<Guid>? BuocXuLyNhomNguoiDungIds { get; set; }
}
