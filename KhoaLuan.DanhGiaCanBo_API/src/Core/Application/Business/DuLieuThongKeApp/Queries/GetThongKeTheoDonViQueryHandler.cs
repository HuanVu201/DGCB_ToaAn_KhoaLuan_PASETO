using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.DuLieuThongKeApp;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;
namespace TD.DanhGiaCanBo.Application.Catalog.DuLieuThongKeApp.Queries;

public class GetThongKeTheoDonViQueryWhereBuilder
{

    public static string Build(GetThongKeTheoDonViQuery req)
    {
        string where = string.Empty;
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }

}
public class GetThongKeTheoDonViQueryHandler : IQueryHandler<GetThongKeTheoDonViQuery, List<DuLieuThongKeDonViDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public GetThongKeTheoDonViQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }
    public async Task<Result<List<DuLieuThongKeDonViDto>>> Handle(GetThongKeTheoDonViQuery request, CancellationToken cancellationToken)
    {
        var lstData = new List<DuLieuThongKeDonViDto>();
        try
        {
           
            //if (request.namDanhGia == 0)
            //    request.namDanhGia = DateTime.Now.Year;
            string query = $@"SELECT * FROM {TableNames.DuLieuThongKes}";
                string where = $@" WHERE DeletedOn IS NULL";
            if (!string.IsNullOrEmpty(request.groupCode))
            {
                if (request.includeChild.HasValue && request.includeChild.Value)
                {
                    if (!request.groupCode.Contains('.'))
                    {
                        where += $" and (MaDonVi = '{request.groupCode}' or MaDonViCha = '{request.groupCode}')";
                    }
                    else if (request.groupCode.Split('.').Length == 2)
                    {
                        where += $" and (MaDonVi = '{request.groupCode}' or MaDonViCha = '{request.groupCode}')";
                    }
                    else if (request.groupCode.Split('.').Length == 3)
                    {
                        where += $" and (MaDonVi = '{request.groupCode}' or MaDonViCha = '{request.groupCode}')";
                    }
                    else
                        where += $" and MaDonVi = @groupCode";

                    //if (request.groupCode.StartsWith("000.00.00"))
                    //{
                    //    var maCheck = request.groupCode.Replace("000.00.00", "");
                    //    where += $" and MaDonVi LIKE '000.00.%'";
                    //    where += $" and MaDonVi LIKE '%{maCheck}'";
                    //}
                    //else if (request.groupCode.StartsWith("000.00"))
                    //{
                    //    var maCheck = request.groupCode.Replace("000.00", "");
                    //    where += $" and MaDonVi LIKE '000.%'";
                    //    where += $" and MaDonVi LIKE '%{maCheck}'";
                    //}
                    //else if (request.groupCode.StartsWith("000"))
                    //{
                    //    var maCheck = request.groupCode.Replace("000", "");
                    //    where += $" and MaDonVi LIKE '%{maCheck}'";
                    //}
                    //else
                    //    where += $" and MaDonVi = @groupCode";
                }
                else
                    where += $" and MaDonVi = @groupCode";
                if (!string.IsNullOrEmpty(request.Category)) where += $" and Category = @Category";
                if (request.namDanhGia > 0)
                    where += $" and NamDanhGia = @namDanhGia";
                if (!string.IsNullOrEmpty(request.loaiThoiGian))
                {
                    where += $" and LoaiThoiGian = @loaiThoiGian";
                    if (!string.IsNullOrEmpty(request.kyDanhGia))
                        where += $" and ThoiGian= @kyDanhGia";
                    else
                    {
                        if (request.ThoiGianQueryFrom > 0)
                            where += $" and ThoiGianQuery >= @ThoiGianQueryFrom";
                        if (request.ThoiGianQueryTo > 0)
                            where += $" and ThoiGianQuery <= @ThoiGianQueryTo";
                    }
                }
                else
                {
                    throw new Exception("KyDanhGiaIsNotNull");
                }
                if (!string.IsNullOrEmpty(request.orderBy))
                {
                    var arrOrderBy = request.orderBy.Split(';');
                    for (int i = 0; i < arrOrderBy.Length; i++)
                    {
                        var colName = arrOrderBy[i].Split('#')[0];
                        var dir = arrOrderBy[i].Split('#')[1];
                        if (!string.IsNullOrEmpty(colName))
                        {
                            if (i == 0)
                            {
                                if (dir == "asc")
                                    where += $" ORDER BY {colName}";
                                else
                                    where += $" ORDER BY {colName} DESC";
                            }
                            else
                            {
                                if (dir == "asc")
                                    where += $" ORDER BY {colName}";
                                else
                                    where += $" ORDER BY {colName} DESC";
                            }
                        }
                    }
                }
                else
                    where += $" ORDER BY ThoiGianTao DESC";
                var paging = $" OFFSET @skip ROWS FETCH NEXT @top ROWS ONLY";


                var sqlquery = query + where + paging;
                 lstData = (List<DuLieuThongKeDonViDto>)await _dapperRepository.QueryAsync<DuLieuThongKeDonViDto>(query + where + paging, request, cancellationToken: cancellationToken);
            
            }
            else
            {
                return Result<List<DuLieuThongKeDonViDto>>.Fail("GroupCodeIsNotEmpty");
             }



        }
        catch (Exception ex)
        {
            return Result<List<DuLieuThongKeDonViDto>>.Fail(ex.Message);
        }
        return Result<List<DuLieuThongKeDonViDto>>.Success(lstData);
    }
}
