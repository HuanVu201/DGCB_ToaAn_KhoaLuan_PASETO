using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.GiaHanDanhGiaApp;
public class GiaHanDanhGiaDto : IDto
{
    public Guid Id { get; set; }
    public string? FullName { get; set; }
    public string? UserName { get; set; }
    public string? NoiDung { get; set; }
    public string? YKien { get; set; }
    public string? TrangThai { get; set; }
    public string? DinhKem { get; set; }
    public string? MaDonVi { get; set; }
    public string? MaDonViCha { get; set; }
    public string? TenPhongBan { get; set; }
    public string? TenDonVi { get; set; }
    public DateTime? TuNgay { get; set; }
    public DateTime? DenNgay { get; set; }
    public DateTime? CreatedOn { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
