using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;
namespace TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Queries;

public class ThongKeKhieuNaiQueryWhereBuilder
{
  
    public static string Build(ThongKeKhieuNaiCommand req)
    {
        string where = string.Empty;
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }

}
public class ThongKeKhieuNaiQueryHandler : IRequestHandler<ThongKeKhieuNaiCommand, Result<List<DataThongKeKhieuNaiDanhGiaDto>>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    public ThongKeKhieuNaiQueryHandler(IDapperRepository dapperRepository,ICurrentUser currentUser)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
    }

    private class Total
    {
        public int Count { get; set; }
    }

    public async Task<Result<List<DataThongKeKhieuNaiDanhGiaDto>>> Handle(ThongKeKhieuNaiCommand request, CancellationToken cancellationToken)
    {
        var lstData = new List<DataThongKeKhieuNaiDanhGiaDto>();
        try
        {
            string userGroupId = _currentUser.GetUserGroupId() ?? string.Empty;
            if (string.IsNullOrEmpty(request.MaDonVi))
            {
                request.MaDonVi = _currentUser.GetOfficeCode();
            }
           
            int currYear = DateTime.Now.Year;
            int currMonth = DateTime.Now.Month;
         
            string sql = $@"SELECT hs.Id,hs.TrangThai,ug.GroupCode as MaPhongBan,ug.OfficeCode as MaDonVi,gl.GroupName as Ten
                        FROM Business.KhieuNaiDanhGias as hs
                        inner join [Identity].[ApplicationUserGroups] ug on ug.id = hs.CreatedBy";

            string whereNX = $@" WHERE hs.DeletedOn IS NULL and ug.DeletedOn IS NULL and gl.DeletedOn IS NULL";
            if (!string.IsNullOrEmpty(request.TrangThai))
            {
                whereNX += $@" AND hs.TrangThai = @TrangThai";
            }
            if (!string.IsNullOrEmpty(request.MaDonVi))
            {
                sql += $@" inner join Catalog.Groups gl on ug.OfficeCode = gl.GroupCode";
                whereNX += $@" AND ug.OfficeCode Like N'%' + @MaDonVi + '%'";
            }
            if (!string.IsNullOrEmpty(request.MaPhongBan))
            {
                sql += $@" inner join Catalog.Groups gl on ug.GroupCode = gl.GroupCode";
                whereNX += $@" AND ug.GroupCode Like N'%' + @MaPhongBan + '%'";
            }          
            // Query for count and expect an integer result
             var res = await _dapperRepository.QueryAsync<DataDSKhieuNaiDanhGiaDto>(sql + whereNX,
                request);
            var lstGroup = new List<string>();
            var lstDonVi = new List<string>();
            if (res.Count > 0)
            {
                foreach(var item in res)
                {
                    if (lstGroup.Count > 0)
                    {
                    if(!lstGroup.Contains(item.MaPhongBan))
                            lstGroup.Add(item.MaPhongBan);
                    }
                    else
                    {
                        lstGroup.Add(item.MaPhongBan);
                    }
                    if (lstDonVi.Count > 0)
                    {
                        if (!lstDonVi.Contains(item.MaDonVi))
                            lstDonVi.Add(item.MaDonVi);
                    }
                    else
                    {
                        lstDonVi.Add(item.MaDonVi);
                    }
                }
                if (!string.IsNullOrEmpty(request.MaDonVi))
                {
                    if (lstDonVi.Count > 0)
                    {
                        foreach (var itemDV in lstDonVi)
                        {
                            var itemAdd = new DataThongKeKhieuNaiDanhGiaDto();
                            itemAdd.Ma = itemDV;
                            itemAdd.Ten = res.FirstOrDefault(x => x.MaDonVi == itemDV).Ten;
                            itemAdd.SoLieu = res.Where(x => x.MaDonVi == itemDV).Count();
                            lstData.Add(itemAdd);
                        }
                    }
                }

                if (!string.IsNullOrEmpty(request.MaPhongBan))
                {
                        if (lstGroup.Count > 0)
                        {
                            foreach (var itemG in lstGroup)
                            {
                                var itemAdd = new DataThongKeKhieuNaiDanhGiaDto();
                                itemAdd.Ma = itemG;
                                itemAdd.Ten = res.FirstOrDefault(x => x.MaPhongBan == itemG).Ten;
                                itemAdd.SoLieu = res.Where(x => x.MaPhongBan == itemG).Count();
                                lstData.Add(itemAdd);
                            }
                        }
                    }

            }
        
        }
        catch (Exception ex)
        {
            return Result<List<DataThongKeKhieuNaiDanhGiaDto>>.Fail(ex.Message);
        }

        return Result<List<DataThongKeKhieuNaiDanhGiaDto>>.Success(lstData);
    }
}
