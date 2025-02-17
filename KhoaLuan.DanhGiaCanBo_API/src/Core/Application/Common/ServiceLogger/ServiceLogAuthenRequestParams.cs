using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Common.ServiceLogger;
public class ServiceLogAuthenRequestParams
{
    public string? Username { get; set; }
    public string? Fullname { get; set; }
    public string? IP { get; set; }
    public string? Token { get; set; }
    public string? TypeLogin { get; set; }
    public string? TypeUser { get; set; }
    public string? Device { get; set; }
}
