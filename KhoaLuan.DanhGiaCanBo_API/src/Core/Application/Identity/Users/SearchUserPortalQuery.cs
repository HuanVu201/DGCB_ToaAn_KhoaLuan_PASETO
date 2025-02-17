using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Identity.Users;
public class SearchUserPortalQuery : PaginationFilter
{
    public string? OfficeCode { get; set; }
    public string? GroupCode { get; set; }
    public bool? LaCanBoTiepNhan { get; set; }
}
