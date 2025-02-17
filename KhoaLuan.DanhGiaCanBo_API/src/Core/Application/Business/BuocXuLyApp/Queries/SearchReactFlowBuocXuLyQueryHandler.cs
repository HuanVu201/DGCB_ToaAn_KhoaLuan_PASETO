using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Queries;

public class SearchReactFlowBuocXuLySpec : Specification<BuocXuLy>
{
    public SearchReactFlowBuocXuLySpec(SearchReactFlowBuocXuLyQuery request)
    {
        if(request.QuyTrinhXuLyId != Guid.Empty)
        {
            Query.Where(x => x.QuyTrinhXuLyId == request.QuyTrinhXuLyId);
        }

    }
}



public class SearchReactFlowBuocXuLyQueryHandler
{

}
