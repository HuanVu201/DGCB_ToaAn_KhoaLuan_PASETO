using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Data;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Common.ServiceLogger;
using TD.DanhGiaCanBo.Infrastructure.Common.Services;

namespace TD.DanhGiaCanBo.Infrastructure.Common.Services;
public class ServiceLogger : IServiceLogger
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ILogger<ServiceLogger> _logger;
    //private readonly string? _connectionStr;
    public ServiceLogger(IDapperRepository dapperRepository, IConfiguration configuration, ILogger<ServiceLogger> logger)
    {
        _dapperRepository = dapperRepository;
        _logger = logger;
        //_connectionStr = configuration?.GetValue<string>("ServiceLoggerConnectString");
        //if (_connectionStr.StartsWith("Crypt:"))
        //{
        //    _connectionStr = _connectionStr.Replace("Crypt:", string.Empty);
        //    _connectionStr = Encryption.Decrypt(_connectionStr);
        //}
    }

    private bool Validate()
    {
        //if (_connectionStr == null)
        //{
        //    return false;
        //}

        return true;
    }

    public async Task LogAsync<T>(ServiceLoggerRequestParams req)
        where T : IEnableServiceLogger
    {
        bool hasConnectStr = Validate();
        if (!hasConnectStr)
        {
            _logger.LogError("Chưa cấu hình ServiceLoggerConnectString");
            return;
        }

        try
        {
            //using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            //{
            //    targetConnection.Open();
            //    string sql = @$"                    
            //        INSERT INTO ServiceLogs
            //        (CreatedAt, Service, Sender, Receiver, IsSucceed, Request, Response, MaHoSo) VAlUES
            //        (GetDate(), @Service, @Sender, @Receiver, @IsSucceed, @Request, @Response, @MaHoSo);";
            //    await targetConnection.ExecuteAsync(sql, req);
            //}

        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Thêm log ServiceLogs that bai");
        }
    }

    public async Task LogAuthenAsync(ServiceLogAuthenRequestParams req)
    {
        bool hasConnectStr = Validate();
        if (!hasConnectStr)
        {
            _logger.LogError("Chưa cấu hình ServiceLoggerConnectString");
            return;
        }

        try
        {
            //using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
            //{
            //    targetConnection.Open();
            //    string sql = @$"                   
            //        INSERT INTO LogAuthensDGCB
            //        (CreatedAt, Username, Fullname, TypeLogin, Token, TypeUser, Device, IP) VAlUES
            //        (GetDate(), @Username, @Fullname, @TypeLogin, @Token, @TypeUser, @Device, @IP);";
            //    await targetConnection.ExecuteAsync(sql, req);
            //}
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Thêm log Authen that bai");
        }
    }

    //public async Task<(int totalUsersToday, int newUsersLast15Min)> GetUserOline(ServiceLogAuthenRequestParams req)
    //{
    //    bool hasConnectStr = Validate();
    //    if (!hasConnectStr)
    //    {
    //        _logger.LogError("Chưa cấu hình ServiceLoggerConnectString");
    //        return (0, 0);
    //    }

    //    try
    //    {
    //        using (IDbConnection targetConnection = new SqlConnection(_connectionStr))
    //        {
    //            targetConnection.Open();
    //            // Lấy số người dùng đã đăng nhập trong ngày
    //            string totalUsersTodaySql = @"
    //            SELECT COUNT(DISTINCT Username)
    //            FROM LogAuthensDGCB
    //            WHERE CAST(CreatedAt AS DATE) = CAST(GETDATE() AS DATE);";
    //            int totalUsersToday = await targetConnection.ExecuteScalarAsync<int>(totalUsersTodaySql);
    //            // Lấy số người dùng mới đăng nhập trong 15 phút qua
    //            string newUsersLast15MinSql = @"
    //            SELECT COUNT(DISTINCT Username)
    //            FROM LogAuthensDGCB
    //            WHERE CreatedAt >= DATEADD(MINUTE, -15, GETDATE());";

    //            int newUsersLast15Min = await targetConnection.ExecuteScalarAsync<int>(newUsersLast15MinSql);
    //            return (totalUsersToday, newUsersLast15Min);
    //        }
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "Thêm log Authen that bai");
    //        return (0, 0);
    //    }
    //}
    //public async Task<IEnumerable<LogAuthenInfo>> GetLogAuthenInfoAsync(Guid? userId = null)
    //{
    //    // Kiểm tra kết nối
    //    if (string.IsNullOrEmpty(_connectionStr))
    //    {
    //        _logger.LogError("Chưa cấu hình kết nối cơ sở dữ liệu.");
    //        return Enumerable.Empty<LogAuthenInfo>();
    //    }

    //    try
    //    {
    //        using (IDbConnection dbConnection = new SqlConnection(_connectionStr))
    //        {
    //            await dbConnection.OpenAsync();

    //            string sql = @"
    //            SELECT 
    //                [Id],
    //                [Username],
    //                [Fullname],
    //                [TypeLogin],
    //                [Token],
    //                [TypeUser],
    //                [Device],
    //                [IP],
    //                [CreatedAt]
    //            FROM 
    //                [dbo].[LogAuthensDGCB]
    //            WHERE 
    //                (@UserId IS NULL OR [Username] = @UserId)
    //            ORDER BY [CreatedAt] DESC;";

    //            var logAuthenInfo = await dbConnection.QueryAsync<LogAuthenInfo>(sql, new { UserId = userId });

    //            return logAuthenInfo;
    //        }
    //    }
    //    catch (Exception ex)
    //    {
    //        _logger.LogError(ex, "Lỗi khi lấy thông tin đăng nhập.");
    //        return Enumerable.Empty<LogAuthenInfo>();
    //    }
    //}
}
