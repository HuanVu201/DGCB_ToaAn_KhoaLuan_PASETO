using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos;
using TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;

public class SearchQuyTrinhXuLyQueryWhereBuilder
{
    public static string Build(SearchQuyTrinhXuLyQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TenQuyTrinh))
            where += " AND qtxl.TenQuyTrinh Like N'%' + @TenQuyTrinh + '%'";
        if (!string.IsNullOrEmpty(req.OfficeCode))
            where += $" AND EXISTS (select top 1 DonViId from {TableNames.DonViSuDungQuyTrinhXuLys} dv where dv.QuyTrinhXuLyId = qtxl.id and dv.DonViId = @OfficeCode)";
        if(req.LaQuyTrinhDonVi == true)
            where += " AND qtxl.LaQuyTrinhDonVi = 1";
        else if (req.LaQuyTrinhDonVi == false)
            where += " AND qtxl.LaQuyTrinhDonVi = 0";
        if (req.Removed == false)
            where += " AND qtxl.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND qtxl.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where.TrimStart().StartsWith("EXISTS"))
            where = where.TrimStart().Substring("EXISTS".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchQuyTrinhXuLyQueryHandler : IRequestHandler<SearchQuyTrinhXuLyQuery, PaginationResponse<DanhSachQuyTrinhXuLyDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<Group> _repositoryGroup;
    public SearchQuyTrinhXuLyQueryHandler(IDapperRepository dapperRepository, IRepository<Group> repositoryGroup)
    {
        _dapperRepository = dapperRepository;
        _repositoryGroup = repositoryGroup;
    }
    public async Task<PaginationResponse<DanhSachQuyTrinhXuLyDto>> Handle(SearchQuyTrinhXuLyQuery request, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrEmpty(request.OfficeCode))
        {
            var donVi = await _repositoryGroup.GetBySpecAsync(new GetByGroupCodeQuerySpec(request.OfficeCode), cancellationToken) ??
            throw new NotFoundException($"Đơn vị với mã {request.OfficeCode} không tồn tại");
            request.OfficeCode = donVi.Id.ToString();
        }
        var where = SearchQuyTrinhXuLyQueryWhereBuilder.Build(request);
        var sql = $@"SELECT qtxl.Id, qtxl.TenQuyTrinh, qtxl.ThuTu, qtxl.CreatedOn FROM {TableNames.QuyTrinhXuLys} qtxl
                    {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhSachQuyTrinhXuLyDto>(sql, request.PageSize, "ThuTu ASC, CreatedOn DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}
