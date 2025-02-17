using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Identity.Tokens;

namespace TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
public class GetCurrentUserDanhGiaQueryHandler : IQueryHandler<GetCurrentUserDanhGiaQuery, CurrentUserDanhGiaDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly ITokenService _tokenService;
    public GetCurrentUserDanhGiaQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser, ITokenService tokenService)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _tokenService = tokenService;
    }

    public async Task<Result<CurrentUserDanhGiaDto>> Handle(GetCurrentUserDanhGiaQuery request, CancellationToken cancellationToken)
    {
        string currUserId = _currentUser.GetUserGroupId().ToString();
        if (string.IsNullOrEmpty(currUserId))
        {
            return Result<CurrentUserDanhGiaDto>.Fail(message: "Không có thông tin của người dùng hiện tại!");
        }

        string sqlQueryUser = @$"
                SELECT aug.Id as MaNguoiDung, FullName, UserName, cv.Ten as ChucVu, aug.ChucVuId, cd.Ten as ChucDanh, aug.ChucDanhId, u.UserOrder as ThuTu,
                    g2.GroupName as TenPhongBan, g2.GroupCode as MaPhongBan, g1.GroupName as TenDonVi, g1.GroupCode as MaDonVi, g1.FullCode as MaDonViFull,
                    g1.OfGroupCode as MaDonViCha, u.PhoneNumber as Phone, u.Email, aug.KiemNhiem, aug.NoiDungKiemNhiem, aug.KhongDanhGia
                FROM [Identity].[Users] u
                INNER JOIN [Identity].[ApplicationUserGroups] aug ON aug.UserId = u.id 
                LEFT JOIN [Business].[ChucDanhs] cd ON cd.Id = aug.ChucDanhId 
                LEFT JOIN [Business].[ChucVus] cv ON cv.id = aug.ChucVuId 
                INNER JOIN [Catalog].[Groups] g1 ON g1.GroupCode = aug.OfficeCode 
                INNER JOIN [Catalog].[Groups] g2 ON g2.GroupCode = aug.GroupCode 
                WHERE aug.DeletedOn is null AND aug.Id= '{currUserId}'";
        var resUser = await _dapperRepository.QueryFirstOrDefaultAsync<CurrentUserDanhGiaDto>(sqlQueryUser);
        if (resUser == null)
            return Result<CurrentUserDanhGiaDto>.Fail(message: "Không có thông tin của người dùng hiện tại");
        string maDonViCha = _tokenService.GetMaDonViCha(resUser.MaDonVi, resUser.MaDonViCha);
        resUser.MaDonViCha = maDonViCha ?? string.Empty;
        return Result<CurrentUserDanhGiaDto>.Success(resUser);
    }
}