using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Common.SSO;
public interface ISmartKiosService : ITransientService
{
    public Task<string?> KiemTraNguoiDungSmartKios(UserInfoSmartKiosRequest request, string? ipAddress, string? device = null);
}