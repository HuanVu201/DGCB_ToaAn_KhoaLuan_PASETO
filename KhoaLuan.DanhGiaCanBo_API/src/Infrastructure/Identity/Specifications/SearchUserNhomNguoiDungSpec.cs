using Ardalis.Specification;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Specifications;
public class SearchUserGroupNhomNguoiDungSpec : Specification<ApplicationUserGroupNhomNguoiDung>
{
    public SearchUserGroupNhomNguoiDungSpec(IReadOnlyList<DefaultIdType> Ids)
    {
        Query.Where(x => Ids.Contains(x.Id));
    }
}
