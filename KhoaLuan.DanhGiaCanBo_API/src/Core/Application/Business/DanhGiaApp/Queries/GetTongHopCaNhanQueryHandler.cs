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

public class GetTongHopCaNhanQueryWhereBuilder
{
    
}
public class GetTongHopCaNhanQueryHandler : IQueryHandler<GetTongHopCaNhanQuery, List<DataPhieuCaNhanDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<DanhGia> _readRepository;
    public GetTongHopCaNhanQueryHandler(IDapperRepository dapperRepository, IReadRepository<DanhGia> readRepository)
    {
        _dapperRepository = dapperRepository;
        _readRepository = readRepository;
    }
    public async Task<Result<List<DataPhieuCaNhanDto>>> Handle(GetTongHopCaNhanQuery request, CancellationToken cancellationToken)
    {
        var lst = new List<DataPhieuCaNhanDto>();
        var intNam = int.Parse(request.NamHienTai);

        string query = $"SELECT Id,ThoiGian,DiemDanhGia,PhanLoaiDanhGia,ThoiGianQuery FROM {TableNames.DanhGias}";
        string where = $" WHERE SuDung = 1 and TrangThai = N'Đã đánh giá' and DeletedOn is null";
        where += $" and NamDanhGia = {intNam} and MaNguoiDung = @MaNguoiDung";
        var lstDG = await _dapperRepository.QueryAsync<DanhGia>(query + where, request);
       
        for (var i = 1; i <= 12; i++)
        {
            var thoiGianQ = "";
            var itemThang = new DataPhieuCaNhanDto();
            itemThang.Thang = "Tháng " + i;
            if (i < 10)
                thoiGianQ = request.NamHienTai + "0" + i;
            else thoiGianQ = request.NamHienTai + i;
            var itemCheck = lstDG.FirstOrDefault(x => x.ThoiGianQuery.ToString() == thoiGianQ);
            if (itemCheck != null)
            {
                itemThang.DiemDanhGia = itemCheck.DiemDanhGia.Value.ToString();
                itemThang.XepLoai = itemCheck.PhanLoaiDanhGia;
            }
            else
            {
                itemThang.DiemDanhGia = ""; itemThang.XepLoai = "";
            }
            lst.Add(itemThang);
        }

    
        return Result<List<DataPhieuCaNhanDto>>.Success(lst);       
    }
}
