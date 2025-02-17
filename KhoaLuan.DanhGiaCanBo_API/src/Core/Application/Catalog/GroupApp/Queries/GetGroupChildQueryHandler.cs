using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;
using static TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos.ChiTietQuyTrinhXuLyDto;
namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;

public class GetGroupChildQueryWhereBuilder
{

    public static string Build(GetGroupChildQuery req)
    {
        string where = string.Empty;
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }

}
public class GetGroupChildQueryHandler : IQueryHandler<GetGroupChildQuery, List<GroupChildDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public GetGroupChildQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<Result<List<GroupChildDto>>> Handle(GetGroupChildQuery request, CancellationToken cancellationToken)
    {
        var lstData = new List<GroupChildDto>();
        try
        {
         
                string queryNX = $@"SELECT Top 200 Id,Type,GroupCode,GroupName,GroupOrder,Catalog as Category,OfGroupCode,OfGroupName FROM {TableNames.Groups}";
                string whereNX = $@" WHERE Active = 1 AND DeletedOn IS NULL";
               string filter = $@" AND FullCode Like N'%' + @GroupCode + '%'";
                if (!request.GroupCode.Contains("W"))
                {
                    if (request.GroupCode.StartsWith("000.00.00"))
                    {
                        var groupCheck = request.GroupCode.Replace("000.00.00", "");
                        filter = $@" AND GroupCode Like N'%{groupCheck}'";
                        filter += $@" AND GroupCode Like N'000.00.%'";
                    }
                    else if (request.GroupCode.StartsWith("000.00"))
                    {
                        var groupCheck = request.GroupCode.Replace("000.00", "");
                        filter = $@" AND GroupCode Like N'%{groupCheck}'";
                        filter += $@" AND GroupCode Like N'000.%'";
                        
                    }
                    else if (request.GroupCode.StartsWith("000"))
                    {
                        var groupCheck = request.GroupCode.Replace("000", "");
                        filter = $@" AND GroupCode Like N'%{groupCheck}'";
                    }
                    if (!string.IsNullOrEmpty(request.Category))
                    {
                        filter += $" and Catalog = @Category";
                    }
                }         
            lstData = (List<GroupChildDto>)await _dapperRepository.QueryAsync<GroupChildDto>(queryNX + whereNX+ filter, new { GroupCode = request.GroupCode, Category = request.Category }, cancellationToken: cancellationToken);
                if (request.GroupCode.Contains("W"))
                    lstData = lstData.Where(x => x.OfGroupCode == request.GroupCode && !x.GroupCode.Contains("W")).ToList();
             
                
            



        }
        catch (Exception ex)
        {
            return Result<List<GroupChildDto>>.Fail(ex.Message);
        }
        return Result<List<GroupChildDto>>.Success(lstData);
    }
}
