using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Commands;
public sealed class UpdateKhieuNaiDanhGiaCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? MaPhieu { get; set; }
    public string? LyDo { get; set; }
    public string? DinhKemKhieuNai { get; set; }
    public string? TrangThai { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaDonViCha { get; set; }
    public string? KetQua { get; set; }
    public string? DinhKemKetQua { get; set; }
    public DateTime? ThoiGianCapNhat { get; set; }
    public int? SoLuongKhieuNai { get; set; }
    public string? NguoiCapNhatKQId { get; set; }
}
