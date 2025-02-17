using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Queries;
public class SearchReactFlowLienKetBuocXuLyQuery : IQuery<List<LienKetBuocXuLy>>
{
    public DefaultIdType? QuyTrinhXuLyId { get; set; }
    public DefaultIdType? SourceId { get; set; }
    public DefaultIdType? TargetId { get; set; }
}

public class SearchDanhSachBuocXuLyTiepRequest
{
    public DefaultIdType SourceId { get; set; }
}

public class SearchDanhSachBuocXuLyTiepByQuyTrinhRequest
{
    public DefaultIdType QuyTrinhXuLyId { get; set; }
}