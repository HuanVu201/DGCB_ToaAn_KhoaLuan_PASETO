using Ardalis.Specification;
using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.Extensions.Azure;
using RazorEngineCore;
using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Queries;
using TD.DanhGiaCanBo.Application.Identity.UserGroups;
using TD.DanhGiaCanBo.Application.Identity.UserGroups.Dtos;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Specifications;
public class ApplicationUserGroupSpec
{
    public class GetUserGroup : SingleResultSpecification<ApplicationUserGroup>
    {
        public GetUserGroup(string userId, bool? isDefault = true, bool IncludeApplicationUserGroupNhomNguoiDung = false, bool inCludeGroup = false, bool inCludePhongBan = false, bool getByUserGroupId = false)
        {
            if (getByUserGroupId)
            {
                Query.Where(x => x.Id.ToString() == userId);
            }
            else
            {
                Query
                .Where(x => x.UserId == userId)
                .Where(x => x.IsDefault, isDefault == true);
            }

            if (IncludeApplicationUserGroupNhomNguoiDung)
            {
                Query.Include(x => x.ApplicationUserGroupNhomNguoiDungs);
            }

            if (inCludeGroup)
            {
                Query.Include(x => x.Group);
            }

            if (inCludePhongBan)
            {
                Query.Include(x => x.PhongBan);
            }
        }
    }
    public class GetUserGroups : Specification<ApplicationUserGroup, DanhSachUserGroupVaiTroDto>
    {
        public GetUserGroups(string userId)
        {
            Query
                .Select(x => new DanhSachUserGroupVaiTroDto(x.Id, x.Group.GroupName ?? string.Empty, x.PhongBan.GroupName ?? string.Empty))
                .Where(x => x.UserId == userId)
                .AsSplitQuery()
                .AsNoTracking();
        }
    }

    public class SearchUserGroupTruongDonVi : Specification<ApplicationUserGroup, DanhSachUserGroupTruongDonViDto>
    {
        public SearchUserGroupTruongDonVi(string officeCode)
        {
            Query
            .Select(x => new DanhSachUserGroupTruongDonViDto(x.UserId, x.Id.ToString(), x.User.UserName, x.User.FullName, x.OfficeCode, x.Group.GroupName, x.Group.FullCode, x.GroupCode, x.PhongBan.GroupName
            , x.NoiDungKiemNhiem, x.User.TypeUser, x.User.PhoneNumber, x.User.Email, x.User.UserOrder, x.ThamQuyenXepLoai,
            x.KiemNhiem, x.KhongDanhGia,
            x.ChucDanh != null ? new DanhSachUserGroupTruongDonViDto.UserChucDanh(x.ChucDanh.Id, x.ChucDanh.Ten, x.ChucDanh.Ma) : null,
            x.ChucVu != null ? new DanhSachUserGroupTruongDonViDto.UserChucVu(x.ChucVu.Id, x.ChucVu.Ten, x.ChucVu.Ma) : null))
            .AsSplitQuery().AsNoTracking()
            .Where(x => x.TruongDonVi == true)
            .Where(x => x.OfficeCode == officeCode);
        }
    }

    public class GetBuocXuLyByCurrentUserGroup : SingleResultSpecification<ApplicationUserGroup, GetQuyTrinhXuLyByCurrentUserQueryHandler.GetNodeByBuocXuLyRequestData>
    {
        public GetBuocXuLyByCurrentUserGroup(string userGroupId)
        {
            try
            {
                //Query.Select(x => new GetQuyTrinhXuLyByCurrentUserQueryHandler.GetNodeByBuocXuLyRequestData(x.ChucDanhId, x.ChucVuId, x.ApplicationUserGroupNhomNguoiDungs.Select(x => x.NhomNguoiDungId).ToList()))
                Query.Select(x => new GetQuyTrinhXuLyByCurrentUserQueryHandler.GetNodeByBuocXuLyRequestData(x.ChucDanhId, x.ChucVuId, x.GroupCode))
                    .Where(x => x.Id.ToString() == userGroupId).AsNoTracking();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}