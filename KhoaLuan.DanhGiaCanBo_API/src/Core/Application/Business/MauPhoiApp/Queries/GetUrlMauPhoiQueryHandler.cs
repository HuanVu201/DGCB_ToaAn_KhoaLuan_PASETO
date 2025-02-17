using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
public class GetUrlMauPhoiQueryHandler : IRequestHandler<GetUrlMauPhoiQuery, string>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public GetUrlMauPhoiQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<string> Handle(GetUrlMauPhoiQuery request, CancellationToken cancellationToken)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(request.LoaiPhoi))
            where += "AND LoaiPhoi = @LoaiPhoi ";
        if (!string.IsNullOrEmpty(request.MaMauPhoi))
            where += "AND MaMauPhoi = @MaMauPhoi ";
        where += "AND DeletedOn is null ";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);

        string userId = _currentUser.GetUserId().ToString();
        string urlMauPhoiValue = string.Empty;
        string sql = $@"Select * from [Business].[MauPhois] where {where}";
        var mauPhois = await _dapperRepository.QueryAsync<MauPhoiDto>(sql, new
        {
            MaMauPhoi = request.MaMauPhoi,
            LoaiPhoi = request.LoaiPhoi
        });

        var mauPhoiCustoms = mauPhois.Where(x => !string.IsNullOrEmpty(x.CustomerId) && x.CustomerId.ToLower() == userId.ToLower());
        if (mauPhoiCustoms.Count() > 0)
        {
            string res = GetUrlMauPhoiSpecQuery(mauPhoiCustoms.ToList(), request);
            if (!string.IsNullOrEmpty(res))
            {
                urlMauPhoiValue = res;
            }
            else
            {
                urlMauPhoiValue = mauPhois.FirstOrDefault(x => !string.IsNullOrEmpty(x.CustomerId) && x.CustomerId.ToLower() == userId.ToLower()).UrlMauPhoi ?? string.Empty;
            }
        }
        else
        {
            urlMauPhoiValue = GetUrlMauPhoiSpecQuery(mauPhois, request);
        }

        return urlMauPhoiValue;
    }

    public string GetUrlMauPhoiSpecQuery(IReadOnlyList<MauPhoiDto> mauPhois, GetUrlMauPhoiQuery request)
    {
        string urlMauPhoiValue = string.Empty;

        var mauPhoiRes = mauPhois.FirstOrDefault(x => !string.IsNullOrEmpty(x.MaDonVi) && !string.IsNullOrEmpty(request.MaDonVi) && x.MaDonVi.Contains(request.MaDonVi));
        if (mauPhoiRes != null)
        {
            urlMauPhoiValue = mauPhoiRes.UrlMauPhoi ?? string.Empty;
        }
        else
        {
            var mauPhoi = mauPhois.FirstOrDefault(x => x.LaPhoiMacDinh == true);
            if (mauPhoi != null)
                urlMauPhoiValue = mauPhoi.UrlMauPhoi ?? string.Empty;
            else
                urlMauPhoiValue = string.Empty;
        }

        return urlMauPhoiValue;
    }
}
