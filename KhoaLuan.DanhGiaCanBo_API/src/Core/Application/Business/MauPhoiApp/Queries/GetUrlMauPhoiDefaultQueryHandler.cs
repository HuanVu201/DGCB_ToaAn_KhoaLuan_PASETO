using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries; public class GetUrlMauPhoiDefaultQueryHandler : IRequestHandler<GetUrlMauPhoiDefaultQuery, string>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public GetUrlMauPhoiDefaultQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<string> Handle(GetUrlMauPhoiDefaultQuery request, CancellationToken cancellationToken)
    {
        string where = " LaPhoiMacDinh = '1' ";
        if (!string.IsNullOrEmpty(request.LoaiPhoi))
            where += "AND LoaiPhoi = @LoaiPhoi ";
        if (!string.IsNullOrEmpty(request.MaMauPhoi))
            where += "AND MaMauPhoi = @MaMauPhoi ";
        where += "AND DeletedOn is null ";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);

        string sql = $@"Select * from [Business].[MauPhois] where {where}";
        var mauPhois = await _dapperRepository.QueryAsync<MauPhoiDto>(sql, new
        {
            MaMauPhoi = request.MaMauPhoi,
            LoaiPhoi = request.LoaiPhoi
        });

        return mauPhois[0].UrlMauPhoi ?? string.Empty;
    }
}