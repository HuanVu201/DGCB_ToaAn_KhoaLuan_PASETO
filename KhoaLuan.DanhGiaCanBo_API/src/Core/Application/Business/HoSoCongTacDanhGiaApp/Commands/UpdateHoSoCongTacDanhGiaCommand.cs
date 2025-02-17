using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.HoSoCongTacDanhGiaApp.Commands;
public sealed class UpdateHoSoCongTacDanhGiaCommand : ICommand
{
    [JsonIgnore]
    public Guid? Id { get; set; }
    public string? TenHoSo { get; set; }
    public string? TenDonVi { get; set; }
    public string? MaDonVi { get; set; }
    public string? DKBanKiemDiem { get; set; }
    public string? DKBanNhanXetCapUy { get; set; }
    public string? DKBienBanHoiNghiKiemDiem { get; set; }
    public string? DKKetQuaThamDinhCuaCoQuanThamMuu { get; set; }
    public string? DKKetLuanDanhGiaXepLoai { get; set; }
    public string? DKVanBanGoiYKiemDiem { get; set; }
    public string? DKVanBanThamGiaGopY { get; set; }
    public string? DKHoSoGiaiQuyetKhieuNaiKienNghi { get; set; }
    public string? DKCacVanBanKhac { get; set; }

}
