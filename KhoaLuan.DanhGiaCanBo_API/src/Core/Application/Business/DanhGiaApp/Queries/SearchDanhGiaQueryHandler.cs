using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class SearchDanhGiaQueryWhereBuilder
{
    public static string Build(SearchDanhGiaQuery req, string? userGroupId)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TrangThai))
            where += " AND DG.TrangThai = @TrangThai";
        else
            where += $" AND DG.TrangThai != N'Chưa đánh giá'";

        if (!string.IsNullOrEmpty(req.PhanLoaiDanhGia))
            where += " AND DG.PhanLoaiDanhGia = @PhanLoaiDanhGia ";

        string tuNgay = req.TuNgay.HasValue ? req.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = req.DenNgay.HasValue ? req.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;

        if (req.LoaiNgay == "TuDanhGia")
        {
            where += $" AND DG.ThoiGianTao is not null  ";
            if (req.FilterByUserRole == true)
                where += $" AND DG.NguoiDangXuLyId = '{userGroupId}'";
            else if (req.FilterByUserRole == false)
                where += $" AND DG.NguoiTuDanhGiaId = '{userGroupId}' ";

            if (!string.IsNullOrEmpty(tuNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianTao,23)  >= '{tuNgay}' ";

            if (!string.IsNullOrEmpty(denNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianTao,23)  <= '{denNgay}' ";
        }

        if (req.LoaiNgay == "NhanXet")
        {
            where += $" AND DG.ThoiGianNhanXet is not null ";
            if (req.FilterByUserRole == true)
                where += $" AND DG.NguoiDangXuLyId = '{userGroupId}'";
            else if (req.FilterByUserRole == false)
                where += $" AND DG.NguoiNhanXetId = '{userGroupId}' ";

            if (!string.IsNullOrEmpty(tuNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianNhanXet,23)  >= '{tuNgay}' ";

            if (!string.IsNullOrEmpty(denNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianNhanXet,23)  <= '{denNgay}' ";
        }

        if (req.LoaiNgay == "ThamMuu")
        {
            where += $" AND DG.ThoiGianThamMuu is not null  ";
            if (req.FilterByUserRole == true)
                where += $" AND DG.NguoiDangXuLyId = '{userGroupId}'";
            else if (req.FilterByUserRole == false)
                where += $" AND DG.NguoiThamMuuId = '{userGroupId}' ";

            if (!string.IsNullOrEmpty(tuNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianThamMuu,23)  >= '{tuNgay}' ";

            if (!string.IsNullOrEmpty(denNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianThamMuu,23)  <= '{denNgay}' ";
        }

        if (req.LoaiNgay == "DanhGia")
        {
            where += $" AND DG.ThoiGianDanhGia is not null  ";
            if (req.FilterByUserRole == true)
                where += $" AND DG.NguoiDangXuLyId = '{userGroupId}'";
            else if (req.FilterByUserRole == false)
                where += $" AND DG.NguoiDanhGiaId = '{userGroupId}' ";

            if (!string.IsNullOrEmpty(tuNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianDanhGia,23)  >= '{tuNgay}' ";

            if (!string.IsNullOrEmpty(denNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianDanhGia,23)  <= '{denNgay}' ";
        }

        if (!string.IsNullOrEmpty(req.LoaiDanhGia))
            where += " AND DG.LoaiDanhGia = @LoaiDanhGia";
        else
            where += " AND DG.LoaiDanhGia = N'Cá nhân'";

        if (!string.IsNullOrEmpty(req.MaPhongBan))
            where += $" AND DG.MaPhongBan = @MaPhongBan";

        if (!string.IsNullOrEmpty(req.MaDonViCha))
            where += $" AND DG.MaDonViCha = @MaDonViCha";

        if (!string.IsNullOrEmpty(req.ThoiGianQuery))
        {
            if (!string.IsNullOrEmpty(req.LoaiThoiGian) && req.LoaiThoiGian.ToLower() == "năm")
                where += $" AND DG.ThoiGianQuery = @ThoiGianQuery ";
            else
                where += $" AND DG.ThoiGianQuery Like N'%' + @ThoiGianQuery + '%'";
        }

        if (req.TruongDonVi == true)
            where += $" AND DG.TruongDonVi = '1'";

        if (req.GetDataCurrentUser == true)
        {
            if (!string.IsNullOrEmpty(userGroupId))
            {
                if (req.DifferencePerson == true)
                    where += $" AND (DG.CreatedBy = '{userGroupId}' OR DG.NguoiTuDanhGiaId = '{userGroupId}')";
                else
                    where += $" AND DG.NguoiTuDanhGiaId = '{userGroupId}'";
            }
        }

        if (req.ChuaKhieuNai == true)
            where += $" AND kn.Id is null";

        if (!string.IsNullOrEmpty(req.ChucVu))
            where += $" AND DG.ChucVu = @ChucVu";

        if (!string.IsNullOrEmpty(req.HoVaTen))
            where += $" and  DG.HoVaTen LIKE  N'%' + @HoVaTen + '%'";

        if (req.ToanBoDonVi == true)
        {
            where += $" AND ((DG.MaDonVi = @MaDonVi) or (DG.MaDonViCha = @MaDonVi))";
        }
        else
        {
            if (req.Type == "TuDanhGia")
            {
                if (string.IsNullOrEmpty(userGroupId))
                {
                    if (!string.IsNullOrEmpty(req.MaDonVi))
                    {
                        where += $" AND DG.MaDonVi = @MaDonVi";
                    }
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(req.MaDonVi))
                {
                    where += $" AND DG.MaDonVi = @MaDonVi";
                }
            }

        }

        if (req.SuDung == true)
            where += " AND DG.SuDung = 1";
        else if (req.SuDung == false)
            where += " AND SuDung = 0";

        if (req.Removed == false)
            where += " AND DG.DeletedOn is null AND kn.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DG.DeletedOn is not null";

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);

        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchDanhGiaQueryHandler : IRequestHandler<SearchDanhGiaQuery, PaginationResponse<DanhGiaDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public SearchDanhGiaQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<DanhGiaDto>> Handle(SearchDanhGiaQuery request, CancellationToken cancellationToken)
    {
        string userGroupId = _currentUser.GetUserGroupId() ?? string.Empty;
        string where = SearchDanhGiaQueryWhereBuilder.Build(request, userGroupId);
        string sql = $@"SELECT DISTINCT DG.Id,ThoiGianQuery,TaiKhoan,HoVaTen,ChucVu,DG.MaDonVi,DG.TenDonVi,DG.TrangThai,DG.ThoiGianTao,MaPhongBan,TenPhongBan,ThoiGian,NamDanhGia,
                    DG.MaPhieu,LoaiDanhGia,PhanLoaiDanhGia,PhanLoaiTuDanhGia,DiemDanhGia,DiemTuDanhGia, DiemNhanXet, DiemThamMuu, DiemLanhDaoDanhGia,ThoiGianNhanXet,ThoiGianDanhGia,ThoiGianHDDanhGia,ThoiGianThamMuu,TruongDonVi,Email,
                    DaXem,LoaiThoiGian,DG.LastModifiedBy,DG.LastModifiedOn, DG.CreatedOn, BuocTruocId, BuocHienTaiId,
                    NguoiTuDanhGia, NguoiNhanXet, NguoiThamMuu, NguoiDanhGia, kn.Id as KhieuNaiId, kn.TrangThai as TrangThaiKhieuNai, hs.Id as HoSoCongTacId,
                    DG.IsKySoCaNhan, DG.IsKySoNhanXet, DG.IsKySoThamMuu, DG.IsKySoLanhDao, DG.UrlPdf, DG.UrlDocx
                    FROM [Business].[DanhGias] as DG
                    LEFT JOIN [Business].[KhieuNaiDanhGias] kn ON kn.MaPhieu = DG.Id
                    LEFT JOIN [Business].[HoSoCongTacDanhGias] hs ON hs.DanhGiaId = DG.Id
                    {where}";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhGiaDto>(sql, request.PageSize, "CreatedOn  DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}