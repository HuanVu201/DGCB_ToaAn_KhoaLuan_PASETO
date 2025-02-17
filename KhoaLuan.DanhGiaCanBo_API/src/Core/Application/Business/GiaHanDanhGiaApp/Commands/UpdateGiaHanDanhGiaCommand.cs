using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.GiaHanDanhGiaApp.Commands;
public sealed class UpdateGiaHanDanhGiaCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    //public string? ThoiGian { get; set; }
    //public string? NamDanhGia { get; set; }
    public string? NoiDung { get; set; }
    public string? YKien { get; set; }
    public string? TrangThai { get; set; }// Chờ gửi / Chờ xử lý / Đã xử lý
    public string? DinhKem { get; set; }
    //public string? LoaiThoiGian { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaDonViCha { get; set; }
    public string? MaBoTieuChi { get; set; }
    public string? TenBoTieuChi { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
}
