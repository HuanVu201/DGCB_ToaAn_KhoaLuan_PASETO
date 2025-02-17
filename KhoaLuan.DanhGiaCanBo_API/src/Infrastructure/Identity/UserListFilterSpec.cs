using Ardalis.Specification;
using TD.DanhGiaCanBo.Application.Common.Specification;
using TD.DanhGiaCanBo.Application.Identity.Users;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;

public class UserListFilterSpec : EntitiesByBaseFilterSpec<ApplicationUser>
{
    public UserListFilterSpec(UserListFilter request)
        : base(request)
    {
        Query
        .Where(p => p.UserName.Contains(request.UserName), !string.IsNullOrEmpty(request.UserName))
        .Where(p => p.FullName.Contains(request.FullName), !string.IsNullOrEmpty(request.FullName))
        .Where(p => p.IsActive == request.IsActive, request.IsActive.HasValue)

 ;

    }

    public static DateTime GetDateZeroTime(DateTime date)
    {
        return new DateTime(date.Year, date.Month, date.Day, 0, 0, 0);
    }
}