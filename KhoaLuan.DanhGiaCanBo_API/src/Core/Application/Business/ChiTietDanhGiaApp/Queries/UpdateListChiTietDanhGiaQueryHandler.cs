using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Mailing;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Queries;
public class UpdateListChiTietDanhGiaQueryHandler : IQueryHandler<UpdateListChiTietDanhGiaQuery, string>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<ChiTietDanhGia> _chiTietDanhGiarepository;
    public UpdateListChiTietDanhGiaQueryHandler(IDapperRepository dapperRepository, IRepository<ChiTietDanhGia> chiTietDanhGiarepository)
    {
        _dapperRepository = dapperRepository;
        _chiTietDanhGiarepository = chiTietDanhGiarepository;

    }

    public async Task<Result<string>> Handle(UpdateListChiTietDanhGiaQuery request, CancellationToken cancellationToken)
    {
        var lstData = request.Data;
        string lst = string.Empty;
        int sum = 0;
        foreach (var item in lstData)
        {
            var itemExitst = await _chiTietDanhGiarepository.GetByIdAsync(item.Id, cancellationToken);
            if (itemExitst != null)
            {
                var updatedChiTietDanhGia = itemExitst.Update(item.TenMauPhieu, item.MaMauPhieu, item.MaPhieu, item.ChiTietDiemLanhDaoDanhGia, item.ChiTietDiemTuDanhGia, item.ChiTietDiemThamMuu, item.ChiTietDiemNhanXet, item.ChiTietDiemDanhGia,
                item.DataTuDanhGia, item.DataNhanXet, item.DataThamMuu, item.DataLanhDaoDanhGia, item.DiemDanhGia, item.DiemTuDanhGia, item.DiemNhanXet, item.DiemThamMuu, item.DiemLanhDaoDanhGia, item.ThuTu,
                item.HasDiemLietTuDanhGia, item.HasDiemLietNhanXet, item.HasDiemLietThamMuu, item.HasDiemLietLanhDaoDanhGia, item.DataKhieuNai, item.DataXuLyKhieuNai, item.SoLuongKhieuNai);
                await _chiTietDanhGiarepository.UpdateAsync(updatedChiTietDanhGia, cancellationToken);
                sum++;
            }
        }

        lst = sum.ToString();
        if (lst.Length > 0)
            return Result<string>.Success(lst);

        return Result<string>.Fail("Có lỗi trong quá trình cập nhật chi tiết đánh giá!");
    }
}
