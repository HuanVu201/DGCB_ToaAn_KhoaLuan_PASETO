namespace TD.DanhGiaCanBo.Application.Common.ServiceLogger;
public interface IServiceLogger : IScopedService
{
    Task LogAsync<T>(ServiceLoggerRequestParams req)
        where T : IEnableServiceLogger;
    Task LogAuthenAsync(ServiceLogAuthenRequestParams req);

    /// <summary>
    /// Lấy số lượng người dùng đã đăng nhập trong ngày và số người dùng mới đăng nhập trong 15 phút qua.
    /// </summary>
    /// <returns>Tuple chứa số lượng người dùng đã đăng nhập trong ngày và số lượng người dùng mới trong 15 phút.</returns>
    //Task<(int totalUsersToday, int newUsersLast15Min)> GetUserOnlineAsync();
}

public interface IEnableServiceLogger
{

}