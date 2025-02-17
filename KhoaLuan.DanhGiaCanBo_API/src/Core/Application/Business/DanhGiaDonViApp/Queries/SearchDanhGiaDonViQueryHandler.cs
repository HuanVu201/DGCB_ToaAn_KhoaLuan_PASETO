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
using static TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos.ChiTietQuyTrinhXuLyDto;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;

public class SearchDanhGiaDonViQueryWhereBuilder
{
    public static string Build(SearchDanhGiaDonViQuery req, string? userGroupId, string? maDonVi)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.TrangThai))
            where += " AND DG.TrangThai = @TrangThai";
        else
            where += $" AND DG.TrangThai != N'Chưa đánh giá'";

        if (req.TrangThais != null && req.TrangThais.Count > 0)
        {
            where += " AND DG.TrangThai in @TrangThais";
        }

        if (req.SendDanhGia == true)
            where += $" AND DG.TrangThai != N'Đang đánh giá'";

        if (!string.IsNullOrEmpty(req.PhanLoaiDanhGia))
            where += " AND DG.PhanLoaiDanhGia = @PhanLoaiDanhGia ";

        string tuNgay = req.TuNgay.HasValue ? req.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = req.DenNgay.HasValue ? req.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;

        if (req.LoaiNgay == "TuDanhGia")
        {
            where += $" AND DG.ThoiGianTao is not null  ";
            where += $" AND (DG.NguoiDangXuLyId = '{userGroupId}' OR DG.NguoiTuDanhGiaId = '{userGroupId}')";
            //if (req.FilterByUserRole == true)
            //    where += $" AND NguoiDangXuLyId = '{userGroupId}'";
            //else if (req.FilterByUserRole == false)
            //    where += $" AND NguoiTuDanhGiaId = '{userGroupId}' ";

            if (!string.IsNullOrEmpty(tuNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianTao,23)  >= '{tuNgay}' ";

            if (!string.IsNullOrEmpty(denNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianTao,23)  <= '{denNgay}' ";
        }

        if (req.LoaiNgay == "ThamMuu")
        {
            //where += $" AND ThoiGianThamMuu is not null  ";
            where += $" AND DG.ThoiGianTao is not null  ";
            where += $" AND (DG.NguoiDangXuLyId = '{userGroupId}' OR DG.NguoiThamMuuId = '{userGroupId}')";
            //if (req.FilterByUserRole == true)
            //    where += $" AND NguoiDangXuLyId = '{userGroupId}'";
            //else if (req.FilterByUserRole == false)
            //    where += $" AND NguoiThamMuuId = '{userGroupId}' ";

            if (!string.IsNullOrEmpty(tuNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianThamMuu,23)  >= '{tuNgay}' ";

            if (!string.IsNullOrEmpty(denNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianThamMuu,23)  <= '{denNgay}' ";
        }

        if (req.LoaiNgay == "DanhGia")
        {
            //where += $" AND ThoiGianDanhGia is not null  ";
            where += $" AND DG.ThoiGianTao is not null  ";
            where += $" AND (DG.NguoiDangXuLyId = '{userGroupId}' OR DG.NguoiDanhGiaId = '{userGroupId}')";
            //if (req.FilterByUserRole == true)
            //    where += $" AND NguoiDangXuLyId = '{userGroupId}'";
            //else if (req.FilterByUserRole == false)
            //    where += $" AND NguoiDanhGiaId = '{userGroupId}' ";

            if (!string.IsNullOrEmpty(tuNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianDanhGia,23)  >= '{tuNgay}' ";

            if (!string.IsNullOrEmpty(denNgay))
                where += $" AND CONVERT(DATE,DG.ThoiGianDanhGia,23)  <= '{denNgay}' ";
        }

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
            where += " AND DG.SuDung = 0";

        if (req.Removed == false)
            where += " AND DG.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DG.DeletedOn is not null";

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);

        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class SearchDanhGiaDonViQueryHandler : IRequestHandler<SearchDanhGiaDonViQuery, PaginationResponse<DanhGiaDonViDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public SearchDanhGiaDonViQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<DanhGiaDonViDto>> Handle(SearchDanhGiaDonViQuery request, CancellationToken cancellationToken)
    {
        string userGroupId = _currentUser.GetUserGroupId() ?? string.Empty;
        string maDonVi = _currentUser.GetOfficeCode() ?? string.Empty;
        string where = SearchDanhGiaDonViQueryWhereBuilder.Build(request, userGroupId, maDonVi);
        string sql = $@"SELECT DG.Id,DG.ThoiGianQuery,DG.MaDonVi,DG.TenDonVi,DG.TrangThai,DG.ThoiGianTao,DG.MaPhongBan,DG.TenPhongBan,DG.ThoiGian,DG.NamDanhGia,
                    DG.MaPhieu,DG.PhanLoaiDanhGia,DG.PhanLoaiTuDanhGia,DG.DiemDanhGia,DG.DiemTuDanhGia, DG.DiemThamMuu,DG.ThoiGianDanhGia,DG.ThoiGianThamMuu,
                    DG.DaXem,DG.LoaiThoiGian,DG.LastModifiedBy,DG.LastModifiedOn, DG.CreatedOn, DG.BuocTruocId, DG.BuocHienTaiId,
                    DG.NguoiTuDanhGia, DG.NguoiThamMuu, DG.NguoiDanhGia, hs.Id as HoSoCongTacId, DG.IsKySoDonVi, DG.IsKySoThamMuu, DG.IsKySoLanhDao
                    FROM [Business].[DanhGiaDonVis] DG
                    LEFT JOIN [Business].[HoSoCongTacDanhGias] hs ON hs.DanhGiaId = DG.Id";
        sql += $@"{where}";

        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhGiaDonViDto>(sql, request.PageSize, "CreatedOn DESC", cancellationToken, request.PageNumber, request);
        return data;
    }
}