using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Mailing;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp.Queries;
public class AddListChiTietDanhGiaDonViQueryHandler : IQueryHandler<AddListChiTietDanhGiaDonViQuery, string>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<ChiTietDanhGiaDonVi> _chiTietDanhGiaDonVirepository;
    public AddListChiTietDanhGiaDonViQueryHandler(IDapperRepository dapperRepository, IRepository<ChiTietDanhGiaDonVi> ChiTietDanhGiaDonVirepository)
    {
        _dapperRepository = dapperRepository;
        _chiTietDanhGiaDonVirepository = ChiTietDanhGiaDonVirepository;
    }

    public async Task<Result<string>> Handle(AddListChiTietDanhGiaDonViQuery request, CancellationToken cancellationToken)
    {
        var lstData = request.Data;
        int sum = 0;
        List<ChiTietDanhGiaDonVi> listItem = new List<ChiTietDanhGiaDonVi>();

        foreach (var item in lstData)
        {
            var input = ChiTietDanhGiaDonVi.Create(item.TenMauPhieu, item.MaMauPhieu, item.MaPhieu, item.ChiTietDiemLanhDaoDanhGia, item.ChiTietDiemTuDanhGia, item.ChiTietDiemThamMuu, item.ChiTietDiemDanhGia,
            item.DataTuDanhGia, item.DataThamMuu, item.DataLanhDaoDanhGia, item.DiemDanhGia, item.DiemTuDanhGia, item.DiemThamMuu, item.DiemLanhDaoDanhGia, item.ThuTu,item.ScorePoint,
            item.HasDiemLietTuDanhGia, item.HasDiemLietThamMuu, item.HasDiemLietLanhDaoDanhGia);

            sum++;
            listItem.Add(input);
        }

        try
        {
            await _chiTietDanhGiaDonVirepository.AddRangeAsync(listItem);
            return Result<string>.Success(message: "Thêm chi tiết đánh giá thành công: " + sum.ToString());
        }
        catch (Exception ex)
        {
            return Result<string>.Fail(message: "Có lỗi trong quá trình thêm chi tiết đánh giá: " + ex);
        }
    }
}