using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Mailing;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;

public class GetTieuChiTheoTatCaDoiTuongQueryWhereBuilder
{
  
}
public class GetTieuChiTheoTatCaDoiTuongQueryHandler : IQueryHandler<GetTieuChiTheoTatCaDoiTuongQuery, List<TieuChiTheoTatCaDoiTuongDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public GetTieuChiTheoTatCaDoiTuongQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<Result<List<TieuChiTheoTatCaDoiTuongDto>>> Handle(GetTieuChiTheoTatCaDoiTuongQuery request, CancellationToken cancellationToken)
    {
        var lst = new List<TieuChiTheoTatCaDoiTuongDto>();
        // string queryNDT = $"SELECT Id,Ten,Ma,LevelBoTieuChi FROM {TableNames.MauPhieuDanhGias}";
        string queryNDT = $"SELECT Mpdg.Id,Mpdg.Ten,Mpdg.Ma,Mpdg.LevelBoTieuChi,Mpdg.ThuTu FROM Business.MauPhieuDanhGias Mpdg   Left Join Business.BoTieuChuans btc on Mpdg.MaBoTieuChi = btc.MaBoTieuChi";
        string whereNDT = $"";
        string queryTC = $"SELECT Id,STT,TenTieuChi,MaMauPhieuDanhGia,MaDayDu,MaTieuChi,ThangDiem,CreatedBy,DiemTru,MaDonVi,ThuTu,DiemLiet,DiemThuong,KiemNhiem,TieuChiLienKet,JsonLienKet FROM Business.TieuChiDanhGias";
        string whereTC = $"";
        if (string.IsNullOrEmpty(request.MaDonVi))
        {
            whereNDT = $" WHERE Mpdg.Id IS NOT NULL";
           // whereTC = $" WHERE Id IS NOT NULL and SuDung = 1";
            whereTC = $" WHERE Id IS NOT NULL ";
        }
        else
        {
            var maDonViCha1 = "";
            var maDonViCha2 = "";
            var maDonViCha3 = "";

            if (Regex.IsMatch(request.MaDonVi, @"[0-9]{3}\.[A-Z0-9]{2}\.[A-Z0-9]{2}\.[A-Z][0-9]{2}"))
            {
                if (request.MaDonVi.StartsWith("000.00"))
                {
                    //var arrMa = Regex.Split(maDonVi,@"000.00");
                    var arrMa = request.MaDonVi.Split('.');
                    maDonViCha1 = "000.00.00." + arrMa[arrMa.Length - 1];
                    if (request.MaDonVi == maDonViCha1)
                    {
                        whereNDT = $"WHERE Mpdg.Id IS NOT NULL and Mpdg.MaDonViDanhGia LIKE ('%' + @MaDonVi + '%')";
                        whereTC = $"WHERE Id IS NOT NULL  and (MaDonVi IS NULL or MaDonVi IN (@MaDonVi))";
                    }
                    else
                    {
                        whereNDT = $"WHERE Mpdg.Id IS NOT NULL and (Mpdg.MaDonViDanhGia LIKE '%' + @MaDonVi + '%' or Mpdg.MaDonViDanhGia LIKE '%{maDonViCha1}%')";
                        whereTC = $"WHERE Id IS NOT NULL  and (MaDonVi IS NULL or MaDonVi IN (@MaDonVi,'{maDonViCha1}'))";
                    }
                }
                else if (request.MaDonVi.StartsWith("000."))
                {
                    var arrMa = request.MaDonVi.Split('.');
                    maDonViCha1 = "000.00.00." + arrMa[arrMa.Length - 1];
                    maDonViCha2 = "000.00." + arrMa[arrMa.Length - 2] + "." + arrMa[arrMa.Length - 1];
                    //whereNDT = $"WHERE Id IS NOT NULL and MaDonVi IN (@MaDonVi,'{maDonViCha1}','{maDonViCha2}')";
                    whereNDT = $"WHERE Mpdg.Id IS NOT NULL and (Mpdg.MaDonViDanhGia LIKE '%' + @MaDonVi + '%' or Mpdg.MaDonViDanhGia LIKE '%{maDonViCha1}%' or Mpdg.MaDonViDanhGia LIKE '%{maDonViCha2}%')";
                    whereTC = $"WHERE Id IS NOT NULL and SuDung = 1 and (MaDonVi IS NULL or MaDonVi IN (@MaDonVi,'{maDonViCha1}','{maDonViCha2}'))";
                }
                else if (!request.MaDonVi.StartsWith("000."))
                {
                    var arrMa = request.MaDonVi.Split('.');
                    maDonViCha1 = "000.00.00." + arrMa[arrMa.Length - 1];
                    maDonViCha2 = "000.00." + arrMa[arrMa.Length - 2] + "." + arrMa[arrMa.Length - 1];
                    maDonViCha3 = "000." + arrMa[arrMa.Length - 3] + "." + arrMa[arrMa.Length - 2] + "." + arrMa[arrMa.Length - 1];
                    //whereNDT = $"WHERE Id IS NOT NULL and MaDonVi IN (@MaDonVi,'{maDonViCha1}','{maDonViCha2}','{maDonViCha3}')";
                    whereNDT = $"WHERE Mpdg.Id IS NOT NULL and (Mpdg.MaDonViDanhGia LIKE '%' + @MaDonVi + '%' or Mpdg.MaDonViDanhGia LIKE '%{maDonViCha1}%' or Mpdg.MaDonViDanhGia LIKE '%{maDonViCha2}%' or MaDonViDanhGia LIKE '%{maDonViCha3}%')";
                    whereTC = $"WHERE Id IS NOT NULL and SuDung = 1 and (MaDonVi IS NULL or MaDonVi IN (@MaDonVi,'{maDonViCha1}','{maDonViCha2}','{maDonViCha3}'))";
                }
            }
        }
        if (!string.IsNullOrEmpty(request.LocLevel))
        {
            whereNDT += $" and Mpdg.LevelBoTieuChi = @LocLevel";
        }
        else whereNDT += $" and Mpdg.LevelBoTieuChi IS NULL";
        if (!string.IsNullOrEmpty(request.MaBoTieuChi))
        {
            whereNDT += $" And btc.MaBoTieuChi = @MaBoTieuChi";
        }
                whereNDT += $" And btc.LoaiThoiGian = @LoaiThoiGian And  Mpdg.DeletedOn IS  NULL ORDER BY ThuTu ASC ";
        whereTC += $" And  DeletedOn IS  NULL ORDER BY ThuTu ASC ";
        var lstNhomDoiTuong = await _dapperRepository.QueryAsync<MauPhieuDanhGia>(queryNDT + whereNDT, request);
        var lstTieuChis = await _dapperRepository.QueryAsync<TieuChiDanhGia>(queryTC + whereTC, request);

        //
        foreach (var nhomDoiTuong in lstNhomDoiTuong)
        {
            var lstTieuChiConDoiTuong = lstTieuChis
            .Where(x => x.MaDayDu.Split('.')[x.MaDayDu.Split('.').Length - 2] == nhomDoiTuong.Ma)
            .Select(x => x.ThangDiem)
            .ToList();
            var diemNDT = 0;
            foreach (var t in lstTieuChiConDoiTuong)
            {
                if (!string.IsNullOrEmpty(t))
                {
                    diemNDT += int.Parse(t);
                }
            }
            var doiTuongTieuChi = new TieuChiTheoTatCaDoiTuongDto
            {
                //Id = null,
                Id = nhomDoiTuong.Id,
                TenTieuChi = nhomDoiTuong.Ten,
                MaTieuChi = nhomDoiTuong.Ma,
                Level = nhomDoiTuong.LevelBoTieuChi,
                ThangDiem = diemNDT.ToString(),
                TitleTree= nhomDoiTuong.Ten,
            };
            lst.Add(doiTuongTieuChi);
            var lstTieuChi = lstTieuChis.Where(x => x.MaMauPhieuDanhGia == nhomDoiTuong.Ma).ToList();
            foreach (var tieuChi in lstTieuChi)
            {
                var lstmaDayDu = tieuChi.MaDayDu.Split(".");
                var maDayDu = lstmaDayDu[lstmaDayDu.Length - 2];
                var tieuChiVM = new TieuChiTheoTatCaDoiTuongDto
                {
                    Id = tieuChi.Id,
                    STT = tieuChi.STT,
                    TenTieuChi = tieuChi.TenTieuChi,
                    MaDayDu = tieuChi.MaDayDu,
                    MaTieuChi = tieuChi.MaTieuChi,
                    ThangDiem = tieuChi.ThangDiem,
                    CreatedBy = tieuChi.CreatedBy,
                    DiemTru = tieuChi.DiemTru,
                    MaDonVi = tieuChi.MaDonVi,
                    ThuTu = tieuChi.ThuTu,
                    DiemLiet = tieuChi.DiemLiet,
                    DiemThuong = tieuChi.DiemThuong,
                    KiemNhiem = tieuChi.KiemNhiem,
                    ParentId = tieuChi.MaMauPhieuDanhGia,
                    ParentCode = maDayDu,
                    TieuChiLienKet = tieuChi.TieuChiLienKet,
                    JsonDiemLiet = tieuChi.JsonDiemLiet,
                    JsonLienKet = tieuChi.JsonLienKet,
                    TitleTree = tieuChi.STT+". " + tieuChi.TenTieuChi,
                };
                
                if (!string.IsNullOrEmpty(tieuChi.STT) && tieuChi.STT.Length > 0)
                {
                    tieuChiVM.TitleTree = tieuChi.STT + ". " + tieuChi.TenTieuChi;
                  }
                else
                {
                    tieuChiVM.TitleTree = tieuChi.TenTieuChi;
                }
                lst.Add(tieuChiVM);
            }
        }
       return Result<List<TieuChiTheoTatCaDoiTuongDto>>.Success(lst);
    }
}
