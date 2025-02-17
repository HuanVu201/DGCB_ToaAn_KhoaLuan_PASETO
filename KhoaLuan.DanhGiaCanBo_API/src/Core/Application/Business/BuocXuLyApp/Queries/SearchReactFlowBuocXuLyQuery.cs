using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Queries;
public class SearchReactFlowBuocXuLyQuery : IQuery<List<BuocXuLy>>
{
    public DefaultIdType? QuyTrinhXuLyId { get; set; }

}
