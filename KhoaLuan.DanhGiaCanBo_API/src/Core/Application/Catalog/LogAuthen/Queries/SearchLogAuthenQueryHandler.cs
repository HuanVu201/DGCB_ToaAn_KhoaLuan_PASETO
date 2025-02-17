using Microsoft.Extensions.Configuration;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Identity.Users;
using TD.DanhGiaCanBo.Catalog.Catalog.LogAuthen.Queries;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using TD.DanhGiaCanBo.Application.Catalog.LogAuthen;
using TD.DanhGiaCanBo.Application.Catalog.LogAuthen.Service;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAuthen.Queries;

public class SearchLogAuthenQueryWhereBuilder
{
    public static string Build(SearchLogAuthenQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.UserName))
            where += " AND UserName Like N'%' + @UserName + '%'";
        if (!string.IsNullOrEmpty(req.FullName))
            where += " AND FullName Like N'%' + @FullName + '%'";
        if (!string.IsNullOrEmpty(req.TypeLogin))
            where += " AND TypeLogin = @TypeLogin";
        if (!string.IsNullOrEmpty(req.TypeUser))
            where += " AND TypeUser Like N'%' + @TypeUser + '%'";
        if (!string.IsNullOrEmpty(req.Device))
            where += " AND Device = @Device";
        if (!string.IsNullOrEmpty(req.IP))
            where += " AND IP Like N'%' + @IP + '%'";
        if (req.TuNgay is not null)
            where += " AND CreatedAt >= @TuNgay ";
        if (req.DenNgay is not null)
            where += " AND CreatedAt <= @DenNgay ";
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchLogAutheniQueryHandler : IRequestHandler<SearchLogAuthenQuery, PaginationResponse<LogAuthenDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly string connectionStr;
    private readonly ILogAuthenService _logAuthenService;
    private readonly ILogger<LogAuthenDto> _logger;


    public SearchLogAutheniQueryHandler(IDapperRepository dapperRepository, IConfiguration configuration, ILogAuthenService logAuthenService, ILogger<LogAuthenDto> logger)
    {
        _dapperRepository = dapperRepository;
        _logAuthenService = logAuthenService;
        _logger = logger;
    }

    public async Task<PaginationResponse<LogAuthenDto>> Handle(SearchLogAuthenQuery request, CancellationToken cancellationToken)
    {
        var where = SearchLogAuthenQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id, UserName, FullName, TypeLogin, TypeUser, Device, IP, CreatedAt FROM [LogAuthensDGCB] {where}";

        try
        {
            var data = await _logAuthenService.SearchLogAuthenAsync(sql, request, cancellationToken);
            return data;
        }
        catch (Exception ex)
        {
            throw new Exception("Có lỗi trong quá trình truy vấn LogAuthen Handler: " + ex);
        }
    }
}