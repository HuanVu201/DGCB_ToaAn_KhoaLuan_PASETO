using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp;
public class DataThongKeKhieuNaiDanhGiaDto : IDto
{
    
    public string? Ten { get; set; }
    public string? Ma { get; set; }
    public int SoLieu { get; set; }
}
public class DataDSKhieuNaiDanhGiaDto 
{

    public Guid? Id { get; set; }
    public string? Ten { get; set; }
    public string? TrangThai { get; set; }
    public string? MaPhongBan { get; set; }
    public string? MaDonVi { get; set; }
}
