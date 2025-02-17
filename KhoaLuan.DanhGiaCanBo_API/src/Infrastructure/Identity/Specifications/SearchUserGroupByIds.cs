using Ardalis.Specification;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Specifications;
public class SearchUserGroupByIds : Specification<ApplicationUserGroup>
{
    public SearchUserGroupByIds(List<DefaultIdType> Ids)
    {
        Query.Where(x => Ids.Contains(x.Id));
    }
}
