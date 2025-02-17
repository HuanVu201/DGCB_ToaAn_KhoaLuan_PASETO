using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
public class GetUrlMauPhoiDefaultQuery : IRequest<string>
{
    public string? LoaiPhoi { get; set; }
    public string? MaMauPhoi { get; set; }
}