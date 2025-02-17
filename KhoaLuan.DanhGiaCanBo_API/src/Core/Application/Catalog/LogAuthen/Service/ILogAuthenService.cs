using TD.DanhGiaCanBo.Application.Catalog.LogAuthen.Queries;
using TD.DanhGiaCanBo.Catalog.Catalog.LogAuthen.Queries;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAuthen.Service;
public interface ILogAuthenService : IScopedService
{
    public Task<PaginationResponse<LogAuthenDto>> SearchLogAuthenAsync(string sql, SearchLogAuthenQuery req, CancellationToken cancellationToken);
    public Task<LogAuthenDetailDto> GetLogAuthenDetailAsync(GetLogAuthenQuery req);
    public Task<Result<CountAccessPortalDto>> CountAccessPortal(string sqlQuery);

    public Task<Result> DeleteLogAuthenDetailAsync(DeleteLogAuThenQuery req);

}

public class CountAccessPortalDto
{
    public int CountAccessPortal { get; set; }
    public int CountAccessTotalPortal { get; set; }
}