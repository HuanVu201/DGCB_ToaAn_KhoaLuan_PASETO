using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp;
using TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Mailing;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
public class GetLstTieuChiByMauPhieuQueryHandler : IQueryHandler<GetLstTieuChiByMauPhieuQuery, TieuChiDanhGiaByMauPhieuDanhGiaDto>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    public GetLstTieuChiByMauPhieuQueryHandler(IDapperRepository dapperRepository) => _dapperRepository = dapperRepository;
    public async Task<Result<TieuChiDanhGiaByMauPhieuDanhGiaDto>> Handle(GetLstTieuChiByMauPhieuQuery request, CancellationToken cancellationToken)
    {

        // Các bước : Đầu vào nhận MauPhieuDanhGia
        // B1 : Tìm bộ tiêu chuẩn ứng với mẫu phiếu , Bộ tiêu chuẩn có level
        // B2 : Tìm danh sách phân loại đánh giá theo Bộ tiêu chuẩn tìm đươc
        // B3 : Tìm Danh sách tiêu chí theo mẫu phiếu , Mẫu phiếu có MaDOnVi , KiemNhiem
        var tieuChiDanhGiaDto = new TieuChiDanhGiaByMauPhieuDanhGiaDto();
        try
        {
            // B1
            var mauPhieuQuery = $"SELECT Id,Ten,Ma,DiemTru,DiemThuong,DiemDatYeuCau,MaBoTieuChi FROM {TableNames.MauPhieuDanhGias}";
            var mauPhieuWhere = $" Where Ma = '{request.MaMauPhieuDanhGia}'";
            if (request.Level != null)
            {
                mauPhieuWhere += $"AND LevelBoTieuChi = '{request.Level}'";
            }
            mauPhieuWhere += $"AND  DeletedOn  IS NULL And SuDung = 1  And LevelBoTieuChi Is NUll ";
            var mauPhieuList = (await _dapperRepository.QueryAsync<MauPhieuDanhGiaDto>(mauPhieuQuery + mauPhieuWhere)).ToList();
            var mauPhieu = mauPhieuList.FirstOrDefault() ?? throw new NotFoundException($"Mẫu phiếu với Id: {request.MaMauPhieuDanhGia} không tồn tại hoặc đã bị xóa");


            var boTieuChuanQuery = $"SELECT Id,MaBoTieuChi,LoaiThoiGian,ThoiGian,TenBoTieuChi FROM {TableNames.BoTieuChuans}";
            var boTieuChuanWhere = $" Where MaBoTieuChi = '{mauPhieu.MaBoTieuChi}'  AND DeletedOn IS NULL ";
            var boTieuChuan = await _dapperRepository.QueryFirstOrDefaultAsync<BoTieuChuanDto>(boTieuChuanQuery + boTieuChuanWhere) ?? throw new NotFoundException($"Bộ tiêu chuẩn với Id: {mauPhieu.MaBoTieuChi} không tồn tại hoặc đã bị xóa");


            // B2
            var lstXepLoaiDanhGiaByBoTieuChuanQuery = $"SELECT ID,Ma,Ten,DiemToiThieu,DiemToiDa FROM {TableNames.XepLoaiDanhGias}";
            var lstXepLoaiDanhGiaByBoTieuChuanWhere = $" Where MaBoTieuChi = '{mauPhieu.MaBoTieuChi}'  AND DeletedOn IS NULL ";
            var lstXepLoaiDanhGiaByBoTieuChuan = (await _dapperRepository.QueryAsync<LstPhanLoaiDanhGia>(lstXepLoaiDanhGiaByBoTieuChuanQuery + lstXepLoaiDanhGiaByBoTieuChuanWhere)).ToList();


            // B3
            //var lstTieuChiQuery = $"SELECT Id,MaTieuChi,MaDayDu,TenTieuChi,MaMauPhieuDanhGia,ThangDiem,DiemTru,DiemThuong,DiemLiet FROM {TableNames.TieuChiDanhGias}";
            var lstTieuChiQuery = $@"SELECT *, 
              CASE 
                WHEN LEN(MaDayDu) - LEN(REPLACE(MaDayDu, '.', '')) >= 2 THEN
                    LTRIM(RTRIM(
                        SUBSTRING(MaDayDu, 
                            LEN(MaDayDu) - CHARINDEX('.', REVERSE(MaDayDu), CHARINDEX('.', REVERSE(MaDayDu)) + 1) + 2, 
                            CHARINDEX('.', REVERSE(MaDayDu)) - 1
                        )
                    ))
                ELSE 
                    LTRIM(RTRIM(SUBSTRING(MaDayDu, 1, CHARINDEX('.', MaDayDu + '.') - 1)))
            END  AS ParrentId FROM {TableNames.TieuChiDanhGias}";
            var lstTieuChiWhere = $" Where MaMauPhieuDanhGia = '{request.MaMauPhieuDanhGia}' ";
            lstTieuChiWhere += $" AND SuDung = 1";
            if (request.MaDonVi != null)
            {
                lstTieuChiWhere += $" AND MaDonVi = '{request.MaDonVi}'";
            }
            if (request.CheckKiemNhiem != null)
            {
                lstTieuChiWhere += $" AND KiemNhiem = '{request.CheckKiemNhiem}'";
            }
            lstTieuChiWhere += $" AND DeletedOn IS NULL ";
            //lstTieuChiWhere += " ORDER BY LEN(MaDayDu) ASC";
            lstTieuChiWhere += " ORDER  BY ThuTu  ASC";
            var lstTieuChi = (await _dapperRepository.QueryAsync<TieuChiDanhGiaNooTreeDto>(lstTieuChiQuery + lstTieuChiWhere)).ToList();

            var tieuChiDtoOrigin = new TieuChiDanhGiaNooTreeDto();
            tieuChiDtoOrigin.TenTieuChi = mauPhieu.Ten;
            tieuChiDtoOrigin.MaTieuChi = mauPhieu.Ma;
            tieuChiDtoOrigin.DiemThuongOfMauPhieu = mauPhieu.DiemThuong;
            tieuChiDtoOrigin.DiemTruOfMauPhieu = mauPhieu.DiemTru;
            tieuChiDtoOrigin.DiemDatYeuCauOfMauPhieu = mauPhieu.DiemDatYeuCau;
            lstTieuChi.Add(tieuChiDtoOrigin);

            var treeBuilder = new TreeBuilder();
            var tree = treeBuilder.BuildTree(lstTieuChi, mauPhieu.Ma);

            string json = JsonConvert.SerializeObject(tree, Formatting.Indented);

            tieuChiDanhGiaDto.MaBoTieuChi = boTieuChuan.MaBoTieuChi;
            tieuChiDanhGiaDto.TenBoTieuChi = boTieuChuan.TenBoTieuChi;
            tieuChiDanhGiaDto.LoaiThoiGian = boTieuChuan.LoaiThoiGian;
            tieuChiDanhGiaDto.ThoiGian = boTieuChuan.ThoiGian;
            tieuChiDanhGiaDto.DanhSachPhanLoaiDanhGia = lstXepLoaiDanhGiaByBoTieuChuan;
            if (tree != null)
            {
                tieuChiDanhGiaDto.DanhSachTieuChi = tree;
            }
        }
        catch (Exception ex)
        {
            // Ghi nhận lỗi
            throw new Exception(ex.Message);
        }
        return Result<TieuChiDanhGiaByMauPhieuDanhGiaDto>.Success(tieuChiDanhGiaDto);
    }
}
public class TreeBuilder
{
    public TieuChiDanhGiaNooTreeDto BuildTree(List<TieuChiDanhGiaNooTreeDto> criteria, string parentId)
    {
        try
        {
            // Tìm nút cha trong danh sách
            var node = criteria.FirstOrDefault(item => item.MaTieuChi == parentId);
            if (node == null) return null;

            // Kiểm tra nếu DanhSachTieuChiCon chưa được khởi tạo
            if (node.DanhSachTieuChiCon == null)
            {
                node.DanhSachTieuChiCon = new List<TieuChiDanhGiaNooTreeDto>();
            }

            // Tìm các nút con
            var children = criteria.Where(item => item.ParrentId == node.MaTieuChi).ToList();
            foreach (var child in children)
            {
                // Gọi đệ quy để xây dựng cây con
                var childNode = BuildTree(criteria, child.MaTieuChi);
                if (childNode != null)
                {
                    node.DanhSachTieuChiCon.Add(childNode);
                }
            }

            return node;
        }
        catch (Exception ex)
        {
            return null;
        }
    }

}
