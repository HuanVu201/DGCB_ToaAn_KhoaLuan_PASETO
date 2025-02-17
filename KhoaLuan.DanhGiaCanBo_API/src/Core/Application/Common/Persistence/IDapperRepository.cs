using System.Data;

namespace TD.DanhGiaCanBo.Application.Common.Persistence;

public interface IDapperRepository : IScopedService
{
    /// <summary>
    /// Get an <see cref="IReadOnlyList{T}"/> using raw sql string with parameters.
    /// </summary>
    /// <typeparam name="T">The type of the entity.</typeparam>
    /// <param name="sql">The sql string.</param>
    /// <param name="param">The paramters in the sql string.</param>
    /// <param name="transaction">The transaction to be performed.</param>
    /// <param name="cancellationToken">The <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
    /// <returns>Returns <see cref="Task"/> of <see cref="IReadOnlyCollection{T}"/>.</returns>
    Task<IReadOnlyList<T>> QueryAsync<T>(string sql, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
    where T : class;

    /// <summary>
    /// Get a <typeparamref name="T"/> using raw sql string with parameters.
    /// </summary>
    /// <typeparam name="T">The type of the entity.</typeparam>
    /// <param name="sql">The sql string.</param>
    /// <param name="param">The paramters in the sql string.</param>
    /// <param name="transaction">The transaction to be performed.</param>
    /// <param name="cancellationToken">The <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
    /// <returns>Returns <see cref="Task"/> of <typeparamref name="T"/>.</returns>
    Task<T?> QueryFirstOrDefaultAsync<T>(string sql, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
    where T : class;

    /// <summary>
    /// Get a <typeparamref name="T"/> using raw sql string with parameters.
    /// </summary>
    /// <typeparam name="T">The type of the entity.</typeparam>
    /// <param name="sql">The sql string.</param>
    /// <param name="param">The paramters in the sql string.</param>
    /// <param name="transaction">The transaction to be performed.</param>
    /// <param name="cancellationToken">The <see cref="CancellationToken"/> to observe while waiting for the task to complete.</param>
    /// <returns>Returns <see cref="Task"/> of <typeparamref name="T"/>.</returns>
    Task<T> QuerySingleAsync<T>(string sql, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
    where T : class;

    Task<T?> QueryFirstOrDefaultObjectAsync<T>(string sql, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
where T : class;

    Task<PaginationResponse<T>> PaginatedListAsync<T>(string sql, int page, int pageSize, CancellationToken cancellationToken = default)
        where T : class;
    Task<PaginationResponse<T>> PaginatedListSingleQueryAsync<T>(string sql, int pageSize, string? orderCol, CancellationToken cancellationToken = default, int page = 1, object? param = null,string? countBy = "ID")
       where T : class;
    Task<int> ExcuteAsync(string sql, object param = null);
     Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TResult>(string sql, Func<TFirst, TSecond, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
where TResult : class;


    Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TThird, TResult>(string sql, Func<TFirst, TSecond, TThird, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
    where TResult : class;


    Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TThird, TFourth, TResult>(string sql, Func<TFirst, TSecond, TThird, TFourth, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
    where TResult : class;


    Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TThird, TFourth, TFifth, TResult>(string sql, Func<TFirst, TSecond, TThird, TFourth, TFifth, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
    where TResult : class;
    Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TThird, TFourth, TFifth, TSixth, TResult>(string sql, Func<TFirst, TSecond, TThird, TFourth, TFifth, TSixth, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
    where TResult : class;
    Task<IEnumerable<TResult>> QueryAsync<TFirst, TSecond, TThird, TFourth, TFifth, TSixth, TSeventh, TResult>(string sql, Func<TFirst, TSecond, TThird, TFourth, TFifth, TSixth, TSeventh, TResult> map, object? param = null, IDbTransaction? transaction = null, CancellationToken cancellationToken = default, string splitOn = "Id")
    where TResult : class;

    Task<int> InsertEntityAsync<TEntity>(TEntity entity, string tableName, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
        where TEntity : IEntity;
    Task<int> InsertEntityIfNotExistAsync<TEntity>(TEntity entity, string tableName, object condition, string whereCondition, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
        where TEntity : IEntity;
    Task<int> UpdateEntityAsync<TEntity>(TEntity entity, object condition, string tableName, IReadOnlyList<string>? onlyUpdateCols, string whereCondition = "", IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
        where TEntity : IEntity;
    Task<int> InsertMultipleEntityAsync<TEntity>(List<TEntity> entity, string tableName, IDbTransaction? transaction = null, CancellationToken cancellationToken = default)
        where TEntity : IEntity;

}