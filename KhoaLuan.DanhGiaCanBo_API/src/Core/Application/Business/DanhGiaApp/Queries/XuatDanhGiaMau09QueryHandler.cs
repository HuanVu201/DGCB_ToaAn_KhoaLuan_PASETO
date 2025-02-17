using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class XuatDanhGiaMau09QueryWhereBuilder
{
    
}
public class XuatDanhGiaMau09QueryHandler : IQueryHandler<XuatDanhGiaMau09Query, List<ItemThongKeBaoCaoDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<DanhGia> _readRepository;
    public XuatDanhGiaMau09QueryHandler(IDapperRepository dapperRepository, IReadRepository<DanhGia> readRepository)
    {
        _dapperRepository = dapperRepository;
        _readRepository = readRepository;
    }
    public async Task<Result<List<ItemThongKeBaoCaoDto>>> Handle(XuatDanhGiaMau09Query request, CancellationToken cancellationToken)
    {
        var lst = new List<ItemThongKeBaoCaoDto>();
        string query = $"SELECT Id,HoVaTen,TenDonVi,DiemTuDanhGia,PhanLoaiDanhGia,DiemNhanXet,DiemDanhGia,YKienDanhGia,MaNguoiDung,TaiKhoan,TenPhongBan,MaPhongBan,MaDonVi,TenDonVi FROM {TableNames.DanhGias}";
        string where = $" and SuDung = 1 and ( KhongDanhGia != 1 or  KhongDanhGia Is null) and TrangThai =N'Đã đánh giá'";
        if(request.LoaiThoiGian == "Năm")
        {
            where += $" and ThoiGian Is Null";
        }
        else
        {
            where += $" and ThoiGian= @KyDanhGia";
        }    
        
        where += " AND DeletedOn is null";
        if (!string.IsNullOrEmpty(request.NamDanhGia))
        {
            var iNamHT = int.Parse(request.NamDanhGia);
            where += $" and NamDanhGia={iNamHT}";
        }

        where = $" and ((MaDonVi = @MaDonVi{where}) or (MaDonViCha = @MaDonVi{where}))";
        where = $" WHERE Id IS NOT NULL " + where;
        var lstDG = await _dapperRepository.QueryAsync<DanhGia>(query + where, request);
         if (lstDG.Count > 0)
        {
            foreach (var itemDG in lstDG)
            {
                var item = new ItemThongKeBaoCaoDto();
                item.HoTen = itemDG.HoVaTen;
                item.MaNguoiDung = itemDG.MaNguoiDung;
                item.TenDonVi = itemDG.TenDonVi;
                item.MaDonVi = itemDG.MaDonVi;
                item.TenPhongBan = itemDG.TenPhongBan;
                item.MaPhongBan = itemDG.MaPhongBan;
                item.DiemTuDanhGia = itemDG.DiemTuDanhGia.ToString();
                item.DiemDanhGia = itemDG.DiemDanhGia.ToString();
                item.DiemNhanXet = itemDG.DiemNhanXet.ToString();
                item.PhanLoaiDanhGia = itemDG.PhanLoaiDanhGia;
                if (!string.IsNullOrEmpty(itemDG.YKienDanhGia))
                {
                    item.YKien = itemDG.YKienDanhGia;
                }
                else if (!string.IsNullOrEmpty(itemDG.YKienThamMuu))
                    item.YKien = itemDG.YKienThamMuu;
                else item.YKien = "";
                lst.Add(item);
            }

        }
        return Result<List<ItemThongKeBaoCaoDto>>.Success(lst);       
    }
}
