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

public class GetDanhSachDanhGiaQueryWhereBuilder
{
    public static string Build(GetDanhSachDanhGiaQuery req, string? userGroupId)
    {
        string where = string.Empty;
        where += " AND HoVaTen IS NOT NULL";
        if (!string.IsNullOrEmpty(req.TrangThai))
        {
            if(req.TrangThai=="Chưa xếp loại")
                where += $" AND TrangThai != N'Chưa đánh giá' AND TrangThai != N'Đã đánh giá'";
            else where += " AND TrangThai = @TrangThai";
         }    
           
        else
            where += $" AND TrangThai != N'Chưa đánh giá'";

        if (req.SendDanhGia == true)
            where += $" AND TrangThai != N'Đang đánh giá'";

        if (!string.IsNullOrEmpty(req.PhanLoaiDanhGia))
            where += " AND PhanLoaiDanhGia = @PhanLoaiDanhGia ";

        string tuNgay = req.TuNgay.HasValue ? req.TuNgay.Value.ToString("yyyy-MM-dd") : string.Empty;
        string denNgay = req.DenNgay.HasValue ? req.DenNgay.Value.ToString("yyyy-MM-dd 23:59:59") : string.Empty;

        if (req.LoaiNgay == "TuDanhGia")
        {
            where += $" AND ThoiGianTao is not null  ";
            if (req.FilterByUserRole == true)
                where += $" AND NguoiDangXuLyId = '{userGroupId}'";
            else if (req.FilterByUserRole == false)
                where += $" AND NguoiTuDanhGiaId = '{userGroupId}' ";

            if (!string.IsNullOrEmpty(tuNgay))
                where += $" AND CONVERT(DATE,ThoiGianTao,23)  >= '{tuNgay}' ";

            if (!string.IsNullOrEmpty(denNgay))
                where += $" AND CONVERT(DATE,ThoiGianTao,23)  <= '{denNgay}' ";
        }

        if (req.LoaiNgay == "NhanXet")
        {
            where += $" AND ThoiGianNhanXet is not null ";
            if (req.FilterByUserRole == true)
                where += $" AND NguoiDangXuLyId = '{userGroupId}'";
            else if (req.FilterByUserRole == false)
                where += $" AND NguoiNhanXetId = '{userGroupId}' ";

            if (!string.IsNullOrEmpty(tuNgay))
                where += $" AND CONVERT(DATE,ThoiGianNhanXet,23)  >= '{tuNgay}' ";

            if (!string.IsNullOrEmpty(denNgay))
                where += $" AND CONVERT(DATE,ThoiGianNhanXet,23)  <= '{denNgay}' ";
        }

        if (req.LoaiNgay == "ThamMuu")
        {
            where += $" AND ThoiGianThamMuu is not null  ";
            if (req.FilterByUserRole == true)
                where += $" AND NguoiDangXuLyId = '{userGroupId}'";
            else if (req.FilterByUserRole == false)
                where += $" AND NguoiThamMuuId = '{userGroupId}' ";

            if (!string.IsNullOrEmpty(tuNgay))
                where += $" AND CONVERT(DATE,ThoiGianThamMuu,23)  >= '{tuNgay}' ";

            if (!string.IsNullOrEmpty(denNgay))
                where += $" AND CONVERT(DATE,ThoiGianThamMuu,23)  <= '{denNgay}' ";
        }

        if (req.LoaiNgay == "DanhGia")
        {
            where += $" AND ThoiGianDanhGia is not null  ";
            if (req.FilterByUserRole == true)
                where += $" AND NguoiDangXuLyId = '{userGroupId}'";
            else if (req.FilterByUserRole == false)
                where += $" AND NguoiDanhGiaId = '{userGroupId}' ";

            if (!string.IsNullOrEmpty(tuNgay))
                where += $" AND CONVERT(DATE,ThoiGianDanhGia,23)  >= '{tuNgay}' ";

            if (!string.IsNullOrEmpty(denNgay))
                where += $" AND CONVERT(DATE,ThoiGianDanhGia,23)  <= '{denNgay}' ";
        }

        if (!string.IsNullOrEmpty(req.LoaiDanhGia))
            where += " AND LoaiDanhGia = @LoaiDanhGia";
        else
            where += " AND LoaiDanhGia = N'Cá nhân'";
        if (!string.IsNullOrEmpty(req.LoaiThoiGian))
            where += $" AND LoaiThoiGian = @LoaiThoiGian";

        if (!string.IsNullOrEmpty(req.MaPhongBan))
            where += $" AND MaPhongBan = @MaPhongBan";

        if (!string.IsNullOrEmpty(req.MaDonViCha))
            where += $" AND MaDonViCha = @MaDonViCha";

        if (!string.IsNullOrEmpty(req.ThoiGianQuery))
            where += $" AND ThoiGianQuery Like N'%' + @ThoiGianQuery + '%'";

        if (req.TruongDonVi == true)
            where += $" AND TruongDonVi = '1'";

        if (req.GetDataCurrentUser == true)
        {
            if (!string.IsNullOrEmpty(userGroupId))
            {
                if (req.DifferencePerson == true)
                    where += $" AND (CreatedBy = '{userGroupId}' OR NguoiTuDanhGiaId = '{userGroupId}')";
                else
                    where += $" AND NguoiTuDanhGiaId = '{userGroupId}'";
            }
        }

        if (!string.IsNullOrEmpty(req.ChucVu))
            where += $" AND ChucVu = @ChucVu";

        if (!string.IsNullOrEmpty(req.HoVaTen))
            where += $" AND  HoVaTen LIKE  N'%' + @HoVaTen + '%'";

        if (req.ToanBoDonVi == true)
        {
            where += $" AND ((MaDonVi = @MaDonVi) or (MaDonViCha = @MaDonVi))";
        }
        else
        {
            if (req.Type == "TuDanhGia")
            {
                if (string.IsNullOrEmpty(userGroupId))
                {
                    if (!string.IsNullOrEmpty(req.MaDonVi))
                    {
                        where += $" AND MaDonVi = @MaDonVi";
                    }
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(req.MaDonVi))
                {
                    where += $" AND MaDonVi = @MaDonVi";
                }
            }

        }

        if (req.SuDung == true)
            where += " AND SuDung = 1";
        else if (req.SuDung == false)
            where += " AND SuDung = 0";
        //GetDashboard
        if (!string.IsNullOrEmpty(req.MaDonViTK))
            where += $" AND MaDonViFull Like N'%' + @MaDonViTK + '%'";
        if (!string.IsNullOrEmpty(req.TenDonViTK))
            where += $" AND TenDonVi Like N'%' + @TenDonViTK + '%'";
        if (!string.IsNullOrEmpty(req.ThoiGianQueryTK))
            where += $" AND ThoiGianQuery = @ThoiGianQueryTK";
        if (!string.IsNullOrEmpty(req.KyDanhGia))
        {
            where += $" AND ThoiGian = @KyDanhGia";
        }
        if (req.NamDanhGia.HasValue)
        {
            where += $" AND NamDanhGia = @NamDanhGia";
        }
        if (!string.IsNullOrEmpty(req.MaPhongBan))
        {
            where += $" AND MaPhongBan = @MaPhongBan";
        }
       
        //

        if (req.Removed == false)
            where += " AND DeletedOn is null";
        else if (req.Removed == true)
            where += " AND DeletedOn is not null";

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);

        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
    public static string BuildUser(GetDanhSachDanhGiaQuery req, string? userGroupId)
    {
        string where = string.Empty;

        where += $" AND ug.Id IS NOT NULL AND ug.OfficeCode IS NOT NULL AND (ug.KhongDanhGia!=1 OR ug.KhongDanhGia Is Null)";
        if(req.TrangThai=="Chưa đánh giá")
        {
            if (!string.IsNullOrEmpty(req.ThoiGianQueryTK))
                where += $" AND NOT EXISTS(SELECT 1 FROM [Business].[DanhGias] dg where dg.MaNguoiDung = ug.Id AND dg.DeletedOn IS NULL AND (dg.KhongDanhGia!=1 OR dg.KhongDanhGia Is Null) AND dg.SuDung=1 AND dg.TrangThai!=N'Chưa đánh giá' AND dg.ThoiGianQuery = {req.ThoiGianQueryTK})";
        }
       
        //ug.GroupCode as MaPhongBan,ug.OfficeCode
        if (!string.IsNullOrEmpty(req.MaPhongBan))
            where += $" AND ug.GroupCode = @MaPhongBan";

        if (!string.IsNullOrEmpty(req.MaDonViCha))
            where += $" AND ug.OfficeCode = @MaDonViCha";
        //GetDashboard
        if (!string.IsNullOrEmpty(req.MaDonViTK))
            where += $" AND gl.FullCode Like N'%' + @MaDonViTK + '%'";
        if (!string.IsNullOrEmpty(req.TenDonViTK))
            where += $" AND gl.GroupName Like N'%' + @TenDonViTK + '%'";
     
        if (req.Removed == false)
            where += " AND ug.DeletedOn is null";
        else if (req.Removed == true)
            where += " AND ug.DeletedOn is not null";

        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);

        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
}

public class GetDanhSachDanhGiaQueryHandler : IRequestHandler<GetDanhSachDanhGiaQuery, PaginationResponse<DSDanhGiaDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public GetDanhSachDanhGiaQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    public async Task<PaginationResponse<DSDanhGiaDto>> Handle(GetDanhSachDanhGiaQuery request, CancellationToken cancellationToken)
    {
        string userGroupId = _currentUser.GetUserGroupId() ?? string.Empty;
        var data = new PaginationResponse<DSDanhGiaDto>();
        if (!string.IsNullOrEmpty(request.TrangThai) && (request.TrangThai == "All" || request.TrangThai == "Chưa đánh giá"))
        {
            string where = GetDanhSachDanhGiaQueryWhereBuilder.BuildUser(request, userGroupId);
            string sql = $@"Select u.UserOrder,ug.Id,u.FullName as HoVaTen,u.UserName as TaiKhoan,u.Email,u.PhoneNumber as Phone,ug.GroupCode as MaPhongBan,ug.OfficeCode as MaDonVi,gl.GroupName as TenDonVi,cv.Ten as ChucVu from [Identity].users u 
  left join [Identity].[ApplicationUserGroups] ug on u.id = ug.UserId
    left join Business.ChucVus cv on ug.ChucVuId = cv.Id
  inner join Catalog.Groups gl on ug.OfficeCode = gl.GroupCode";

            sql += $@"{where}";
            data = await _dapperRepository.PaginatedListSingleQueryAsync<DSDanhGiaDto>(sql, request.PageSize, "UserOrder", cancellationToken, request.PageNumber, request);
        }
        else
        {
            string where = GetDanhSachDanhGiaQueryWhereBuilder.Build(request, userGroupId);
            string sql = $@"SELECT Id,ThoiGianQuery,TaiKhoan,HoVaTen,ChucVu,MaDonVi,TenDonVi,TrangThai,ThoiGianTao,MaPhongBan,TenPhongBan,ThoiGian,NamDanhGia,ThuTu,
                    MaPhieu,LoaiDanhGia,PhanLoaiDanhGia,PhanLoaiTuDanhGia,DiemDanhGia,DiemTuDanhGia,ThoiGianNhanXet,ThoiGianDanhGia,ThoiGianHDDanhGia,ThoiGianThamMuu,TruongDonVi,Email,LoaiThoiGian,CreatedOn FROM [Business].[DanhGias]";

            sql += $@"{where}";

             data = await _dapperRepository.PaginatedListSingleQueryAsync<DSDanhGiaDto>(sql, request.PageSize, "HoVaTen", cancellationToken, request.PageNumber, request);
        }
       
        return data;
    }
}