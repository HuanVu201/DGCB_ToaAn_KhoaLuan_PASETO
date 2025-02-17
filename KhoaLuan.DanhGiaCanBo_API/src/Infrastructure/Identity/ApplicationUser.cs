using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
using TD.DanhGiaCanBo.Domain.Business;
using System.Collections.Generic;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    [MaxLength(150)]
    public string? FullName { get; set; }
    public bool IsActive { get; set; }
    [MaxLength(150)]
    public string? RefreshToken { get; set; }
    public DateTime RefreshTokenExpiryTime { get; set; }
    [MaxLength(10)]
    public string? TypeUser { get; set; }
    public int UserOrder { get; set; } = 1;
    public string? ObjectId { get; set; }
    public Guid? CreatedBy { get; set; }
    public DateTime? CreatedOn { get; private set; }
    public Guid? LastModifiedBy { get; set; }
    public DateTime? LastModifiedOn { get; set; }
    public DateTime? DeletedOn { get; set; }
    public Guid? DeletedBy { get; set; }
    public bool ForcePasswordChange { get; set; } = false;

    private readonly List<ApplicationUserGroup> _applicationUserGroups = [];
    public IReadOnlyCollection<ApplicationUserGroup> ApplicationUserGroups => _applicationUserGroups;

    private readonly List<DanhGia> _danhGias = [];
    public IReadOnlyCollection<DanhGia> DanhGias => _danhGias;

    private readonly List<VetXuLyDanhGia> _vetXuLyDanhGias = [];
    public IReadOnlyCollection<VetXuLyDanhGia> VetXuLyDanhGias => _vetXuLyDanhGias;

    public ApplicationUser()
    {
        CreatedOn = DateTime.Now;
        LastModifiedOn = DateTime.Now;
    }

    public void SetId(string id)
    {
        Id = id;
    }

    public void AddToGroup(ApplicationUserGroup? applicationUserGroup)
    {
        if(applicationUserGroup == null)
        {
            return;
        }
        _applicationUserGroups.Add(applicationUserGroup);
    }

    public ApplicationUser SoftDelete(DefaultIdType? nguoiXoa)
    {
        DeletedOn = DateTime.UtcNow;
        if (nguoiXoa != Guid.Empty && nguoiXoa != null)
        {
            DeletedBy = nguoiXoa;
        }
        return this;
    }
    public ApplicationUser Restore()
    {
        DeletedOn = null;
        DeletedBy = null;
        return this;
    }

    //public void UpdateUserGroup(ApplicationUserGroup? applicationUserGroup)
    //{
    //    if (applicationUserGroup == null || applicationUserGroup.Id == Guid.Empty)
    //    {
    //        return;
    //    }
    //    if(_applicationUserGroups.Count == 0)
    //    {
    //        return;
    //    }
    //    var updateDatas = _applicationUserGroups.Select(x =>
    //    {
    //        x.Update(applicationUserGroup.UserId, applicationUserGroup.GroupId, applicationUserGroup.ChucDanhId, applicationUserGroup.ChucVuId, applicationUserGroup.IsDefault,
    //            applicationUserGroup.UserOrder, applicationUserGroup.NoiDungKiemNhiem, applicationUserGroup.ThamQuyenXepLoai, applicationUserGroup.KiemNhiem, applicationUserGroup.TruongDonVi,
    //            applicationUserGroup.KhongDanhGia);
    //        return x;
    //    });

    //}
    public static class ApplicationUserType
    {
        public const string CanBo = nameof(CanBo);
        public const string Admin = nameof(Admin);
    }
}