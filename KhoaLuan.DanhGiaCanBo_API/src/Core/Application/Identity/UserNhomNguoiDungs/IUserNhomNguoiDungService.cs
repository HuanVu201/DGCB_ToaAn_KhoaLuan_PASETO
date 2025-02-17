using TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs.Params;

namespace TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs;
public interface IUserNhomNguoiDungService : ITransientService
{
    Task<Result> AddUsesr(AddUserNhomNguoiDungRequest req, CancellationToken cancellationToken = default);
    Task<Result> AddToNhom(AddUserToMultipleNhomRequest? req, DefaultIdType createdUserGroupId, CancellationToken cancellationToken = default);
    Task<Result> Remove(RemoveUserNhomNguoiDungRequest req, CancellationToken cancellationToken = default);
    Task<PaginationResponse<DanhSachUserNhomNguoiDungDto>> GetUserNhomNguoiDung(SearchUserNhomNguoiDungQuery param, CancellationToken cancellationToken = default);
    Task<PaginationResponse<DanhSachUserNotInNhomNguoiDungDto>> GetUserNotInNhomNguoiDung(SearchUserNotInNhomNguoiDungRequest req, CancellationToken cancellationToken = default);
}
