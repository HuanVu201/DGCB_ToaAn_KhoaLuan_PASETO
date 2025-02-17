using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Queries;

public class SearchKhieuNaiQueryWhereBuilder
{
    public static string Build(SearchKhieuNaiDanhGiaQuery req, string? userGroupId)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.LyDo))
            where += " AND hs.LyDo Like N'%' + @LyDo + '%'";
        if (!string.IsNullOrEmpty(req.HoTenDanhGia))
            where += " AND dg.HoVaTen Like N'%' + @HoTenDanhGia + '%'";
        if (!string.IsNullOrEmpty(req.ThoiGian))
            where += " AND dg.ThoiGian = @ThoiGian";
        if (!string.IsNullOrEmpty(req.TrangThai))
            where += " AND hs.TrangThai = @TrangThai";
        if (!string.IsNullOrEmpty(req.MaDonViCha))
            where += " AND hs.MaDonViCha = @MaDonViCha";
        if (!string.IsNullOrEmpty(req.MaDonVi))
            where += " AND hs.MaDonVi = @MaDonVi";
        if (!string.IsNullOrEmpty(req.NamDanhGia))
            where += " AND dg.NamDanhGia = @NamDanhGia";
        if (!string.IsNullOrEmpty(req.LoaiThoiGian))
            where += " AND dg.LoaiThoiGian = @LoaiThoiGian";
     
        string tuNgay = req.TuNgay.HasValue ? req.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = req.DenNgay.HasValue ? req.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;
        if (!string.IsNullOrEmpty(tuNgay))
            where += $" AND CONVERT(DATE,hs.CreatedOn,23)  >= '{tuNgay}' ";

        if (!string.IsNullOrEmpty(denNgay))
            where += $" AND CONVERT(DATE,hs.CreatedOn,23)  <= '{denNgay}' ";

        if (req.GetDataCurrentUser == true)
        {
            if (!string.IsNullOrEmpty(userGroupId))
                where += $" AND (hs.CreatedBy = '{userGroupId}' )";
        }

        if (req.FilterByUserRole == true)
        {
            where += $" AND (hs.TrangThai = N'Chờ xử lý' OR hs.TrangThai = N'Đã xử lý') AND dg.NguoiDanhGiaId = '{userGroupId}'";
        }

        if (req.Removed == false)
            where += " AND hs.DeletedOn is null AND dg.DeletedOn is null AND SuDung = 1 ";
        else if (req.Removed == true)
            where += " AND hs.DeletedOn is not null";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchKhieuNaiDanhGiaQueryHandler : IRequestHandler<SearchKhieuNaiDanhGiaQuery, PaginationResponse<KhieuNaiDanhGiaDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public SearchKhieuNaiDanhGiaQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<KhieuNaiDanhGiaDto>> Handle(SearchKhieuNaiDanhGiaQuery request, CancellationToken cancellationToken)
    {
        string userGroupId = _currentUser.GetUserGroupId() ?? string.Empty;
        string where = SearchKhieuNaiQueryWhereBuilder.Build(request, userGroupId);
        string sql = $@"SELECT hs.Id,hs.LyDo, hs.DinhKemKhieuNai, hs.TrangThai, hs.KetQua, hs.MaDonVi, hs.MaDonViCha, hs.DinhKemKetQua, hs.CreatedOn,
                        dg.LoaiThoiGian, dg.ThoiGian, dg.NamDanhGia, dg.HoVaTen, dg.TenPhongBan, dg.TenDonVi, dg.ChucVu, hs.MaPhieu, hs.SoLuongKhieuNai,
                        dg.DiemDanhGia, dg.PhanLoaiDanhGia, dg.CreatedOn as ThoiDiemTuDanhGia
                        FROM Business.KhieuNaiDanhGias as hs
                        inner join Business.DanhGias as dg on hs.MaPhieu = dg.Id {where}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<KhieuNaiDanhGiaDto>(sql, request.PageSize, "CreatedOn DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}