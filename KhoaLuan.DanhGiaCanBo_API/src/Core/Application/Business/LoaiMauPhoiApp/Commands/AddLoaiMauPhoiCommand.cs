using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.LoaiMauPhoiApp.Commands;
public class AddLoaiMauPhoiCommand : ICommand<Guid>
{
    public string LoaiPhoi { get; set; } = string.Empty;
    public string MaMauPhoi { get; set; } = string.Empty;
    public string TenMaMauPhoi { get; set; } = string.Empty;
}