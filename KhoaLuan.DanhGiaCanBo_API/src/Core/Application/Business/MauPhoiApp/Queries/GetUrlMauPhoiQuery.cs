using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
public class GetUrlMauPhoiQuery : IRequest<string>
{
    public string? LoaiPhoi { get; set; }
    public string? MaMauPhoi { get; set; }
    public string? MaDonVi { get; set; }
}

