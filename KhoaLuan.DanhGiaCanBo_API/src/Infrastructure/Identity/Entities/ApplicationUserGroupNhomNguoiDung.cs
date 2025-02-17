using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Domain.Common.Contracts;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
public class ApplicationUserGroupNhomNguoiDung : BaseEntity, IAggregateRoot
{
    public DefaultIdType UserGroupId { get; private set; }
    public DefaultIdType NhomNguoiDungId { get; private set; }
    public ApplicationUserGroup User { get; private set; }
    public NhomNguoiDung NhomNguoiDung { get; private set; }
    public ApplicationUserGroupNhomNguoiDung() { }
    public ApplicationUserGroupNhomNguoiDung(DefaultIdType userGroupId, DefaultIdType nhomNguoiDungId)
    {
        UserGroupId = userGroupId;
        NhomNguoiDungId = nhomNguoiDungId;
    }
    public ApplicationUserGroupNhomNguoiDung SetNhomNguoiDungId(DefaultIdType nhomNguoiDungId)
    {
        NhomNguoiDungId = nhomNguoiDungId;
        return this;
    }
}
