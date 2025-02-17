using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Mailing;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp.Queries;
public class UpdateListChiTietDanhGiaDonViQueryHandler : IQueryHandler<UpdateListChiTietDanhGiaDonViQuery, string>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<ChiTietDanhGiaDonVi> _ChiTietDanhGiaDonVirepository;
    public UpdateListChiTietDanhGiaDonViQueryHandler(IDapperRepository dapperRepository, IRepository<ChiTietDanhGiaDonVi> ChiTietDanhGiaDonVirepository)
    {
        _dapperRepository = dapperRepository;
        _ChiTietDanhGiaDonVirepository = ChiTietDanhGiaDonVirepository;

    }

    public async Task<Result<string>> Handle(UpdateListChiTietDanhGiaDonViQuery request, CancellationToken cancellationToken)
    {
        var lstData = request.Data;
        string lst = string.Empty;
        int sum = 0;
        foreach (var item in lstData)
        {
            var itemExitst = await _ChiTietDanhGiaDonVirepository.GetByIdAsync(item.Id, cancellationToken);
            if (itemExitst != null)
            {
                var updatedChiTietDanhGiaDonVi = itemExitst.Update(item.TenMauPhieu, item.MaMauPhieu, item.MaPhieu, item.ChiTietDiemLanhDaoDanhGia, item.ChiTietDiemTuDanhGia, item.ChiTietDiemThamMuu, item.ChiTietDiemDanhGia,
            item.DataTuDanhGia, item.DataThamMuu, item.DataLanhDaoDanhGia, item.DiemDanhGia, item.DiemTuDanhGia, item.DiemThamMuu, item.DiemLanhDaoDanhGia, item.ThuTu,
            item.HasDiemLietTuDanhGia, item.HasDiemLietThamMuu, item.HasDiemLietLanhDaoDanhGia);
                await _ChiTietDanhGiaDonVirepository.UpdateAsync(updatedChiTietDanhGiaDonVi, cancellationToken);
                sum++;
            }
        }

        lst = sum.ToString();
        if (lst.Length > 0)
            return Result<string>.Success(lst);

        return Result<string>.Fail("Có lỗi trong quá trình cập nhật chi tiết đánh giá!");
    }
}
