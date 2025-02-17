using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Identity.UserGroups.Dtos;
using TD.DanhGiaCanBo.Application.Identity.UserGroups.Params;
using TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs.Params;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
using TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;

namespace TD.DanhGiaCanBo.Application.Identity.UserGroups;
public interface IUserGroupService : ITransientService
{
    Task<Result> Add(AddUserGroupRequest req, CancellationToken cancellationToken = default);
    Task<Result> Remove(RemoveUserGroupRequest req, CancellationToken cancellationToken = default);
    Task<Result> Update(UpdateUserGroupRequest req, CancellationToken cancellationToken = default);
    Task<PaginationResponse<DanhSachUserGroupDto>> SearchUserGroup(SearchUserGroupRequest req, CancellationToken cancellationToken = default);
    Task<PaginationResponse<DanhSachUserGroupDto>> SearchUserGroupNotGroupCode(SearchUserGroupNotGroupCodeRequest req, CancellationToken cancellationToken = default);
    
    Task<Result<NguoiXuLyTiepDto>> SearchDanhSachNguoiXuLyTiep(SearchUserByBuocXuLyHienTaiRequest req, CancellationToken cancellationToken);
    Task<GetQuyTrinhXuLyByCurrentUserQueryHandler.GetNodeByBuocXuLyRequestData> GetUserGroupBuocXuLy(string userGroupId);
    Task<Result<List<DanhSachUserGroupVaiTroDto>>> SearchDanhSachUserGroupVaiTro(CancellationToken cancellationToken = default);
    Task<Result<List<DanhSachUserGroupTruongDonViDto>>> SearchUserGroupTruongDonVi(CancellationToken cancellationToken = default);
}
