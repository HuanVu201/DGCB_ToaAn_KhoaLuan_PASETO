using Ardalis.Specification;
using Mapster;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Specifications;
public class GetDetailCurrentUserSpec : SingleResultSpecification<ApplicationUserGroup, DetailCurrentUserDto>
{
    public GetDetailCurrentUserSpec(string Id, string userId, bool asNoTracking = true)
    {
        Query
            .Select(x => new DetailCurrentUserDto(x.UserId, x.User.UserName, x.User.FullName, x.OfficeCode, x.Group.GroupName, x.GroupCode, x.PhongBan.GroupName, x.NoiDungKiemNhiem, x.User.TypeUser, x.ThamQuyenXepLoai,
            x.KiemNhiem, x.TruongDonVi, x.KhongDanhGia, x.IsDefault, x.MaPhieuDanhGia, x.ChucDanh, x.ChucVu, x.ApplicationUserGroupNhomNguoiDungs.Select(x => x.NhomNguoiDung).ToList(),x.User.ForcePasswordChange,x.Id.ToString(), x.IsKySo))
            .AsSplitQuery();
        if (asNoTracking)
        {
            Query.AsNoTracking();
        }
        if(!string.IsNullOrEmpty(Id))
        {
            Query.Where(x => x.Id.ToString() == Id);
        }
        if (!string.IsNullOrEmpty(userId))
        {
            Query.Where(x => x.UserId == userId);
        }
    }
}
