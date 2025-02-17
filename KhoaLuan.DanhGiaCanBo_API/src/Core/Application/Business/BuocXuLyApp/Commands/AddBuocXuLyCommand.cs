using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Commands;
public class AddBuocXuLyCommand : ICommand<DefaultIdType>
{
    public DefaultIdType Id { get; set; }
    public string TenBuoc { get; set; }
    public bool? CungDonVi { get; set; } = false;
    public bool? CungPhongBan { get; set; } = false;
    public bool? LayNguoiQuanLy { get; set; } = false;
    public bool? LaBuocDauTien { get; set; } = false;
    public bool? LaBuocCuoiCung { get; set; } = false;
    public bool? LayDonViCapTren { get; set; } = false;
    public bool KhongCoChucVu { get; set; } = false;
    public bool KhongCoChucDanh { get; set; } = false;
    public double? ThoiHanXuLy { get; set; }
    public DefaultIdType QuyTrinhXuLyId { get; set; }
    public DefaultIdType TrangThaiDanhGiaId { get; set; }

    public double PositionX { get; set; }
    public double PositionY { get;  set; }
    public double PositionAbsoluteX { get; set; }
    public double PositionAbsoluteY { get; set; }
    public string Type { get; set; }
    public bool Deletable { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public bool Selected { get; set; }
    public bool Dragging { get; set; }
    public List<Guid>? BuocXuLyChucDanhIds { get; set; }
    public List<Guid>? BuocXuLyChucVuIds { get; set; }
    public List<Guid>? BuocXuLyDonVis { get; set; }
    public List<Guid>? BuocXuLyNhomNguoiDungIds { get; set; }
}
