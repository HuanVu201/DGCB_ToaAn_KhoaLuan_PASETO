using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;
using static TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries.GetTKDanhGIaCaNhanQueryHandler;
using static TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries.GetTKDanhGIaCaNhanQueryWhereBuilder;
namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class GetTKDanhGIaCaNhanQueryWhereBuilder
{
  
    public static string Build(GetTKDanhGIaCaNhanQuery req)
    {
        string where = string.Empty;
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }

}
public class GetTKDanhGIaCaNhanQueryHandler : IQueryHandler<GetTKDanhGIaCaNhanQuery, List<DataThongKeSLDGDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public GetTKDanhGIaCaNhanQueryHandler(IDapperRepository dapperRepository,ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<Result<List<DataThongKeSLDGDto>>> Handle(GetTKDanhGIaCaNhanQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var lstData = new List<DataThongKeSLDGDto>();
             string currentUserName = _currentUser.GetUserGroupId() ?? string.Empty;
            var data = await GetTKTuDanhGia(currentUserName, request.ThoiGianQueryTN, request.ThoiGianQueryDN, request.LoaiThoiGian);
            if (data != null)
            {
                return Result<List<DataThongKeSLDGDto>>.Success(data.ToList());
            }
            else return Result<List<DataThongKeSLDGDto>>.Fail("Không có dữ liệu");
        }
        catch(Exception ex)
        {
            return Result<List<DataThongKeSLDGDto>>.Fail(ex.Message);
        }
    }

    public async Task<List<DataThongKeSLDGDto>> GetTKTuDanhGia(string taiKhoan, string thoiGianQueryTN, string thoiGianQueryDN, string loaiThoiGian)
    {
        var lstData = new List<DataThongKeSLDGDto>();
        if (string.IsNullOrEmpty(loaiThoiGian))
        {
            loaiThoiGian = "Tháng";
        }
        string queryDG = $@"SELECT ID, ThoiGian, ThoiGianQuery, NamDanhGia, DiemDanhGia FROM {TableNames.DanhGias} WHERE 1 = 1
                        AND MaNguoiDung = @TaiKhoan 
                        AND LoaiThoiGian = @LoaiThoiGian
                        AND TrangThai != N'Chưa đánh giá'";
        queryDG += " AND DeletedOn is null";


        if (!string.IsNullOrEmpty(thoiGianQueryTN))
        {
            queryDG += " AND ThoiGianQuery >= @ThoiGianQueryTN";
        }
        if (!string.IsNullOrEmpty(thoiGianQueryDN))
        {
            queryDG += " AND ThoiGianQuery <= @ThoiGianQueryDN";
        }

        var lstCV = await _dapperRepository.QueryAsync<DanhGia>(queryDG, new {TaiKhoan = taiKhoan,ThoiGianQueryTN = thoiGianQueryTN, ThoiGianQueryDN = thoiGianQueryDN, LoaiThoiGian = loaiThoiGian });
        if (lstCV != null)
        {
            string thangTN = thoiGianQueryTN.Substring(4);
            var namTN = int.Parse(thoiGianQueryTN.Substring(0, 4));
            string thangDN = thoiGianQueryTN.Substring(4);
            var namDN = int.Parse(thoiGianQueryTN.Substring(0, 4));

            if (namTN == namDN)
            {
                var intThangTN = int.Parse(thangTN);
                var intThangDN = int.Parse(thangDN);
                for (var i = intThangTN; i <= intThangDN; i++)
                {
                    var thangDG = i < 10 ? "Tháng 0" + i : "Tháng " + i.ToString();
                    var itemTong = new DataThongKeSLDGDto
                    {
                        Ten = thangDG + "/" + namTN,
                        GiaTri = lstCV.Where(x => x.ThoiGian == thangDG && x.NamDanhGia == namTN)
                                      .Select(x => x.DiemDanhGia.ToString())
                                      .FirstOrDefault() ?? "0"
                    };
                    lstData.Add(itemTong);
                }
            }
            else
            {
                var lstTGQuery = new List<string>();
                var intThangTN = int.Parse(thangTN);
                var intThangDN = int.Parse(thangDN);

                for (var j = intThangTN; j <= 12; j++)
                {
                    lstTGQuery.Add(namTN + (j < 10 ? "0" + j : j.ToString()));
                }
                for (var m = 1; m <= intThangDN; m++)
                {
                    lstTGQuery.Add(namDN + (m < 10 ? "0" + m : m.ToString()));
                }

                foreach (var itmQ in lstTGQuery)
                {
                    string thangQ = itmQ.Substring(4);
                    var namQ = itmQ.Substring(0, 4);
                    var intTGQ = int.Parse(itmQ);

                    var itemTong = new DataThongKeSLDGDto
                    {
                        Ten = "Tháng " + thangQ + "/" + namQ,
                        GiaTri = lstCV.Where(x => x.ThoiGianQuery == intTGQ)
                                      .Select(x => x.DiemDanhGia.ToString())
                                      .FirstOrDefault() ?? "0"
                    };
                    lstData.Add(itemTong);
                }
            }
        }

        return lstData;
    }

   
}
