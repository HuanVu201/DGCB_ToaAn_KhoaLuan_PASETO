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
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class SearchDanhGiaTichHopQueryWhereBuilder
{
    public static string Build(SearchDanhGiaTichHopQuery req, string? userGroupId)
    {
        string where = string.Empty;
        where += " AND HoVaTen IS NOT NULL";
        if (!string.IsNullOrEmpty(req.TrangThai))
            where += " AND TrangThai = @TrangThai";
        else
            where += $" AND TrangThai != N'Chưa đánh giá'";

        if (!string.IsNullOrEmpty(req.PhanLoaiDanhGia))
            where += " AND PhanLoaiDanhGia = @PhanLoaiDanhGia ";


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

        if (!string.IsNullOrEmpty(req.MaDonVi))
            where += $" AND MaDonViFull LIKE  N'%' + @MaDonVi + '%'";

        if (!string.IsNullOrEmpty(req.ThoiGianQuery))
            where += $" AND ThoiGianQuery = @ThoiGianQuery";

      

        if (!string.IsNullOrEmpty(req.ChucVu))
            where += $" AND ChucVu = @ChucVu";

        if (!string.IsNullOrEmpty(req.HoVaTen))
            where += $" AND  HoVaTen LIKE  N'%' + @HoVaTen + '%'";

       
        if (req.SuDung == true)
            where += " AND SuDung = 1";
        else if (req.SuDung == false)
            where += " AND SuDung = 0";
  
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
        if (!string.IsNullOrEmpty(req.TrangThai))
        {
            if (req.TrangThai != "All")
            {
                where += " AND TrangThai = @TrangThai";
            }
        }
        else
            where += $" AND TrangThai != N'Chưa đánh giá'";
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
   
}

public class SearchDanhGiaTichHopQueryHandler : IRequestHandler<SearchDanhGiaTichHopQuery, PaginationResponse<DSDanhGiaDto>>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly IRepository<LogAPI> _logAPIrepository;
    public SearchDanhGiaTichHopQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser, IRepository<LogAPI> logAPIrepository)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _logAPIrepository = logAPIrepository;
    }

    public async Task<PaginationResponse<DSDanhGiaDto>> Handle(SearchDanhGiaTichHopQuery request, CancellationToken cancellationToken)
    {
        string userGroupId = _currentUser.GetUserGroupId() ?? string.Empty;
        var data = new PaginationResponse<DSDanhGiaDto>();
       
            string where = SearchDanhGiaTichHopQueryWhereBuilder.Build(request, userGroupId);
            string sql = $@"SELECT Id,ThoiGianQuery,TaiKhoan,HoVaTen,ChucVu,MaDonVi,TenDonVi,TrangThai,ThoiGianTao,MaPhongBan,TenPhongBan,ThoiGian,NamDanhGia,ThuTu,
                    MaPhieu,LoaiDanhGia,PhanLoaiDanhGia,PhanLoaiTuDanhGia,DiemDanhGia,DiemTuDanhGia,ThoiGianNhanXet,ThoiGianDanhGia,ThoiGianHDDanhGia,ThoiGianThamMuu,TruongDonVi,Email,LoaiThoiGian,CreatedOn FROM [Business].[DanhGias]";

            sql += $@"{where}";

            data = await _dapperRepository.PaginatedListSingleQueryAsync<DSDanhGiaDto>(sql, request.PageSize, "HoVaTen", cancellationToken, request.PageNumber, request);

        //UpdateLogAPI
        if (!string.IsNullOrEmpty(request.Type))
        {
            var input = LogAPI.Create(request.Nguon, null, request.Type,"DanhGia","TichHop");
            _logAPIrepository.AddAsync(input);
        }    
        


        return data;
    }
}