using System.Data;
using Dapper;
using Finbuckle.MultiTenant.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Common.Models;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Common.Contracts;
using TD.DanhGiaCanBo.Infrastructure.Persistence.Context;
using System.Text.RegularExpressions;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Reflection;
using TD.DanhGiaCanBo.Domain.Business;
using System;

namespace TD.DanhGiaCanBo.Infrastructure.Persistence.Repository;

public class DapperRepository : IDapperRepository
{
    private readonly ApplicationDbContext _dbContext;

    public DapperRepository(ApplicationDbContext dbContext) => _dbContext = dbContext;

    public async Task<int> ExcuteAsync(string sql, object param = null)
    {
        return await _dbContext.Connection.ExecuteAsync(sql, param);
    }

    public async Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TResult>(string sql, Func<TFirst, TSecond, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
    where TResult : class
    {
        return await _dbContext.Connection.QueryAsync<TFirst, TSecond, TResult>(sql, map, param, transaction, splitOn: splitOn);
    }
    public async Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TThird, TResult>(string sql, Func<TFirst, TSecond, TThird, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
    where TResult : class
    {
        return await _dbContext.Connection.QueryAsync<TFirst, TSecond, TThird, TResult>(sql, map, param, transaction, splitOn: splitOn);
    }
    public async Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TThird, TFourth, TResult>(string sql, Func<TFirst, TSecond, TThird, TFourth, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
    where TResult : class
    {
        return await _dbContext.Connection.QueryAsync<TFirst, TSecond, TThird, TFourth, TResult>(sql, map, param, transaction, splitOn: splitOn);
    }
    public async Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TThird, TFourth, TFifth, TResult>(string sql, Func<TFirst, TSecond, TThird, TFourth, TFifth, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
    where TResult : class
    {
        return await _dbContext.Connection.QueryAsync<TFirst, TSecond, TThird, TFourth, TFifth, TResult>(sql, map, param, transaction, splitOn: splitOn);
    }
    public async Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TThird, TFourth, TFifth, TSixth, TResult>(string sql, Func<TFirst, TSecond, TThird, TFourth, TFifth, TSixth, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
    where TResult : class
    {
        return await _dbContext.Connection.QueryAsync<TFirst, TSecond, TThird, TFourth, TFifth, TSixth, TResult>(sql, map, param, transaction, splitOn: splitOn);
    }
    public async Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TThird, TFourth, TFifth, TSixth, TSeventh, TResult>(string sql, Func<TFirst, TSecond, TThird, TFourth, TFifth, TSixth, TSeventh, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
    where TResult : class
    {
        return await _dbContext.Connection.QueryAsync<TFirst, TSecond, TThird, TFourth, TFifth, TSixth, TSeventh, TResult>(sql, map, param, transaction, splitOn: splitOn);
    }
    public async Task<IReadOnlyList<T>> QueryAsync<T>(string sql, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
    where T : class =>
        (await _dbContext.Connection.QueryAsync<T>(sql, param, transaction))
            .AsList();

    public async Task<T?> QueryFirstOrDefaultAsync<T>(string sql, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
    where T : class
    {
        if (_dbContext.Model.GetMultiTenantEntityTypes().Any(t => t.ClrType == typeof(T)))
        {
            sql = sql.Replace("@tenant", _dbContext.TenantInfo.Id);
        }

        return await _dbContext.Connection.QueryFirstOrDefaultAsync<T>(sql, param, transaction);
    }

    public Task<T> QuerySingleAsync<T>(string sql, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
    where T : class
    {
        if (_dbContext.Model.GetMultiTenantEntityTypes().Any(t => t.ClrType == typeof(T)))
        {
            sql = sql.Replace("@tenant", _dbContext.TenantInfo.Id);
        }

        return _dbContext.Connection.QuerySingleAsync<T>(sql, param, transaction);
    }


    public async Task<T?> QueryFirstOrDefaultObjectAsync<T>(string sql, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
  where T : class
    {
        sql = sql.Replace("@tenant", _dbContext.TenantInfo.Id);
        return await _dbContext.Connection.QueryFirstOrDefaultAsync<T>(sql, param, transaction);
    }


    public async Task<PaginationResponse<T>> PaginatedListAsync<T>(string sql, int page, int pageSize, CancellationToken cancellationToken = default)
            where T : class
    {
        sql = sql.Replace("@tenant", _dbContext.TenantInfo.Id);
        var results = new PaginationResponse<T>();
        results.PageSize = pageSize;
        results.CurrentPage = page;

        using (var multi = await _dbContext.Connection.QueryMultipleAsync(sql))
        {
            results.Data = (await multi.ReadAsync<T>()).ToList();
            int count = multi.ReadFirst<int>();
            results.TotalCount = count;
            results.TotalPages = (int)Math.Ceiling(count / (double)pageSize);
        }

        return results;
    }

    public async Task<PaginationResponse<T>> PaginatedListSingleQueryAsync<T>(string sql, int pageSize, string orderCol, CancellationToken cancellationToken = default, int page = 1, object? param = null, string? countBy = "ID")
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
        var res = await _dbContext.Connection.QueryAsync<T>(queryFull, param);
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
    public async Task<int> InsertEntityIfNotExistAsync<TEntity>(TEntity entity, string tableName, object condition, string whereCondition, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
        where TEntity : IEntity
    {
        var insertCol = new List<string>() { };
        var insertColValue = new List<string>() { };
        var parameters = new Dictionary<string, object>() { };
        foreach (PropertyInfo property in typeof(TEntity).GetProperties())
        {
            object? value = property.GetValue(entity);

            if (value != null &&
                (!(value is string str && string.IsNullOrEmpty(str)) ||
                !(value is Guid guid && guid == Guid.Empty) ||
                !(value is DateTime date && date == DateTime.MinValue)))
            {
                string propertyName = property.Name;
                if (propertyName == nameof(entity.DomainEvents))
                {
                    continue;
                }
                object propertyValue;
                if (propertyName == "Id")
                {
                    propertyValue = Guid.NewGuid();
                }
                else
                {
                    propertyValue = value;
                }
                insertCol.Add(propertyName);
                parameters.Add("@" + propertyName, propertyValue);
                insertColValue.Add("@" + propertyName);
            }
        }
        if (!string.IsNullOrEmpty(whereCondition))
        {
            foreach (PropertyInfo property in condition.GetType().GetProperties())
            {
                var value = property.GetValue(condition);
                parameters.Add("@" + property.Name, value);
            }
        }
        var dbArgs = new DynamicParameters(parameters);
        string insertSql = @$"IF NOT EXISTS (SELECT Top 1 1 FROM {tableName} WHERE {whereCondition})
                            BEGIN
                                INSERT INTO {tableName} ({string.Join(", ", insertCol)}) VALUES ({string.Join(", ", insertColValue)});
                            END";
        int effectedRowed = await _dbContext.Connection.ExecuteAsync(insertSql, dbArgs);
        return effectedRowed;
    }
    public async Task<int> InsertEntityAsync<TEntity>(TEntity entity, string tableName, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
        where TEntity : IEntity
    {
        var insertCol = new List<string>() { };
        var insertColValue = new List<string>() { };
        var parameters = new Dictionary<string, object>() { };
        foreach (PropertyInfo property in typeof(TEntity).GetProperties())
        {
            object? value = property.GetValue(entity);

            if (value != null &&
                (!(value is string str && string.IsNullOrEmpty(str)) ||
                !(value is Guid guid && guid == Guid.Empty) ||
                !(value is DateTime date && date == DateTime.MinValue)))
            {
                string propertyName = property.Name;
                if (propertyName == nameof(entity.DomainEvents))
                {
                    continue;
                }
                object propertyValue;
                if (propertyName == "Id")
                {
                    propertyValue = Guid.NewGuid();
                }
                else
                {
                    propertyValue = value;
                }
                insertCol.Add(propertyName);
                parameters.Add("@" + propertyName, propertyValue);
                insertColValue.Add("@" + propertyName);
            }
        }
        var dbArgs = new DynamicParameters(parameters);
        string insertSql = $"INSERT INTO {tableName} ({string.Join(", ", insertCol)}) VALUES ({string.Join(", ", insertColValue)});";

        int effectedRowed = await _dbContext.Connection.ExecuteAsync(insertSql, dbArgs);
        return effectedRowed;
    }
    public async Task<int> InsertMultipleEntityAsync<TEntity>(List<TEntity> entities, string tableName, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
        where TEntity : IEntity
    {
        var insertCol = new List<string>();
        var insertColValues = new List<string>();
        var parameters = new Dictionary<string, object>();

        for (int i = 0; i < entities.Count; i++)
        {
            var entity = entities[i];
            var insertColValue = new List<string>();

            foreach (PropertyInfo property in typeof(TEntity).GetProperties())
            {
                object? value = property.GetValue(entity);

                if (value != null &&
                    (!(value is string str && string.IsNullOrEmpty(str)) ||
                    !(value is Guid guid && guid == Guid.Empty) ||
                    !(value is DateTime date && date == DateTime.MinValue)))
                {
                    string propertyName = property.Name;
                    if (propertyName == nameof(entity.DomainEvents))
                    {
                        continue;
                    }
                    object propertyValue;
                    if (propertyName == "Id")
                    {
                        propertyValue = Guid.NewGuid();
                    }
                    else
                    {
                        propertyValue = value;
                    }

                    if (i == 0)
                    {
                        insertCol.Add(propertyName);
                    }

                    string parameterName = "@" + propertyName + i;
                    parameters.Add(parameterName, propertyValue);
                    insertColValue.Add(parameterName);
                }
            }
            insertColValues.Add("(" + string.Join(", ", insertColValue) + ")");
        }

        var dbArgs = new DynamicParameters(parameters);
        string insertSql = $"INSERT INTO {tableName} ({string.Join(", ", insertCol)}) VALUES {string.Join(", ", insertColValues)};";

        int effectedRowed = await _dbContext.Connection.ExecuteAsync(insertSql, dbArgs);
        return effectedRowed;
    }
    public async Task<int> UpdateEntityAsync<TEntity>(TEntity entity, object condition, string tableName, IReadOnlyList<string>? onlyUpdateCols, string whereCondition = "", IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
        where TEntity : IEntity
    {
        var updateCol = new List<string>() { };
        var parameters = new Dictionary<string, object>() { };

        foreach (PropertyInfo property in typeof(TEntity).GetProperties())
        {
            //if (!(onlyUpdateCols.Count != null&& onlyUpdateCols.Count > 0 && onlyUpdateCols.Any(x => x == property.Name)))
            //{
            //    continue;
            //}
            object? value = property.GetValue(entity);
            if (value != null &&
                (!(value is string str && string.IsNullOrEmpty(str)) ||
                !(value is Guid guid && guid == Guid.Empty) ||
                !(value is DateTime date && date == DateTime.MinValue)))
            {
                string propertyName = property.Name;
                if (propertyName == nameof(entity.DomainEvents))
                {
                    continue;
                }
                object propertyValue;

                // Xử lý riêng cho kiểu DateTime
                //if (value is DateTime)
                //{
                //    propertyValue = value; // Chuyển đổi DateTime thành chuỗi để sử dụng trong câu lệnh SQL
                //}
                //else if (value is Guid)
                //{
                //    propertyValue = $"'{value}'"; // Chuyển đổi Guid thành chuỗi để sử dụng trong câu lệnh SQL
                //}
                //else if (value is int)
                //{
                //    propertyValue = value.ToString(); // Chuyển đổi int thành chuỗi để sử dụng trong câu lệnh SQL
                //}
                //// Xử lý riêng cho kiểu bool
                //else if (value is bool)
                //{
                //    propertyValue = ((bool)value) ? "1" : "0"; // Chuyển đổi bool thành 1 hoặc 0 để sử dụng trong câu lệnh SQL
                //}
                //else
                //{
                //    propertyValue = $"'{value}'"; // Xử lý các kiểu dữ liệu còn lại
                //}
                var valueName = "@" + propertyName;
                updateCol.Add($"{propertyName} = {valueName}");
                parameters.Add(valueName, value);
            }
        }
        if (!string.IsNullOrEmpty(whereCondition))
        {
            foreach (PropertyInfo property in condition.GetType().GetProperties())
            {
                var value = property.GetValue(condition);
                parameters.Add("@" + property.Name, value);
            }
        }

        string updateSql = $"UPDATE {tableName} SET {string.Join(", ", updateCol)} {(string.IsNullOrEmpty(whereCondition) ? "" : $"WHERE {whereCondition}")}";
        var dbArgs = new DynamicParameters(parameters);

        int effectedRowed = await _dbContext.Connection.ExecuteAsync(updateSql, dbArgs);
        return effectedRowed;
    }

 
}