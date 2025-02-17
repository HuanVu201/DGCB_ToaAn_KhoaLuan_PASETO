using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Mailing;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Queries;
public class AddListChiTietDanhGiaQueryHandler : IQueryHandler<AddListChiTietDanhGiaQuery, string>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<ChiTietDanhGia> _chiTietDanhGiarepository;
    public AddListChiTietDanhGiaQueryHandler(IDapperRepository dapperRepository, IRepository<ChiTietDanhGia> chiTietDanhGiarepository)
    {
        _dapperRepository = dapperRepository;
        _chiTietDanhGiarepository = chiTietDanhGiarepository;
    }

    public async Task<Result<string>> Handle(AddListChiTietDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var lstData = request.Data;
        int sum = 0;
        List<ChiTietDanhGia> listItem = new List<ChiTietDanhGia>();

        foreach (var item in lstData)
        {
            var input = ChiTietDanhGia.Create(item.TenMauPhieu, item.MaMauPhieu, item.MaPhieu, item.ChiTietDiemLanhDaoDanhGia, item.ChiTietDiemTuDanhGia, item.ChiTietDiemThamMuu, item.ChiTietDiemNhanXet, item.ChiTietDiemDanhGia,
            item.DataTuDanhGia, item.DataNhanXet, item.DataThamMuu, item.DataLanhDaoDanhGia, item.DiemDanhGia, item.DiemTuDanhGia, item.DiemNhanXet, item.DiemThamMuu, item.DiemLanhDaoDanhGia, item.ThuTu, item.ScorePoint,
            item.HasDiemLietTuDanhGia, item.HasDiemLietNhanXet, item.HasDiemLietThamMuu, item.HasDiemLietLanhDaoDanhGia, item.DataKhieuNai, item.DataXuLyKhieuNai, item.SoLuongKhieuNai);

            sum++;
            listItem.Add(input);
        }

        try
        {
            await _chiTietDanhGiarepository.AddRangeAsync(listItem);
            return Result<string>.Success(message: "Thêm chi tiết đánh giá thành công: " + sum.ToString());
        }
        catch (Exception ex)
        {
            return Result<string>.Fail(message: "Có lỗi trong quá trình thêm chi tiết đánh giá: " + ex);
        }
    }
}