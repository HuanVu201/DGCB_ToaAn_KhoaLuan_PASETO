using Microsoft.Extensions.Configuration;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Catalog.LogAuthen.Queries;
using TD.DanhGiaCanBo.Application.Catalog.LogAuthen.Service;
using TD.DanhGiaCanBo.Application.Catalog.LogAuthen;
using TD.DanhGiaCanBo.Catalog.Catalog.LogAuthen.Queries;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Catalog.LogAuthen.Queries;
public class DeleteLogAuThenQueryHandler : IRequestHandler<DeleteLogAuThenQuery, Result>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly string connectionStr;
    private readonly ILogAuthenService _logAuthenService;
    private readonly ILogger<LogAuthenDetailDto> _logger;


    public DeleteLogAuThenQueryHandler(IDapperRepository dapperRepository, IConfiguration configuration, ILogAuthenService logAuthenService, ILogger<LogAuthenDetailDto> logger)
    {
        _dapperRepository = dapperRepository;
        _logAuthenService = logAuthenService;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteLogAuThenQuery request, CancellationToken cancellationToken)
    {
        var sqlUser = $@"SELECT Email, PhoneNumber,TypeUser 
                        FROM [Identity].[Users] 
                        WHERE ( UserName = @UserName )";
        try
        {
            LogAuthenDetailDto data = new LogAuthenDetailDto();
            var authenRes = await _logAuthenService.DeleteLogAuthenDetailAsync(request);
            return (Result)Result.Success();
            throw new Exception("Có lỗi trong quá trình truy vấn thông tin cá nhân LogAuthen Handler");
        }
        catch (Exception ex)
        {
            throw new Exception("Có lỗi trong quá trình truy vấn thông tin cá nhân LogAuthen Handler: " + ex);
        }
    }
}