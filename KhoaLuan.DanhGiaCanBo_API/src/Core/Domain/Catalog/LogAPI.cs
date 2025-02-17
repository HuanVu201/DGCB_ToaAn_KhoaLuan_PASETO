using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Catalog;
public class LogAPI : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(500)]
    public string? Ten { get; private set; }
    [MaxLength(50)]
    public string? Ma { get; private set; }
    [MaxLength(500)]
    public string? TenAPI { get; private set; }
    [MaxLength(50)]
    public string? LoaiDichVu { get; private set; }
    [MaxLength(50)]
    public string? LoaiQuanLy { get; private set; }
    public LogAPI() { }

    public LogAPI(string? ten, string? ma, string? tenAPI, string? loaiDichVu, string? loaiQuanLy)
    {
        Ten = ten;
        Ma = ma;
        TenAPI = tenAPI;
        LoaiDichVu = loaiDichVu;
        LoaiQuanLy = loaiQuanLy;
    
    }

    public static LogAPI Create(string? ten, string? ma, string? tenAPI, string? loaiDichVu, string? loaiQuanLy)
    {
        return new( ten, ma, tenAPI,loaiDichVu, loaiQuanLy);
    }
    public LogAPI Update(string? ten, string? ma, string? tenAPI, string? loaiDichVu, string? loaiQuanLy)
    {
          if (!string.IsNullOrEmpty(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma))
            Ma = ma;

        if (!string.IsNullOrEmpty(tenAPI))
            TenAPI = tenAPI;

   
        if (!string.IsNullOrEmpty(loaiDichVu))
            LoaiDichVu = loaiDichVu;

        if (!string.IsNullOrEmpty(loaiQuanLy))
            LoaiQuanLy = loaiQuanLy;
        return this;
    }


    public LogAPI SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public LogAPI Restore()
    {
        DeletedOn = null;
        return this;
    }
}
