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
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class DuLieuPhieuCQQueryWhereBuilder
{

}
public class DuLieuPhieuCQQueryHandler : IQueryHandler<DuLieuPhieuCQQuery, List<DataPhieuTongHopCQDto>>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IReadRepository<DanhGia> _readRepository;
    public DuLieuPhieuCQQueryHandler(IDapperRepository dapperRepository, IReadRepository<DanhGia> readRepository)
    {
        _dapperRepository = dapperRepository;
        _readRepository = readRepository;
    }
    public async Task<Result<List<DataPhieuTongHopCQDto>>> Handle(DuLieuPhieuCQQuery request, CancellationToken cancellationToken)
    {
        try
        {

            var lst = new List<DataPhieuTongHopCQDto>();
            var intNam = int.Parse(request.NamHienTai);
            string query = $"SELECT Id,GroupCode,GroupOrder FROM {TableNames.Groups}";
            string where = $"";
            if (!string.IsNullOrEmpty(request.Type))
            {

                where += $" and CHARINDEX(GroupCode,@MaPhongBan)>0";
            }
            else where = $" and ((OfGroupCode=@MaPhongBan{where}) or (GroupCode=@MaPhongBan{where}))";
            where = $" WHERE Active = 1 and DeletedOn IS NULL" + where;
            string whereoder = $" ORDER BY GroupOrder";
            var lstDonVi = await _dapperRepository.QueryAsync<Group>(query + where + whereoder, request);

            string queryDG = "";
            var namHienTai = DateTime.Now.Year;
            queryDG = $"SELECT Id,HoVaTen,ThuTu,MaNguoiDung,TaiKhoan,TenPhongBan,MaPhongBan,MaDonVi,TenDonVi,TruongDonVi,LyDoThayDoiXepLoai,PhanLoaiTuDanhGia,DiemDanhGia,PhanLoaiDanhGia,TrangThai,ChucVu FROM {TableNames.DanhGias}";
            string whereDG = " and SuDung = 1 and (KhongDanhGia!=1 OR KhongDanhGia IS NULL) and TrangThai !=N'Chưa đánh giá'";
            if(request.KyDanhGia != null)
            {
                whereDG += $" and ThoiGian=@KyDanhGia";
            }    
            else
            {
                whereDG += $" and ThoiGian is null";
            }
            whereDG += $" and NamDanhGia={intNam}";
            whereDG += $" AND DeletedOn is null";
            if (!string.IsNullOrEmpty(request.XepLoai))
            {

                whereDG += $" and PhanLoaiDanhGia=@XepLoai";
            }
            if (!string.IsNullOrEmpty(request.Type))
            {

                whereDG += $" and CHARINDEX(MaDonVi,@MaPhongBan)>0";
            }
            else whereDG = $" and ((MaDonViCha=@MaPhongBan{whereDG}) or (MaDonVi=@MaPhongBan{whereDG}))";

            whereDG = " WHERE Id is not null" + whereDG + " ORDER BY ThuTu";
            var lstDG = await _dapperRepository.QueryAsync<DanhGia>(queryDG + whereDG, request);
            if (lstDG.Count > 0)
            {
                foreach (var item in lstDG)
                {
                    var itemDG = new DataPhieuTongHopCQDto();
                    double diemTuDanhGia = 0; double diemLDDanhGia = 0; var lyDo = "";
                    if (!string.IsNullOrEmpty(item.LyDoThayDoiXepLoai)) lyDo = item.LyDoThayDoiXepLoai;
                    itemDG.TenDonVi = item.TenDonVi;
                    itemDG.MaDonVi = item.MaDonVi;
                    itemDG.ThuTuND = item.ThuTu.HasValue ? item.ThuTu.Value : 1;
                    itemDG.MaNguoiDung = item.MaNguoiDung;
                    itemDG.TenPhongBan = item.TenPhongBan;
                    itemDG.MaPhongBan = item.MaPhongBan;
                    itemDG.TaiKhoan = item.TaiKhoan;
                    var itemPB = lstDonVi.FirstOrDefault(x => x.GroupCode == item.MaPhongBan);
                    if (itemPB != null) itemDG.ThuTuPB = itemPB.GroupOrder.HasValue ? itemPB.GroupOrder.Value : 1;
                    else itemDG.ThuTuPB = 100;
                    itemDG.LyDo = lyDo;
                    itemDG.ChucVu = item.ChucVu;
                    itemDG.HoVaTen = item.HoVaTen; itemDG.TruongDonVi = item.TruongDonVi.ToString();
                    itemDG.XepLoaiTuDG = item.PhanLoaiTuDanhGia;
                    if (item.TrangThai == "Đã đánh giá")
                    {
                        itemDG.DiemDanhGia = item.DiemDanhGia.ToString();
                        itemDG.XepLoaiDG = item.PhanLoaiDanhGia;
                    }
                    lst.Add(itemDG);
                }

            }
            return Result<List<DataPhieuTongHopCQDto>>.Success(lst);
        }
        catch (Exception ex)
        {
            return Result<List<DataPhieuTongHopCQDto>>.Fail(ex.Message);
        }
    }
}
