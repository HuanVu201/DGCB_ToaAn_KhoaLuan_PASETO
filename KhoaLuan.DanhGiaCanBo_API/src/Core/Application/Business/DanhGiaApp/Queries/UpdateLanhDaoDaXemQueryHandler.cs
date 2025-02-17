using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class UpdateLanhDaoDaXemQueryWhereBuilder
{
    public static string Build(UpdateLanhDaoDaXemQuery req)
    {
        string where = string.Empty;
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class UpdateLanhDaoDaXemQueryHandler : IRequestHandler<UpdateLanhDaoDaXemQuery, PaginationResponse<DanhGiaDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public UpdateLanhDaoDaXemQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<DanhGiaDto>> Handle(UpdateLanhDaoDaXemQuery request, CancellationToken cancellationToken)
    {
        var where = UpdateLanhDaoDaXemQueryWhereBuilder.Build(request);
        var sql = $"UPDATE [Business].[DanhGias] SET [DaXem] = @DaXem WHERE [Id] = @ID";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhGiaDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
