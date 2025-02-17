using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.Extensions.Logging;
using TD.DanhGiaCanBo.Application.Common.Models;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs;
using TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs.Params;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Domain.Constant;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
using TD.DanhGiaCanBo.Infrastructure.Identity.Specifications;
using static TD.DanhGiaCanBo.Infrastructure.Identity.ApplicationUser;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Service;
public class UserGroupNhomNguoiDungService : IUserNhomNguoiDungService
{
    private readonly IRepository<ApplicationUserGroupNhomNguoiDung> _repository;
    private readonly IDapperRepository _dapperRepository;
    public UserGroupNhomNguoiDungService(
        IRepository<ApplicationUserGroupNhomNguoiDung> repository,
        IDapperRepository dapperRepository)
    {
        _repository = repository;
        _dapperRepository = dapperRepository;
    }

    public async Task<Result> AddUsesr(AddUserNhomNguoiDungRequest req, CancellationToken cancellationToken = default)
    {
        try
        {
            List<ApplicationUserGroupNhomNguoiDung> datas = [];
            foreach (var userId in req.UserIds)
            {
                datas.Add(new ApplicationUserGroupNhomNguoiDung(userId, req.NhomNguoiDungId));
            }
            var res = await _repository.AddRangeAsync(datas, cancellationToken);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {

            return (Result)Result.Fail(ex.Message);
        }
        throw new NotImplementedException();
    }
    private class GetNhomByCurrentUser : Specification<ApplicationUserGroupNhomNguoiDung>
    {
        public GetNhomByCurrentUser(AddUserToMultipleNhomRequest? req)
        {
            Query.Where(x => x.UserGroupId == req.UserGroupId).AsNoTracking();
        }
    }
    public async Task<Result> AddToNhom(AddUserToMultipleNhomRequest? req, DefaultIdType createdUserGroupId, CancellationToken cancellationToken = default)
    {
        try
        {
            //List<ApplicationUserGroupNhomNguoiDung> datas = [];
            //if(req == null)
            //{
            //    return (Result)Result.Fail();
            //}
            //var currentUserNhoms = await _repository.ListAsync(new GetNhomByCurrentUser(req), cancellationToken);
            //if (req.UserGroupId == null || req.UserGroupId == Guid.Empty)
            //{
            //    req.UserGroupId = createdUserGroupId;
            //}
            //foreach (var nhomNguoiDungId in req.NhomNguoiDungIds)
            //{
            //    datas.Add(new ApplicationUserGroupNhomNguoiDung((DefaultIdType)req.UserGroupId, nhomNguoiDungId));
            //}
            //if (currentUserNhoms.Count == 0)
            //{
            //    var resAdd = await _repository.AddRangeAsync(datas, cancellationToken);
            //    return (Result)Result.Success();
            //}
            //List<ApplicationUserGroupNhomNguoiDung> removeItems = [];
            //foreach (var data in datas)
            //{
            //    bool daTonTaiNhom = currentUserNhoms.Any(x => x.NhomNguoiDungId == data.NhomNguoiDungId && x.UserGroupId == data.UserGroupId);
            //    if (!daTonTaiNhom)
            //    {
            //        currentUserNhoms.Remove(data);
            //    }
            //}

            //var res = await _repository.SaveChangesAsync(cancellationToken);
            if (req == null)
            {
                return (Result)Result.Fail();
            }
            var reqNhomNguoiDungIds = req.NhomNguoiDungIds.ToList();
            var newNhomNguoiDungs = reqNhomNguoiDungIds.ConvertAll(id => new ApplicationUserGroupNhomNguoiDung((Guid)req.UserGroupId, id));
            var currentUserNhoms = await _repository.ListAsync(new GetNhomByCurrentUser(req), cancellationToken);

            // Tìm các bản ghi cần xóa
            var nhomNguoiDungIdsToDelete = currentUserNhoms
                .Where(existing => !reqNhomNguoiDungIds.Contains(existing.NhomNguoiDungId))
                .ToList();

            // Tìm các bản ghi cần thêm
            var nhomNguoiDungsToAdd = newNhomNguoiDungs
                .Where(nhomNguoiDung => !currentUserNhoms.Any(existing => existing.NhomNguoiDungId == nhomNguoiDung.NhomNguoiDungId))
                .ToList();

            // Xóa các bản ghi không còn nằm trong danh sách mới
            await _repository.DeleteRangeAsync(nhomNguoiDungIdsToDelete, cancellationToken);

            // Thêm các bản ghi mới chưa có trong danh sách hiện tại
            await _repository.AddRangeAsync(nhomNguoiDungsToAdd, cancellationToken);

            return (Result)Result.Success();
        }
        catch (Exception ex)
        {

            return (Result)Result.Fail(ex.Message);
        }
    }

    public async Task<PaginationResponse<DanhSachUserNhomNguoiDungDto>> GetUserNhomNguoiDung(SearchUserNhomNguoiDungQuery req, CancellationToken cancellationToken = default)
    {
        string sql = $@"SELECT
                        u.{nameof(ApplicationUser.Id)},
                        UGN.{nameof(ApplicationUserGroupNhomNguoiDung.Id)} as UserNhomId,
                        {nameof(ApplicationUser.UserName)},
                        {nameof(ApplicationUser.FullName)},
                        G1.{nameof(Group.GroupName)} as OfficeName,
                        G2.{nameof(Group.GroupName)} as GroupName,
                        UG.{nameof(ApplicationUserGroup.OfficeCode)}
                        FROM
                        {TableNames.ApplicationUserGroupNhomNguoiDungs} UGN
                        INNER JOIN {TableNames.ApplicationUserGroups} UG ON UGN.{nameof(ApplicationUserGroupNhomNguoiDung.UserGroupId)} = UG.{nameof(ApplicationUserGroup.Id)}
                        INNER JOIN {TableNames.Users} U ON UG.{nameof(ApplicationUserGroup.UserId)} = U.{nameof(ApplicationUser.Id)}
                        INNER JOIN {TableNames.Groups} G1 ON G1.{nameof(Group.GroupCode)} = UG.{nameof(ApplicationUserGroup.OfficeCode)}
                        INNER JOIN {TableNames.Groups} G2 ON G2.{nameof(Group.GroupCode)} = UG.{nameof(ApplicationUserGroup.GroupCode)}
                        WHERE UGN.{nameof(ApplicationUserGroupNhomNguoiDung.NhomNguoiDungId)} = @NhomNguoiDungId AND U.{nameof(ApplicationUser.TypeUser)} = '{ApplicationUserType.CanBo}'";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhSachUserNhomNguoiDungDto>(sql, req.PageSize, nameof(ApplicationUser.Id), page: req.PageNumber, param: req, cancellationToken: cancellationToken);
        return data;
    }

    private static string BuildInner(SearchUserNotInNhomNguoiDungRequest req)
    {
        string where = string.Empty;
        if (req.NhomNguoiDungId != null && req.NhomNguoiDungId != Guid.Empty)
            where += " AND NND.NhomNguoiDungId = @NhomNguoiDungId ";
        if (where.TrimStart().StartsWith("AND"))
            where = where.TrimStart().Substring("AND".Length);
        if (where != string.Empty)
            return $" WHERE ({where})";
        return where;
    }
    private static string BuildOuter(SearchUserNotInNhomNguoiDungRequest req)
    {
        string where = $"AND {nameof(ApplicationUser.TypeUser)} = '{ApplicationUserType.CanBo}'";
        //if (req.ChucDanhId != null && req.ChucDanhId != Guid.Empty)
        //    where += $" AND EXISTS (select top 1 {nameof(ApplicationUserChucDanh.Id)} from {TableNames.ApplicationUserChucDanhs} cd where cd.{nameof(ApplicationUserChucDanh.UserId)} = U.{nameof(ApplicationUser.Id)} and cd.{nameof(ApplicationUserChucDanh.ChucDanhId)} = @ChucDanhId)";
        //if (req.ChucVuId != null && req.ChucVuId != Guid.Empty)
        //    where += $" AND EXISTS (select top 1 {nameof(ApplicationUserChucVu.Id)} from {TableNames.ApplicationUserChucVus} cv where cv.{nameof(ApplicationUserChucVu.UserId)} = U.{nameof(ApplicationUser.Id)} and cv.{nameof(ApplicationUserChucVu.ChucVuId)} = @ChucVuId)";
        //if (!string.IsNullOrEmpty(req.GroupCode))
        if (!string.IsNullOrEmpty(req.UserName))
            where += $" AND U.{nameof(ApplicationUser.UserName)} Like '%' + @UserName + '%'";
        if (!string.IsNullOrEmpty(req.FullName))
            where += $" AND U.{nameof(ApplicationUser.FullName)} Like '%' + @FullName + '%'";
        if (!string.IsNullOrEmpty(req.OfficeCode))
            where += $" AND UG.{nameof(ApplicationUserGroup.OfficeCode)} = @OfficeCode";
        if (!string.IsNullOrEmpty(req.GroupCode))
            where += $" AND UG.{nameof(ApplicationUserGroup.GroupCode)} = @GroupCode";
        return where;
    }
    public async Task<PaginationResponse<DanhSachUserNotInNhomNguoiDungDto>> GetUserNotInNhomNguoiDung(SearchUserNotInNhomNguoiDungRequest req, CancellationToken cancellationToken = default)
    {
        var whereInner = BuildInner(req);
        var whereOuter = BuildOuter(req);
        var sql = $@"SELECT
                    UG.{nameof(ApplicationUserGroup.Id)},
                    UG.{nameof(ApplicationUserGroup.UserOrder)},
                    U.{nameof(ApplicationUser.UserName)},
                    U.{nameof(ApplicationUser.FullName)}
                    from {TableNames.ApplicationUserGroups} as UG INNER JOIN {TableNames.Users} as U ON UG.{nameof(ApplicationUserGroup.UserId)} = U.{nameof(ApplicationUser.Id)}
                    
                    WHERE U.{nameof(ApplicationUser.Id)} NOT IN (
                        SELECT NND.{nameof(ApplicationUserGroupNhomNguoiDung.UserGroupId)}
                        FROM {TableNames.ApplicationUserGroupNhomNguoiDungs} NND
	                    {whereInner}) {whereOuter}";
        var data = await _dapperRepository.PaginatedListSingleQueryAsync<DanhSachUserNotInNhomNguoiDungDto>(sql, req.PageSize, nameof(ApplicationUser.UserOrder), cancellationToken, req.PageNumber, req);
        return data;
    }

    public async Task<Result> Remove(RemoveUserNhomNguoiDungRequest req, CancellationToken cancellationToken = default)
    {
        try
        {
            var deletedUser = await _repository.ListAsync(new SearchUserGroupNhomNguoiDungSpec(req.Ids), cancellationToken);
            await _repository.DeleteRangeAsync(deletedUser);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {

            return (Result)Result.Fail(ex.Message);
        }
    }
}
