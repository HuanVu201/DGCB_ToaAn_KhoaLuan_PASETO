using MediatR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Commands;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Mailing;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;

public class UpdateTieuChiTheoDoiTuongQueryWhereBuilder
{
  
}


public class GetTieuChiByMaUpdateSpec : Specification<TieuChiDanhGia>, ISingleResultSpecification
{
    public GetTieuChiByMaUpdateSpec(string ma)
    {
        Query.Where(x => x.MaTieuChi == ma);
        Query.Where(x => x.SuDung == true);

    }
}
public class GetTieuChiByMaMauPhieuUpdateSpec : Specification<TieuChiDanhGia>, ISingleResultSpecification
{
    public GetTieuChiByMaMauPhieuUpdateSpec(string ma)
    {
        Query.Where(x => x.MaMauPhieuDanhGia == ma);
        Query.Where(x => x.SuDung == true);

    }
}


public class UpdateTieuChiTheoDoiTuongQueryHandler : IQueryHandler<UpdateTieuChiTheoDoiTuongQuery, TieuChiDanhGia>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<TieuChiDanhGia> _tieuChirepository;
    private readonly IRepository<MauPhieuDanhGia> _mauDanhGiarepository;
    public UpdateTieuChiTheoDoiTuongQueryHandler(IDapperRepository dapperRepository, IRepository<TieuChiDanhGia> TieuChirepository, IRepository<MauPhieuDanhGia> mauDanhGiarepository, ICacheService cacheService)
    {
        _dapperRepository = dapperRepository;
        _tieuChirepository = TieuChirepository;
        _mauDanhGiarepository = mauDanhGiarepository;
        _cacheService = cacheService;
    }
   
    public async Task UpdateTongChuanChaConLai(TieuChiDanhGia entity, string maMauPhieuDanhGia)
    {
        if (entity.DiemLiet != true && entity.DiemThuong != true && entity.DiemTru != true)
        {
            if (entity.MaDayDu != null)
            {
                var maTieuChiCha = entity.MaDayDu.Split('.')[entity.MaDayDu.Split('.').Length - 2];
                if (maTieuChiCha != null)
                {
                    var tieuChiCha = await _tieuChirepository.FirstOrDefaultAsync(new GetTieuChiByMaUpdateSpec(maTieuChiCha));
                    if (tieuChiCha != null)
                    {
                        if (tieuChiCha.DiemLiet != true && tieuChiCha.DiemThuong != true && tieuChiCha.DiemTru != true)
                        {
                            var diem = await TongDiemTheoTieuChiCon(maTieuChiCha, entity.MaMauPhieuDanhGia);
                            tieuChiCha.UpdateThangDiem(diem.ToString());
                          UpdateTongChuanChaConLai(tieuChiCha, maMauPhieuDanhGia);
                        }
                    }


                }
            }

        }
    }
    public async Task<int> TongDiemTheoTieuChiCon(string maTieuChi, string nhomDoiTuongID)
    {
        var lstTieuChi = await _tieuChirepository.ListAsync(new GetTieuChiByMaMauPhieuUpdateSpec(nhomDoiTuongID));


        var lstTieuChiCon = lstTieuChi
            .Where(x => x.DiemLiet != true && x.DiemThuong != true && x.DiemTru != true && x.MaDayDu.Split('.')[x.MaDayDu.Split('.').Length - 2] == maTieuChi)
            .Select(x => x.ThangDiem)
            .ToList();
        var diemTieuChiCha = 0;
        foreach (var t in lstTieuChiCon)
        {
            diemTieuChiCha += int.Parse(t);
        }
        return diemTieuChiCha;
    }
  
    public async Task<Result<TieuChiDanhGia>> Handle(UpdateTieuChiTheoDoiTuongQuery request, CancellationToken cancellationToken)
    {
        var updatedTieuChi = new TieuChiDanhGia();
        Regex.Replace(request.TenTieuChi, @"[^,.!$&()=@{}[]';]+", "");     
        var tieuChi = await _tieuChirepository.FirstOrDefaultAsync(new GetTieuChiByMaUpdateSpec(request.MaTieuChi));
        if(tieuChi!= null)
        {
             updatedTieuChi = tieuChi.Update(request.MaTieuChi, request.MaDayDu, request.TenTieuChi, request.SuDung, request.DiemTru, request.ThuTu, request.ThuTuHienThi, request.ThangDiem, request.GhiChu, request.MaMauPhieuDanhGia,
           request.MaDonVi, request.DiemThuong, request.DiemLiet, request.TieuChiLienKet, request.DuocChamNhieuLan, request.KiemNhiem, request.STT, request.DonViTinh, request.JsonLienKet, request.JsonDiemLiet, request.SoLan, request.MaKhoTieuChi);

            await _tieuChirepository.UpdateAsync(updatedTieuChi, cancellationToken);
            if (request.DiemLiet != true && request.DiemThuong != true && request.DiemTru != true)
            {
                UpdateTongChuanChaConLai(updatedTieuChi, request.MaMauPhieuDanhGia);

            }
        }
        
        return Result<TieuChiDanhGia>.Success(updatedTieuChi);
    }

}
