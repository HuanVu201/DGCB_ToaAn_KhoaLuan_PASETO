using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Common.Caching;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Queries;

public class GetPublicConfigQueryHandler : IRequestHandler<GetPublicConfigQuery, PaginationResponse<PublicConfigDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICacheService _cacheService;
    public GetPublicConfigQueryHandler(IDapperRepository dapperRepository, ICacheService cacheService)
    {
       _dapperRepository = dapperRepository;
        _cacheService = cacheService;
    }
    public async Task<PaginationResponse<PublicConfigDto>> Handle(GetPublicConfigQuery request, CancellationToken cancellationToken)
    {
        string sql = $"SELECT Id, Code, Content FROM Catalog.Configs WHERE DeletedOn is null AND Module = 'public'";
        var data = await _cacheService.GetOrSetAsync(
            JsonConvert.SerializeObject(request),
            async () => await _dapperRepository.PaginatedListSingleQueryAsync<PublicConfigDto>(sql, request.PageSize, "Id", cancellationToken, request.PageNumber, request),
            TimeSpan.FromMinutes(1),
            cancellationToken);
        return data;
    }
}
