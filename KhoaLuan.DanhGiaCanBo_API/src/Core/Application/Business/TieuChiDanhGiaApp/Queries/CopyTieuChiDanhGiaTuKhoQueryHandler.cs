using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;

public class CopyTieuChiDanhGiaTukhoQueryWhereBuilder
{
    public static string Build(CopyTieuChiDanhGiaTuKhoQuery req)
    {
        string where = string.Empty;
        if (!string.IsNullOrEmpty(req.FullCode))
            where += " AND FullCode Like N'%' + @FullCode + '%'";
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
public class CopyTieuChiDanhGiaTuKhoQueryHandler : IQueryHandler<CopyTieuChiDanhGiaTuKhoQuery, List<CopyTieuChiDanhGiaTuKhoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<TieuChiDanhGia> _tieuChirepository;
    public CopyTieuChiDanhGiaTuKhoQueryHandler(IDapperRepository dapperRepository, IRepository<TieuChiDanhGia> tieuChirepository) 
        {
        _tieuChirepository = tieuChirepository;
        _dapperRepository = dapperRepository;
        }
    public async Task<Result<List<CopyTieuChiDanhGiaTuKhoDto>>> Handle(CopyTieuChiDanhGiaTuKhoQuery request, CancellationToken cancellationToken)
    {
        try
        {

       
        var where = CopyTieuChiDanhGiaTukhoQueryWhereBuilder.Build(request);
        var sql = $@"SELECT  [Id]
      ,[MaTieuChi]
      ,[TenTieuChi]
      ,[SuDung]
      ,[DiemTru]
      ,[ThangDiem]
      ,[GhiChu]
      ,[DiemThuong]
      ,[DiemLiet]
      ,[DuocChamNhieuLan]
      ,[KiemNhiem]
      ,[DonViTinh]
      ,[SoLan]
      ,[CreatedBy]
      ,[CreatedOn]
      ,[LastModifiedBy]
      ,[LastModifiedOn]
      ,[DeletedOn]
      ,[DeletedBy]
      ,[FullCode]
      ,[JsonDiemLiet]
      ,[JsonLienKet]
      ,[LoaiDiem]
      ,[ParrentCode]
      ,[ParrentName]
      ,[TieuChiLienKet]
      , [STT]
      ,[ThuTu]
  FROM [Business].[KhoTieuChis] {where}  ORDER BY FullCode ASC";
        var data = await _dapperRepository.QueryAsync<CopyTieuChiDanhGiaTuKhoDto>(sql, request);
        if (data != null)
        {
            foreach (var item in data)
            {
                item.MaTieuChiNew = Guid.NewGuid().ToString(); // Thực hiện thao tác với item
                if (item.ParrentCode == null)
                {
                    item.FullCodeNew =request.ParrentFullCode+"."+item.MaTieuChiNew;
                }
                else
                {
                    item.FullCodeNew = request.ParrentFullCode+"."+data.FirstOrDefault(x => x.MaTieuChi == item.ParrentCode).FullCodeNew + "." + item.MaTieuChiNew;
                }

               
            }
            foreach (var item in data)
            {

                if(item.JsonDiemLiet != null)
                        {
                    var jsonItems = JsonConvert.DeserializeObject<List<JsonDiemLietItem>>(item.JsonDiemLiet);
                    foreach (var itemDiemLiet in jsonItems)
                    {
                        itemDiemLiet.Ma = data.FirstOrDefault(x => x.MaTieuChi == itemDiemLiet.Ma).MaTieuChiNew;
                    }
                    item.JsonDiemLiet = JsonConvert.SerializeObject(jsonItems);
                }
                var input = TieuChiDanhGia.Create(item.MaTieuChiNew, item.FullCodeNew, item.TenTieuChi, item.SuDung, item.DiemTru,item.ThuTu,item.ThuTu, item.ThangDiem, item.GhiChu, request.MaMauPhieuDanhGia, null, item.DiemThuong, item.DiemLiet, item.TieuChiLienKet, false, item.KiemNhiem, item.STT, item.DonViTinh, item.JsonLienKet, item.JsonDiemLiet, item.SoLan, item.FullCode);
                var tieuChiAdd = await _tieuChirepository.AddAsync(input);
            }

                return Result<List<CopyTieuChiDanhGiaTuKhoDto>>.Success(data.ToList());
        }
        else
        {
            // Không có dữ liệu để xử lý
            return Result<List<CopyTieuChiDanhGiaTuKhoDto>>.Fail("Không có tieu chí từ kho");
        }
        }
        catch(Exception ex)
        {
            return Result<List<CopyTieuChiDanhGiaTuKhoDto>>.Fail(ex.Message);
        }
    }
}
