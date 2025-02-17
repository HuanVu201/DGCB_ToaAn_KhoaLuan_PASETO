using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
public class GetUrlPhieuDanhGiaQuery : IRequest<UrlPhieuDanhGiaDto>
{
    public DefaultIdType Id { get; set; }
}

public class UrlPhieuDanhGiaDto
{
    public string? UrlPdf { get; set; }
    public string? UrlDocx { get; set; }
    public bool? IsKySo { get; set; } = false;
}

