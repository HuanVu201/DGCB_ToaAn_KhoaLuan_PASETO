using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Catalog;
public class APITichHop : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(500)]
    public string? Ten { get; private set; }
    [MaxLength(50)]
    public string? Ma { get; private set; }
    [MaxLength(500)]
    public string? Url { get; private set; }
    [MaxLength(5000)]
    public string? Input { get; private set; }
    [MaxLength(5000)]
    public string? Output { get; private set; }
    [MaxLength(10)]
    public string? PhuongThuc { get; private set; }
    [MaxLength(1000)]
    public string? MoTa { get; private set; }
    [MaxLength(50)]
    public string? LoaiDichVu { get; private set; }
    [MaxLength(50)]
    public string? LoaiQuanLy { get; private set; }
    public bool SuDung { get; private set; }


    public APITichHop() { }

    public APITichHop(string? ten, string? ma, string? url, string? input, string? output, string? phuongThuc, string? moTa, string? loaiDichVu, string? loaiQuanLy, bool suDung)
    {
        Ten = ten;
        Ma = ma;
        Url = url;
        Output = output;
        PhuongThuc = phuongThuc;
        MoTa = moTa;
        LoaiDichVu = loaiDichVu;
        LoaiQuanLy = loaiQuanLy;
        SuDung = suDung;
    }

    public static APITichHop Create(string? ten, string? ma, string? url, string? input, string? output, string? phuongThuc, string? moTa, string? loaiDichVu, string? loaiQuanLy, bool suDung)
    {
        return new( ten, ma, url, input, output, phuongThuc, moTa, loaiDichVu, loaiQuanLy, suDung);
    }
    public APITichHop Update(string? ten, string? ma, string? url, string? input, string? output, string? phuongThuc, string? moTa, string? loaiDichVu, string? loaiQuanLy, bool suDung)
    {
        if (suDung!=null)
            SuDung = (bool)suDung;
        if (!string.IsNullOrEmpty(ten))
            Ten = ten;
        if (!string.IsNullOrEmpty(ma))
            Ma = ma;

        if (!string.IsNullOrEmpty(url))
            Url = url;

        if (!string.IsNullOrEmpty(output))
            Output = output;

        if (!string.IsNullOrEmpty(input))
            Input = input;

        if (!string.IsNullOrEmpty(phuongThuc))
            PhuongThuc = phuongThuc;

        if (!string.IsNullOrEmpty(moTa))
            MoTa = moTa;

        if (!string.IsNullOrEmpty(loaiDichVu))
            LoaiDichVu = loaiDichVu;

        if (!string.IsNullOrEmpty(loaiQuanLy))
            LoaiQuanLy = loaiQuanLy;
        return this;
    }


    public APITichHop SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public APITichHop Restore()
    {
        DeletedOn = null;
        return this;
    }
}
