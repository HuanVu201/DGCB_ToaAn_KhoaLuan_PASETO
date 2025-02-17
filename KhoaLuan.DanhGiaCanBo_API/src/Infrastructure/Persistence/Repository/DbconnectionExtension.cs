using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Common.Models;
using System.Data;
using Dapper;

namespace TD.DanhGiaCanBo.Infrastructure.Persistence.Repository;
public static class IDbconnectionExtension
{
    public static async Task<PaginationResponse<T>> PaginatedListSingleQueryAsync<T>(this IDbConnection dbConnection, string sql, int pageSize, string orderCol, CancellationToken cancellationToken = default, int page = 1, object? param = null, string? countBy = "ID")
          where T : class
    {
        //sql = sql.Replace("@tenant", _dbContext.TenantInfo.Id);
        var results = new PaginationResponse<T>();
        results.PageSize = pageSize;
        results.CurrentPage = page;
        results.TotalPages = 0;
        results.TotalCount = 0;
        var paging = $" OFFSET {(page - 1) * pageSize} ROWS FETCH NEXT {pageSize} ROWS ONLY";
        var queryFull = $"WITH Main AS({sql}), Total AS (SELECT COUNT({countBy}) AS[TotalCount] FROM Main) SELECT * FROM Main, Total ORDER BY Main.{orderCol} {paging}";
        var res = await dbConnection.QueryAsync<T>(queryFull, param);
        var data = res.ToList();
        if (data.Count > 0)
        {
            JObject jobj = JObject.Parse(JsonConvert.SerializeObject(data.First()));
            results.Data = data;
            results.TotalCount = int.Parse(jobj["TotalCount"].ToString());
            results.TotalPages = (int)Math.Ceiling(results.TotalCount / (double)pageSize);
        }
        return results;
    }
}
