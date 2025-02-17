using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp.Commands;
public class AddTaiLieuHDSDCommand : ICommand<DefaultIdType>
{
    public int? ThuTu { get; set; }
    public string TenTaiLieu { get; set; }
    public string? TepDinhKem { get; set; }
    public string? TaiLieuDanhCho { get; set; }

    public string? MoTa { get; set; }
    public DateTime NgayDang { get; set; }
}
