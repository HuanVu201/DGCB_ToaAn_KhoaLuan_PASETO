using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;

public class UpdateLanhDaoDaXemQueryWhereBuilder
{
    public static string Build(UpdateLanhDaoDaXemDGDVQuery req)
    {
        string where = string.Empty;
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class UpdateLanhDaoDaXemDGDVQueryHandler : IRequestHandler<UpdateLanhDaoDaXemDGDVQuery, PaginationResponse<DanhGiaDonViDto>>
{
    private readonly IDapperRepository _dapperRepository;
    public UpdateLanhDaoDaXemDGDVQueryHandler(IDapperRepository dapperRepository)
    {
        _dapperRepository = dapperRepository;
    }

    public async Task<PaginationResponse<DanhGiaDonViDto>> Handle(UpdateLanhDaoDaXemDGDVQuery request, CancellationToken cancellationToken)
    {
        var where = UpdateLanhDaoDaXemQueryWhereBuilder.Build(request);
        var sql = $"UPDATE [Business].[DanhGiaDonVis] SET [DaXem] = @DaXem WHERE [Id] = @ID";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhGiaDonViDto>(sql, request.PageSize, "ID", cancellationToken, request.PageNumber, request);
        return data;
    }
}
