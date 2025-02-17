using Ardalis.Specification;
using DocumentFormat.OpenXml.Office2010.Excel;
using Mapster;
using TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Dtos;
using TD.DanhGiaCanBo.Application.Business.LienKetBuocXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Models;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Identity.UserGroups;
using TD.DanhGiaCanBo.Application.Identity.UserGroups.Dtos;
using TD.DanhGiaCanBo.Application.Identity.UserGroups.Params;
using TD.DanhGiaCanBo.Application.Identity.Users;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
using TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia.Dtos;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Domain.Constant;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
using TD.DanhGiaCanBo.Infrastructure.Identity.Specifications;
using static TD.DanhGiaCanBo.Infrastructure.Identity.Specifications.ApplicationUserGroupSpec;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Service;
public class ApplicationUserGroupService : IUserGroupService
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepository<ApplicationUserGroup> _repository;
    private readonly ICurrentUser _currentUser;
    private readonly IUserService _userService;
    private readonly IRepository<LienKetBuocXuLy> _lienKetRepo;
    private readonly IRepository<BuocXuLy> _buocXuLyRepo;
    private readonly IReadRepository<Group> _groupRepo;
    private readonly IReadRepository<DanhSachNhomDonVi> _danhSachNhomDonViRepo;

    public ApplicationUserGroupService(IUserService userService, IReadRepository<DanhSachNhomDonVi> danhSachNhomDonViRepo, IReadRepository<Group> groupRepo, IRepository<BuocXuLy> buocXuLyRepo, IDapperRepository dapperRepository, IRepository<ApplicationUserGroup> repository, ICurrentUser currentUser, IRepository<LienKetBuocXuLy> lienKetRepo)
    {
        _dapperRepository = dapperRepository;
        _repository = repository;
        _currentUser = currentUser;
        _lienKetRepo = lienKetRepo;
        _buocXuLyRepo = buocXuLyRepo;
        _groupRepo = groupRepo;
        _danhSachNhomDonViRepo = danhSachNhomDonViRepo;
        _userService = userService;
    }
    public async Task<Result> Add(AddUserGroupRequest req, CancellationToken cancellationToken = default)
    {
        try
        {
            List<ApplicationUserGroup> datas = [];
            foreach (var userId in req.UserIds)
            {
                datas.Add(new ApplicationUserGroup(userId, req.GroupCode));
            }
            var res = await _repository.AddRangeAsync(datas, cancellationToken);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {

            return (Result)Result.Fail(ex.Message);
        }
    }

    public class GetListRemoveUserFromGroup : Specification<ApplicationUserGroup>
    {
        public GetListRemoveUserFromGroup(RemoveUserGroupRequest req)
        {
            Query.Where(x => req.Ids.Contains(x.Id));
        }
    }
    public async Task<Result> Remove(RemoveUserGroupRequest req, CancellationToken cancellationToken = default)
    {
        try
        {
            var data = await _repository.ListAsync(new GetListRemoveUserFromGroup(req), cancellationToken);
            if (data == null)
            {
                return (Result)Result.Fail($"Không tìm thấy dữ liệu với tham số đã cung cấp");
            }
            var newData = data.Select(x => { x.SoftDelete(_currentUser.GetUserId()); return x; }).ToList();
            await _repository.UpdateRangeAsync(newData, cancellationToken);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }
    }

    public async Task<Result> Update(UpdateUserGroupRequest req, CancellationToken cancellationToken = default)
    {
        try
        {
            var updateUserGroup = await _repository.GetByIdAsync(req.Id, cancellationToken) ??
                throw new NotFoundException($"Dữ liệu không tồn tại với Id: {req.Id}");
            updateUserGroup.Update(req.UserId, req.DonViId, req.PhongBanId, req.ChucDanhId, req.ChucVuId, req.IsDefault, req.UserOrder, req.NoiDungKiemNhiem, req.ThamQuyenXepLoai, req.KiemNhiem, req.TruongDonVi,
                req.KhongDanhGia, req.MaPhieuDanhGia,req.IsKySo);
            await _repository.UpdateAsync(updateUserGroup, cancellationToken);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }
    }

    public async Task<Result<NguoiXuLyTiepDto>> SearchDanhSachNguoiXuLyTiep(SearchUserByBuocXuLyHienTaiRequest req, CancellationToken cancellationToken)
    {
        string userGroupId = _currentUser.GetUserGroupId();
        List<DanhSachBuocXuLyTiepDto>? buocXuLyTieps = null;
        if (req.GroupCode == req.OfficeCode && req.LaQuyTrinhDonVi == false)
        {
            var user = await _userService.GetAsync(userGroupId, cancellationToken);
            if(user.TruongDonVi == true) // thông qua quy trình 3 bước (qua phó trc)
            {
                buocXuLyTieps = await _lienKetRepo.ListAsync(new SearchReactFlowLienKetBuocXuLySpec(req.Adapt<SearchDanhSachBuocXuLyTiepRequest>()), cancellationToken);
            } else // bỏ qua trung gian
            {
                buocXuLyTieps = await _buocXuLyRepo.ListAsync(new SearchReactFlowBuocXuLySpec(req.Adapt<SearchDanhSachBuocXuLyTiepByQuyTrinhRequest>()), cancellationToken);
            }
        }
        else
        {
            buocXuLyTieps = await _lienKetRepo.ListAsync(new SearchReactFlowLienKetBuocXuLySpec(req.Adapt<SearchDanhSachBuocXuLyTiepRequest>()), cancellationToken);
        }
        if (buocXuLyTieps == null || buocXuLyTieps.Count == 0)
        {
            return Result<NguoiXuLyTiepDto>.Fail("Không tồn tại bước xử lý tiếp");
        }
        if (buocXuLyTieps?.Count > 1)
        {
            return Result<NguoiXuLyTiepDto>.Fail("Cấu hình quá trình xử lý có nhiều hơn 1 liên kết");
        }
        var buocXuLyTiep = buocXuLyTieps[0];
        var nhomDonViIds = buocXuLyTiep.NhomDonViIds?.ToList();
        List<string>? donViIds = null;
        if(nhomDonViIds != null && nhomDonViIds.Any())
        {
            donViIds = await _danhSachNhomDonViRepo.ListAsync(new GetDanhSachGroupCodeByNhomDonVi(nhomDonViIds), cancellationToken);
        }
        SearchUserByChucDanhChucVuRequest reqDanhSachNguoiXuLyTiep = new SearchUserByChucDanhChucVuRequest()
        {
            GroupCode = req.GroupCode,
            OfficeCode = req.OfficeCode,
            ChucDanhIds = buocXuLyTiep.ChucDanhIds?.ToList(),
            ChucVuIds = buocXuLyTiep.ChucVuIds?.ToList(),
            CungDonVi = buocXuLyTiep.CungDonVi,
            CungPhongBan = buocXuLyTiep.CungPhongBan,
            LayNguoiQuanLy = buocXuLyTiep.LayNguoiQuanLy,
            LayDonViCapTren = buocXuLyTiep.LayDonViCapTren,
            KhongCoChucVu = buocXuLyTiep.KhongCoChucVu,
            KhongCoChucDanh = buocXuLyTiep.KhongCoChucDanh,
            //NhomNguoiDungs = buocXuLyTiep.NhomNguoiDungIds?.ToList(),
            DonViIds = donViIds,
            LaQuyTrinhDonVi = req.LaQuyTrinhDonVi,

        };

        List<NguoiXuLyTiepDto>? datas = null;
        if(buocXuLyTiep.LayNguoiQuanLy)
        {
            DefaultIdType? nguoiQuanLyId = null;
            //if(req.LaQuyTrinhDonVi == true)
            //{
            //    nguoiQuanLyId = await _groupRepo.FirstOrDefaultAsync(new GetNguoiQuanLyPhong(req.OfficeCode), cancellationToken);
            //}
            //else
            //{
            nguoiQuanLyId = await _groupRepo.FirstOrDefaultAsync(new GetNguoiQuanLyPhong(req.GroupCode), cancellationToken);
            //}
            datas = await _repository.ListAsync(new SearchUserByGroupSpec(reqDanhSachNguoiXuLyTiep, nguoiQuanLyId), cancellationToken);
        }
        else if (buocXuLyTiep.LayDonViCapTren)
        {
            var ofGroupCode = await _groupRepo.FirstOrDefaultAsync(new GetDonViCapTren(req.OfficeCode), cancellationToken);
            datas = await _repository.ListAsync(new SearchUserByGroupSpec(reqDanhSachNguoiXuLyTiep, ofGroupCode: ofGroupCode), cancellationToken);
        }
        else
        {
            datas = await _repository.ListAsync(new SearchUserByGroupSpec(reqDanhSachNguoiXuLyTiep), cancellationToken);
        }
        datas = datas.Where(x => x.Id != userGroupId).ToList();
        if(datas == null || datas.Count == 0)
        {
            return Result<NguoiXuLyTiepDto>.Fail("Không tìm thấy người xử lý tiếp trong quy trình xử lý.");
        }
        if (datas.Count > 1)
        {
            return Result<NguoiXuLyTiepDto>.Fail("Có nhiều hơn một người xử lý tiếp trong quy trình xử lý.");
        }
        var data = datas[0];
        data.BuocXuLyId = buocXuLyTiep.Id;
        data.TenTrangThai = buocXuLyTiep.TenTrangThai;

        return Result<NguoiXuLyTiepDto>.Success(data);
    }

    public async Task<GetQuyTrinhXuLyByCurrentUserQueryHandler.GetNodeByBuocXuLyRequestData> GetUserGroupBuocXuLy(string userGroupId)
    {
        try
        {
            var data = await _repository.FirstOrDefaultAsync(new GetBuocXuLyByCurrentUserGroup(userGroupId));
            return data;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
    public async Task<Result<List<DanhSachUserGroupTruongDonViDto>>> SearchUserGroupTruongDonVi( CancellationToken cancellationToken = default)
    {
        var officeCode = _currentUser.GetOfficeCode();
        var datas = await _repository.ListAsync(new SearchUserGroupTruongDonVi(officeCode), cancellationToken);
        datas = datas.Where(x => x.Id != _currentUser.GetUserGroupId()).ToList();
        return Result<List<DanhSachUserGroupTruongDonViDto>>.Success(datas);
    }

    public async Task<Result<List<DanhSachUserGroupVaiTroDto>>> SearchDanhSachUserGroupVaiTro(CancellationToken cancellationToken = default)
    {
        var currentUserId = _currentUser.GetUserId();
        var datas = await _repository.ListAsync(new GetUserGroups(currentUserId.ToString()), cancellationToken);
        return Result<List<DanhSachUserGroupVaiTroDto>>.Success(datas);
    }
    public async Task<PaginationResponse<DanhSachUserGroupDto>> SearchUserGroup(SearchUserGroupRequest req, CancellationToken cancellationToken = default)
    {
        List<string> where = [$"ug.{nameof(ApplicationUserGroup.DeletedOn)} is null"];
        if (!string.IsNullOrEmpty(req.GroupCode))
        {
            where.Add($"ug.{nameof(ApplicationUserGroup.GroupCode)} = @GroupCode");
        }
        if (!string.IsNullOrEmpty(req.UserName))
        {
            where.Add($"u.{nameof(ApplicationUser.UserName)} like @UserName");
        }
        if (!string.IsNullOrEmpty(req.FullName))
        {
            where.Add($"u.{nameof(ApplicationUser.FullName)} like @FullName");
        }
        if (!string.IsNullOrEmpty(req.TenChucVu))
        {
            where.Add($"cv.{nameof(ChucVu.Ten)} like  @TenChucVu");
        }
        //where.Add($"vxl.{nameof(ApplicationUserGroup.UserId)} == @CurrentUserId");

        string sql = $@"SELECT
                            ug.{nameof(ApplicationUserGroup.Id)},
                            ug.{nameof(ApplicationUserGroup.UserId)},
                            ug.{nameof(ApplicationUserGroup.UserOrder)},
                            u.{nameof(ApplicationUser.UserName)},
                            u.{nameof(ApplicationUser.FullName)},
                            cv.{nameof(ChucVu.Ten)} as {nameof(DanhSachUserGroupDto.TenChucVu)},
                            cd.{nameof(ChucVu.Ten)} as {nameof(DanhSachUserGroupDto.TenChucDanh)}


                            FROM {TableNames.ApplicationUserGroups} ug
                                INNER JOIN {TableNames.Users} u ON ug.{nameof(ApplicationUserGroup.UserId)} = u.{nameof(ApplicationUser.Id)}
                                LEFT JOIN {TableNames.ChucVus} cv ON ug.{nameof(ApplicationUserGroup.ChucVuId)} = cv.{nameof(ChucVu.Id)}
                                LEFT JOIN {TableNames.ChucDanhs} cd ON ug.{nameof(ApplicationUserGroup.ChucDanhId)} = cd.{nameof(ChucDanh.Id)}
                            WHERE {string.Join(" AND ", where)}";
        var param = new
        {
            req.GroupCode,
            FullName = '%' + req.FullName + '%',
            UserName = '%' + req.UserName + '%',
            TenChucVu = '%' +req.TenChucVu +'%',
        };
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhSachUserGroupDto>(sql, req.PageSize, nameof(ApplicationUserGroup.UserOrder), page: req.PageNumber, param: param, cancellationToken: cancellationToken);
        return data;
    }
    public async Task<PaginationResponse<DanhSachUserGroupDto>> SearchUserGroupNotGroupCode(SearchUserGroupNotGroupCodeRequest req, CancellationToken cancellationToken = default)
    {
        List<string> where = [$"ug.{nameof(ApplicationUserGroup.DeletedOn)} is null"];
        if (!string.IsNullOrEmpty(req.GroupCode))
        {
            where.Add($"ug.{nameof(ApplicationUserGroup.GroupCode)} = @GroupCode");
        }
        if (!string.IsNullOrEmpty(req.ChucVuId))
        {
            where.Add($"ug.{nameof(ApplicationUserGroup.ChucVuId)} = @ChucVuId");
        }
        if (!string.IsNullOrEmpty(req.ChucDanhId))
        {
            where.Add($"ug.{nameof(ApplicationUserGroup.ChucDanhId)} = @ChucDanhId");
        }
        if (!string.IsNullOrEmpty(req.UserName))
        {
            where.Add($"u.{nameof(ApplicationUser.UserName)} Like @UserName");
        }
        if (!string.IsNullOrEmpty(req.FullName))
        {
            where.Add($"u.{nameof(ApplicationUser.FullName)} Like @FullName");
        }
        //where.Add($"vxl.{nameof(ApplicationUserGroup.UserId)} == @CurrentUserId");

        string sql = $@"SELECT
                            ug.{nameof(ApplicationUserGroup.Id)},
                            ug.{nameof(ApplicationUserGroup.UserId)},
                            ug.{nameof(ApplicationUserGroup.UserOrder)},
                            u.{nameof(ApplicationUser.UserName)},
                            u.{nameof(ApplicationUser.FullName)},
                            cv.{nameof(ChucVu.Ten)} as {nameof(DanhSachUserGroupDto.TenChucVu)},
                            cd.{nameof(ChucVu.Ten)} as {nameof(DanhSachUserGroupDto.TenChucDanh)},
                            g.{nameof(Group.GroupName)} as {nameof(DanhSachUserGroupDto.TenPhongBan)},
                            g2.{nameof(Group.GroupName)} as {nameof(DanhSachUserGroupDto.TenDonVi)}

                            FROM {TableNames.ApplicationUserGroups} ug
                                INNER JOIN {TableNames.Users} u ON ug.{nameof(ApplicationUserGroup.UserId)} = u.{nameof(ApplicationUser.Id)}
                                LEFT JOIN {TableNames.ChucVus} cv ON ug.{nameof(ApplicationUserGroup.ChucVuId)} = cv.{nameof(ChucVu.Id)}
                                LEFT JOIN {TableNames.ChucDanhs} cd ON ug.{nameof(ApplicationUserGroup.ChucDanhId)} = cd.{nameof(ChucDanh.Id)}
                                LEFT JOIN {TableNames.Groups} g ON g.{nameof(Group.GroupCode)} = ug.{nameof(ApplicationUserGroup.GroupCode)}
                                LEFT JOIN {TableNames.Groups} g2 ON g2.{nameof(Group.GroupCode)} = ug.{nameof(ApplicationUserGroup.OfficeCode)}
                            WHERE {string.Join(" AND ", where)}";
        var param = new
        {
            req.GroupCode,
            req.ChucDanhId,
            req.ChucVuId,
            UserName = !string.IsNullOrEmpty(req.UserName) ? "%" + req.UserName + "%" : null,  // Thêm dấu % vào UserName
            FullName = !string.IsNullOrEmpty(req.FullName) ? "%" + req.FullName + "%" : null,
        };
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhSachUserGroupDto>(sql, req.PageSize, nameof(ApplicationUserGroup.UserOrder), page: req.PageNumber, param: param, cancellationToken: cancellationToken);
        return data;
    }
}
