using Ardalis.Specification;
using FluentValidation;
using Mapster;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Validation;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
using TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Specifications;

public class SearchUserByGroupValidator : CustomValidator<SearchUserByGroupSpec>
{
    public SearchUserByGroupValidator(SearchUserByChucDanhChucVuRequest req)
    {
        RuleFor(x => x).Must(_ => ValidateDonVi(req)).WithMessage("Tham số không hợp lệ");
        RuleFor(x => x).Must(_ => ValidatePhongBan(req)).WithMessage("Tham số không hợp lệ");
        RuleFor(x => x).Must(_ => ValidateNguoiQuanLy(req)).WithMessage("Tham số không hợp lệ");
    }
    private bool ValidateDonVi(SearchUserByChucDanhChucVuRequest req)
    {
        if(req.CungDonVi == true && string.IsNullOrEmpty(req.OfficeCode))
        {
            return false;
        }
        if(req.CungDonVi != true && !string.IsNullOrEmpty(req.OfficeCode))
        {
            return false;
        }
        return true;
    }
    private bool ValidatePhongBan(SearchUserByChucDanhChucVuRequest req)
    {
        if (req.CungPhongBan == true && string.IsNullOrEmpty(req.GroupCode))
        {
            return false;
        }
        if (req.CungPhongBan != true && !string.IsNullOrEmpty(req.GroupCode))
        {
            return false;
        }
        return true;
    }
    private bool ValidateNguoiQuanLy(SearchUserByChucDanhChucVuRequest req)
    {
        if (req.LayNguoiQuanLy == true && string.IsNullOrEmpty(req.GroupCode))
        {
            return false;
        }
        if (req.LayNguoiQuanLy != true && !string.IsNullOrEmpty(req.GroupCode))
        {
            return false;
        }
        return true;
    }
}

public class SearchUserByGroupSpec : Specification<ApplicationUserGroup, NguoiXuLyTiepDto>
{
    public SearchUserByGroupSpec(SearchUserByChucDanhChucVuRequest req, DefaultIdType? nguoiQuanLyPhongId = null, string? ofGroupCode = null)
    {

        if (req.LayNguoiQuanLy == true)
        {
            if(nguoiQuanLyPhongId == null || nguoiQuanLyPhongId == Guid.Empty)
            {
                throw new Exception("Chưa cấu hình người quản lý");
            }
            Query
            .Select(x => new NguoiXuLyTiepDto(new NguoiXuLyTiepDto.User(x.Id.ToString(), x.User.UserName, x.User.FullName), x.ChucVu.Ten))
            .Where(x => x.Id == nguoiQuanLyPhongId, nguoiQuanLyPhongId != null && nguoiQuanLyPhongId != Guid.Empty)
            .AsNoTracking();
        }
        else if(req.LaQuyTrinhDonVi == true)
        {
            Query
            .Select(x => new NguoiXuLyTiepDto(new NguoiXuLyTiepDto.User(x.Id.ToString(), x.User.UserName, x.User.FullName), x.ChucVu.Ten))
            .Where(x => req.DonViIds.Contains(x.GroupCode), req.DonViIds?.Count > 0)
            .Where(x => x.ChucVuId != null && req.ChucVuIds.ToList().Contains((Guid)x.ChucVuId), req.ChucVuIds?.Count > 0)
            .Where(x => x.ChucDanhId != null && req.ChucDanhIds.ToList().Contains((Guid)x.ChucDanhId), req.ChucDanhIds?.Count > 0)
            .Where(x => x.OfficeCode == req.OfficeCode, !string.IsNullOrEmpty(req.OfficeCode) && req.CungDonVi == true)
            .Where(x => x.GroupCode == req.GroupCode, !string.IsNullOrEmpty(req.GroupCode) && req.CungPhongBan == true)
            .Where(x => x.OfficeCode == ofGroupCode, !string.IsNullOrEmpty(ofGroupCode) && req.LayDonViCapTren == true)
            .AsNoTracking();
        }
        else
        {
            Query
            .Select(x => new NguoiXuLyTiepDto(new NguoiXuLyTiepDto.User(x.Id.ToString(), x.User.UserName, x.User.FullName), x.ChucVu.Ten))
            //.Where(x => x.ApplicationUserGroupNhomNguoiDungs.Select(x => new
            //{
            //    x.NhomNguoiDungId,
            //    x.UserGroupId
            //}).Any(ngd => req.NhomNguoiDungs.Contains(ngd.NhomNguoiDungId) && ngd.UserGroupId == x.Id), req.NhomNguoiDungs?.Count > 0)
            .Where(x => req.DonViIds.Contains(x.GroupCode), req.DonViIds?.Count > 0)
            .Where(x => x.ChucVuId != null && req.ChucVuIds.ToList().Contains((Guid)x.ChucVuId), req.ChucVuIds?.Count > 0)
            .Where(x => x.ChucDanhId != null && req.ChucDanhIds.ToList().Contains((Guid)x.ChucDanhId), req.ChucDanhIds?.Count > 0)
            .Where(x => x.OfficeCode == req.OfficeCode, !string.IsNullOrEmpty(req.OfficeCode) && req.CungDonVi == true)
            .Where(x => x.GroupCode == req.GroupCode, !string.IsNullOrEmpty(req.GroupCode) && req.CungPhongBan == true)
            .Where(x => x.GroupCode == ofGroupCode, !string.IsNullOrEmpty(ofGroupCode) && req.LayDonViCapTren == true)
            .AsNoTracking();
        }
    }
}

public class GetNguoiQuanLyPhong : SingleResultSpecification<Group, DefaultIdType?>
{
    public GetNguoiQuanLyPhong(string maPhongBan)
    {
        Query
            .Select(x => x.InChargeId)
            .Where(x => x.GroupCode == maPhongBan).AsNoTracking();

    }
}

public class GetDonViCapTren : Specification<Group, string>
{
    public GetDonViCapTren(string userOfficeCode)
    {
        Query.Select(x => x.OfGroupCode)
            .Where(x => x.GroupCode == userOfficeCode).AsNoTracking();
    }
}

public class GetDanhSachGroupCodeByNhomDonVi : Specification<DanhSachNhomDonVi, string>
{
    public GetDanhSachGroupCodeByNhomDonVi(List<DefaultIdType> nhomDonViIds)
    {
        Query.Select(x => x.GroupCode)
            .Where(x => nhomDonViIds.Contains(x.NhomDonViId)).AsNoTracking();
    }
}