using MediatR;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Queries;

public class SearchGroupQueryWhereBuilder
{
    public static string Build(SearchMauPhieuDanhGiaQuery req)
    {
        string where = string.Empty;

        if (!string.IsNullOrEmpty(req.Ten))
            where += " AND mpdg.Ten like N'%' + @Ten+ '%'";
        //if (req.IsRootGroupCode == true)
        //    where += " AND OfGroupCode is null";
        if (!string.IsNullOrEmpty(req.MaBoTieuChi))
        {
            where += " AND mpdg.MaBoTieuChi = @MaBoTieuChi";
        }
        if (!string.IsNullOrEmpty(req.LoaiThoiGian))
        {
            where += " AND btc.LoaiThoiGian = @LoaiThoiGian";
        }
        if (!string.IsNullOrEmpty(req.LevelBoTieuChi))
        {
            where += " AND mpdg.LevelBoTieuChi = @LevelBoTieuChi";
        }
        else
        {
            where += " AND mpdg.LevelBoTieuChi Is Null";
        }
        if (req.Removed == false)
            where += " AND mpdg.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND mpdg.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}
public class SearchMauPhieuDanhGiaQueryHandler : IRequestHandler<SearchMauPhieuDanhGiaQuery, PaginationResponse<MauPhieuDanhGiaDto>>
{
    private readonly string groupTableName = "Catalog.Groups";
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public SearchMauPhieuDanhGiaQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<PaginationResponse<MauPhieuDanhGiaDto>> Handle(SearchMauPhieuDanhGiaQuery request, CancellationToken cancellationToken)
    {

        var where = SearchGroupQueryWhereBuilder.Build(request);
        var sql = $@"SELECT mpdg.ID, mpdg.Ma,mpdg.Ten,mpdg.XepLoai,mpdg.MaBoTieuChi,mpdg.DiemDatYeuCau,mpdg.DiemThuong,mpdg.DiemTru,mpdg.MaCapDanhGia,mpdg.CapDanhGia,mpdg.MaDonViDanhGia,mpdg.DonViDanhGia,mpdg.MaChucVuDanhGia,mpdg.TenChucVuDanhGia,mpdg.MaChucDanhDanhGia,mpdg.TenChucDanhDanhGia,mpdg.MaCaNhanDanhGia,mpdg.CaNhanDanhGia,
                            btc.LoaiThoiGian
                     FROM {TableNames.MauPhieuDanhGias} mpdg
                     Left Join {TableNames.BoTieuChuans} btc On mpdg.MaBoTieuChi = btc.MaBoTieuChi
{where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<MauPhieuDanhGiaDto>(sql, request.PageSize, "Ten", cancellationToken, request.PageNumber, request);
        return data;
    }
}
