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

public class GetDSTieuChiTheoNhomDoiTuongTieuChiQueryWhereBuilder
{
  
}
public class GetDSTieuChiTheoNhomDoiTuongTieuChiQueryHandler : IQueryHandler<GetDSTieuChiTheoNhomDoiTuongTieuChiQuery, List<TieuChiTheoNhomDoiTuongTieuChiDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public GetDSTieuChiTheoNhomDoiTuongTieuChiQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<Result<List<TieuChiTheoNhomDoiTuongTieuChiDto>>> Handle(GetDSTieuChiTheoNhomDoiTuongTieuChiQuery request, CancellationToken cancellationToken)
    {
        var lst = new List<TieuChiTheoNhomDoiTuongTieuChiDto>();
        string queryNDT = $"SELECT Id,Ten,Ma,LevelBoTieuChi FROM {TableNames.MauPhieuDanhGias}";

        string whereNDT = "";
        string queryTC = $"SELECT Id,STT,TenTieuChi,MaMauPhieuDanhGia,MaDayDu,MaTieuChi,ThangDiem,CreatedBy,DiemTru,MaDonVi,ThuTu,DiemLiet,DiemThuong,KiemNhiem FROM {TableNames.TieuChiDanhGias}";

        string whereTC = "";
        whereNDT = $" WHERE Ma=@MaMauPhieuDanhGia";
        whereTC = $" WHERE SuDung = 1 and MaMauPhieuDanhGia = @MaMauPhieuDanhGia";


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
            var doiTuongTieuChi = new TieuChiTheoNhomDoiTuongTieuChiDto
            {
                TenTieuChi = nhomDoiTuong.Ten,
                MaTieuChi = nhomDoiTuong.Ma,
                Level = nhomDoiTuong.LevelBoTieuChi,
                ThangDiem = diemNDT.ToString(),
            };
            lst.Add(doiTuongTieuChi);
            var lstTieuChi = lstTieuChis.Where(x => x.MaMauPhieuDanhGia == nhomDoiTuong.Ma).ToList();
            foreach (var tieuChi in lstTieuChi)
            {
                var tieuChiVM = new TieuChiTheoNhomDoiTuongTieuChiDto
                {
                    Id = tieuChi.Id,
                    STT = tieuChi.STT,
                    TenTieuChi = tieuChi.TenTieuChi,
                    MaDayDu = tieuChi.MaDayDu,
                    MaTieuChi = tieuChi.MaTieuChi,
                    ThangDiem = tieuChi.ThangDiem,
                    //CreatedBy = tieuChi.CreatedBy,
                    DiemTru = tieuChi.DiemTru,
                    MaDonVi = tieuChi.MaDonVi,
                    ThuTu = tieuChi.ThuTu,
                    DiemLiet = tieuChi.DiemLiet,
                    DiemThuong = tieuChi.DiemThuong,
                    KiemNhiem = tieuChi.KiemNhiem
                };
                lst.Add(tieuChiVM);
            }
        }
       return Result<List<TieuChiTheoNhomDoiTuongTieuChiDto>>.Success(lst);
    }
}
