using Ardalis.Specification;
using Mapster;
using Newtonsoft.Json;
using System.Net.WebSockets;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;
using TD.DanhGiaCanBo.Application.Identity.UserGroups;
using TD.DanhGiaCanBo.Application.Identity.Users;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;
public class GetQuyTrinhXuLyByCurrentUserQueryHandler : IQueryHandler<GetQuyTrinhXuLyByCurrentUserQuery, ChiTietBuocXuLy>
{
    private readonly ICurrentUser _currentUser;
    private readonly IReadRepository<QuyTrinhXuLy> _quyTrinhXuLyRepo;
    private readonly IReadRepository<DonViSuDungQuyTrinhXuLy> _donViSuDungQuyTrinh;
    private readonly IReadRepository<Group> _donViRepo;
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;
    private readonly IUserGroupService _userGroupService;
    private readonly IDapperRepository _dapperRepository;
    public GetQuyTrinhXuLyByCurrentUserQueryHandler(
        ICurrentUser currentUser, IReadRepository<QuyTrinhXuLy> quyTrinhXuLyRepo,
        IReadRepository<BuocXuLy> buocXuLyRepo, IUserGroupService userGroupService,
        IReadRepository<Group> donViRepo, IDapperRepository dapperRepository)
    {
        _currentUser = currentUser;
        _quyTrinhXuLyRepo = quyTrinhXuLyRepo;
        _buocXuLyRepo = buocXuLyRepo;
        _userGroupService = userGroupService;
        _donViRepo = donViRepo;
        _dapperRepository = dapperRepository;
    }

    private class GetQuyTrinhByDonVi : Specification<QuyTrinhXuLy, DefaultIdType>
    {
        public GetQuyTrinhByDonVi(string donVi, bool laQuyTrinhDonVi)
        {
            Query
                .Select(x => x.Id)
                .Where(x => x.DonVis.Any(dv => dv.OfficeCode == donVi) && x.LaQuyTrinhDonVi == laQuyTrinhDonVi)
                .AsNoTracking();
        }
    }

    private class GetNodeByBuocXuLy : Specification<BuocXuLy, ChiTietBuocXuLy>
    {
        public GetNodeByBuocXuLy(
            //IReadOnlyList<DefaultIdType>? nhomNguoiDungIds,
            DefaultIdType? chucDanhId,
            DefaultIdType? chucVuId,
            IReadOnlyList<DefaultIdType> quyTrinhXuLyIds
            )
        {

            Query

                .Select(x => new ChiTietBuocXuLy(x.Id, x.TenBuoc, x.TrangThaiDanhGia.Ten, x.QuyTrinhXuLyId, x.TrangThaiDanhGiaId, x.KhongCoChucDanh, x.KhongCoChucVu))
                .Include(x => x.BuocXuLyChucVus)
                .Include(x => x.BuocXuLyChucDanhs)
                .Where(x => x.LaBuocDauTien == true)
                .Where(x => quyTrinhXuLyIds.Contains(x.QuyTrinhXuLyId))
                .Where(x =>
                        //(nhomNguoiDungIds != null && nhomNguoiDungIds.Count > 0 && x.BuocXuLyNhomNguoiDungs.Any(ngd => nhomNguoiDungIds.Contains(ngd.Id))) ||
                        //(nhomDonViId != null && nhomDonViId != Guid.Empty && x.DonVis.Any(dv => dv.NhomDonViId == nhomDonViId)) ||
                        (
                            (!x.BuocXuLyChucDanhs.Any() && !x.BuocXuLyChucVus.Any()) ? true :
                            (!x.BuocXuLyChucDanhs.Any() && x.BuocXuLyChucVus.Any()) ? (chucVuId != null && chucVuId != Guid.Empty && x.BuocXuLyChucVus.Any(cv => cv.ChucVuId == chucVuId)) :
                            (x.BuocXuLyChucDanhs.Any() && !x.BuocXuLyChucVus.Any()) ? (chucDanhId != null && chucDanhId != Guid.Empty && x.BuocXuLyChucDanhs.Any(cd => cd.ChucDanhId == chucDanhId)) :
                            (x.BuocXuLyChucDanhs.Any() && x.BuocXuLyChucVus.Any()) ? (
                                (chucDanhId != null && chucDanhId != Guid.Empty && x.BuocXuLyChucDanhs.Any(cd => cd.ChucDanhId == chucDanhId)) ||
                                (chucVuId != null && chucVuId != Guid.Empty && x.BuocXuLyChucVus.Any(cv => cv.ChucVuId == chucVuId))
                            ) : false
                        )
                    )
                .AsNoTracking()
                .AsSplitQuery();
        }
    }

    private async Task<List<ChiTietBuocXuLy>> GetNodeDauTien(DefaultIdType? chucDanhId, DefaultIdType? chucVuId, IReadOnlyList<DefaultIdType> quyTrinhXuLyIds, CancellationToken cancellationToken = default)
    {
        string sql = $@"
            WITH CTE_BuocXuLy AS (
                SELECT 
                    bx.{nameof(BuocXuLy.Id)},
                    bx.{nameof(BuocXuLy.TenBuoc)},
                    bx.{nameof(BuocXuLy.TrangThaiDanhGiaId)},
                    ttdg.{nameof(TrangThaiDanhGia.Ten)} AS {nameof(ChiTietBuocXuLy.TenTrangThai)},
                    bx.{nameof(BuocXuLy.QuyTrinhXuLyId)},
                    bx.{nameof(BuocXuLy.KhongCoChucDanh)},
                    bx.{nameof(BuocXuLy.KhongCoChucVu)},
                    bx.{nameof(BuocXuLy.LaBuocDauTien)},
                     JSON_QUERY(
                        '[' + ISNULL(
                            (SELECT STRING_AGG(QUOTENAME(cd.{nameof(BuocXuLyChucDanh.ChucDanhId)}, '""'), ',')
                             FROM {TableNames.BuocXuLyChucDanhs} cd
                             WHERE cd.{nameof(BuocXuLyChucDanh.BuocXuLyId)} = bx.Id),
                            ''
                        ) + ']'
                    ) AS ChucDanhIds,
                    JSON_QUERY(
                        '[' + ISNULL(
                            (SELECT STRING_AGG(QUOTENAME(cv.{nameof(BuocXuLyChucVu.ChucVuId)}, '""'), ',')
                             FROM {TableNames.BuocXuLyChucVus} cv
                             WHERE cv.{nameof(BuocXuLyChucVu.BuocXuLyId)} = bx.Id),
                            ''
                        ) + ']'
                    ) AS ChucVuIds
                FROM {TableNames.BuocXuLys} bx
                LEFT JOIN {TableNames.TrangThaiDanhGias} ttdg ON bx.{nameof(BuocXuLy.TrangThaiDanhGiaId)} = ttdg.{nameof(TrangThaiDanhGia.Id)}
                WHERE bx.{nameof(BuocXuLy.LaBuocDauTien)} = 1
                  and bx.{nameof(BuocXuLy.QuyTrinhXuLyId)} IN @QuyTrinhXuLyIds
            )
            select * from CTE_BuocXuLy
            where (
	            (ChucDanhIds = '[]' AND ChucVuIds = '[]') OR

                    -- Trường hợp ChucDanhIds là null và ChucVuIds không null
                    (ChucDanhIds = '[]' AND ChucVuIds <> '[]' AND EXISTS (
                        SELECT 1
                        FROM OPENJSON(ChucVuIds) 
                        WITH (ChucVuId UNIQUEIDENTIFIER '$') AS jsonData
                        WHERE jsonData.ChucVuId = @ChucVuId
                    )) OR

                    -- Trường hợp ChucDanhIds không null và ChucVuIds là null
                    (ChucDanhIds <> '[]' AND ChucVuIds = '[]' AND EXISTS (
                        SELECT 1
                        FROM OPENJSON(ChucDanhIds) 
                        WITH (ChucDanhId UNIQUEIDENTIFIER '$') AS jsonData
                        WHERE jsonData.ChucDanhId = @ChucDanhId
                    )) OR

                    -- Trường hợp ChucDanhIds và ChucVuIds đều không null
                    (ChucDanhIds <> '[]' AND ChucVuIds <> '[]' AND (
                        EXISTS (
                            SELECT 1
                            FROM OPENJSON(ChucDanhIds) 
                            WITH (ChucDanhId UNIQUEIDENTIFIER '$') AS jsonData
                            WHERE jsonData.ChucDanhId = @ChucDanhId
                        ) OR 
                        EXISTS (
                            SELECT 1
                            FROM OPENJSON(ChucVuIds) 
                            WITH (ChucVuId UNIQUEIDENTIFIER '$') AS jsonData
                            WHERE jsonData.ChucVuId = @ChucVuId
                        )
                    ))
            )";
        var data = await _dapperRepository.QueryAsync<ChiTietBuocXuLy>(sql, new
        {
            QuyTrinhXuLyIds = quyTrinhXuLyIds.ToList(),
            ChucDanhId = chucDanhId,
            ChucVuId = chucVuId
        }, cancellationToken: cancellationToken);
        return data.ToList();
    }

    private class GetLastNodeByQuyTrinhXuLy : Specification<BuocXuLy, ChiTietBuocXuLy>
    {
        public GetLastNodeByQuyTrinhXuLy(DefaultIdType quyTrinhXuLyId)
        {
            Query
                .Select(x => new ChiTietBuocXuLy(x.Id, x.TenBuoc, x.TrangThaiDanhGia.Ten, x.QuyTrinhXuLyId, x.TrangThaiDanhGiaId, x.KhongCoChucDanh, x.KhongCoChucVu))
                .Where(x => x.LaBuocCuoiCung == true)
                .Where(x => x.QuyTrinhXuLyId == quyTrinhXuLyId)
                .AsNoTracking();
        }
    }

    public class GetNodeByBuocXuLyRequestData
    {
        //public IReadOnlyList<DefaultIdType>? NhomNguoiDungIds { get; set; }
        public string? GroupCode { get; set; }
        public DefaultIdType? ChucDanhId { get; set; }
        public DefaultIdType? ChucVuId { get; set; }

        public GetNodeByBuocXuLyRequestData(DefaultIdType? chucDanhId, DefaultIdType? chucVuId, string? groupCode)
        {
            ChucDanhId = chucDanhId;
            ChucVuId = chucVuId;
            //NhomNguoiDungIds = nhomNguoiDungIds;
            GroupCode = groupCode;
        }
    }
    private List<ChiTietBuocXuLy> GetChiTietBuocXuLyByUserVaiTro(DefaultIdType? chucDanhId, DefaultIdType? chucVuId, List<ChiTietBuocXuLy> buocXuLys)
    {
        var filteredBuocXuLys = buocXuLys.Where(buocXuLy =>
        {
            if(buocXuLy.KhongCoChucDanh == false && buocXuLy.KhongCoChucVu == false)
            {
                return true;
            } 
            if(chucDanhId != null && chucDanhId != Guid.Empty && buocXuLy.KhongCoChucDanh)
            {
                return false;
            }
            if (chucVuId != null && chucVuId != Guid.Empty && buocXuLy.KhongCoChucVu)
            {
                return false;
            }
            return true;
        }).ToList();

        return filteredBuocXuLys.Adapt<List<ChiTietBuocXuLy>>();
    }

    public async Task<Result<ChiTietBuocXuLy>> Handle(GetQuyTrinhXuLyByCurrentUserQuery request, CancellationToken cancellationToken)
    {
        if(request.LoaiBuoc != "START" && request.LoaiBuoc != "END")
        {
            return Result<ChiTietBuocXuLy>.Fail("LoaiBuoc phải là START hoặc END");
        }
        var userGroupId = _currentUser.GetUserGroupId();
        var officeCode = _currentUser.GetOfficeCode();
        if (string.IsNullOrEmpty(userGroupId))
        {
            return Result<ChiTietBuocXuLy>.Fail($"Người dùng hiện tại không nằm trong đơn vị xử lý quy trình");
        }

        var quyTrinhXuLys = await _quyTrinhXuLyRepo.ListAsync(new GetQuyTrinhByDonVi(officeCode, (bool)request.LaQuyTrinhDonVi), cancellationToken);
        if(quyTrinhXuLys.Count == 0)
        {
            return Result<ChiTietBuocXuLy>.Fail($"Không tìm thấy quy trình được gán với đơn vị: {officeCode}");
        }

        //if(quyTrinhXuLys.Count > 1)
        //{
        //    var res = Result<ChiTietBuocXuLy>.Fail($"Có nhiều hơn 1 quy trình xử lý được gán với quyền hiện tại");
        //    res.Data = new ChiTietBuocXuLy(JsonConvert.SerializeObject(quyTrinhXuLys)) { };
        //    return res;
        //}

        var userGroup = await _userGroupService.GetUserGroupBuocXuLy(userGroupId);
        
        //var chiTietBuocXuLy = await _buocXuLyRepo.ListAsync(new GetNodeByBuocXuLy(userGroup.ChucDanhId, userGroup.ChucVuId, quyTrinhXuLys), cancellationToken);
        var chiTietBuocXuLy = await GetNodeDauTien(userGroup.ChucDanhId, userGroup.ChucVuId, quyTrinhXuLys, cancellationToken);
        var danhSachBuocXuLys = GetChiTietBuocXuLyByUserVaiTro(userGroup.ChucDanhId, userGroup.ChucVuId, chiTietBuocXuLy);
        var buocXuLyCount = danhSachBuocXuLys.Count();
        if (buocXuLyCount == 0)
        {
            var res = Result<ChiTietBuocXuLy>.Fail($"Không tìm thấy bước xử lý được gán với quyền hạn hiện tại");
            res.Data = new ChiTietBuocXuLy(JsonConvert.SerializeObject(quyTrinhXuLys)) { };
            return res;
        }
        if(buocXuLyCount > 1)
        {
            var res = Result<ChiTietBuocXuLy>.Fail($"Có nhiều hơn 1 bước xử lý được gán với quyền hiện tại");
            res.Data = new ChiTietBuocXuLy(JsonConvert.SerializeObject(chiTietBuocXuLy)) { };
            return res;
        }
        var response = danhSachBuocXuLys[0];
        if (request.LoaiBuoc == "END")
        {
            var quyTrinhXuLyId = response.QuyTrinhXuLyId;
            response = await _buocXuLyRepo.GetBySpecAsync(new GetLastNodeByQuyTrinhXuLy(quyTrinhXuLyId), cancellationToken);
            if (response == null)
            {
                return Result<ChiTietBuocXuLy>.Fail($"Không tìm thấy bước cuối cùng của quy trình xử lý: {quyTrinhXuLyId}");
            }
        }
        return Result<ChiTietBuocXuLy>.Success(response);
    }
}
