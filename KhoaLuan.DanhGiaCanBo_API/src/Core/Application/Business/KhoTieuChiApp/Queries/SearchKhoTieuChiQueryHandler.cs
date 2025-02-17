using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp;
using TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Queries;

public class SearchKhoTieuChiQueryWhereBuilder
{
    public static string Build(SearchKhoTieuChiQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND Ten Like N'%' + @Ten + '%'";
        if (!string.IsNullOrEmpty(req.Id))
            where += " AND Id = @Id";
        if(req.isParrentCode == true)
        {
            where += " AND ParrentCode Is Null ";
        }    
        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE  ({where})";
        return where;
    }
}
public class SearchKhoTieuChiQueryHandler : IRequestHandler<SearchKhoTieuChiQuery, PaginationResponse<KhoTieuChiDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchKhoTieuChiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<KhoTieuChiDto>> Handle(SearchKhoTieuChiQuery request, CancellationToken cancellationToken)
    {
        var where = SearchKhoTieuChiQueryWhereBuilder.Build(request);
        var sql = $@"SELECT Id,MaTieuChi,TenTieuChi,SuDung,DiemTru,ThangDiem,DiemThuong,DiemLiet,DuocChamNhieuLan,KiemNhiem,DonViTinh,SoLan,GhiChu,ParrentCode,ParrentName,FullCode,JsonDiemLiet,JsonLienKet,STT,ThuTu,
           CASE
          WHEN [STT] IS NOT NULL THEN 
              CAST([STT] AS VARCHAR) + '.' + [TenTieuChi] + ' (' + 
              CASE 
                  WHEN [ThangDiem] IS NOT NULL THEN CAST([ThangDiem] AS VARCHAR) 
                  ELSE '0' 
              END + N' điểm)'
          ELSE 
              [TenTieuChi] + ' (' + 
              CASE 
                  WHEN [ThangDiem] IS NOT NULL THEN CAST([ThangDiem] AS VARCHAR) 
                  ELSE '0' 
              END + N' điểm)'
      END AS TitleView
FROM {TableNames.KhoTieuChis} {where}";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<KhoTieuChiDto>(sql, request.PageSize, "ThuTu", cancellationToken, request.PageNumber, request);
        return data;
    }
}
