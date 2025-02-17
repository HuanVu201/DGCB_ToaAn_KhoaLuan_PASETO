using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Common.Contracts;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
public class VetXuLyDanhGia : BaseEntity, IAggregateRoot, ISoftDelete
{
    public DefaultIdType UserId { get; private set; }
    public DefaultIdType? BuocXuLyId { get; private set; }
    public DefaultIdType DanhGiaId { get; private set; }
    public DefaultIdType TrangThaiDanhGiaId { get; private set; }
    [MaxLength(255)]
    public string TenThaoTac { get; private set; }
    [MaxLength(2000)]
    public string TenBuocXuLy { get; private set; }
    [MaxLength(150)]
    public string TenNguoiXuLy { get; private set; }
    [MaxLength(256)]
    public string TaiKhoanXuLy { get; private set; }
    [MaxLength(100)]
    public string? TenTrangThai { get; private set; }
    [MaxLength(100)]
    public string? MaTrangThai { get; private set; }
    public bool LaNguoiDaXuLy { get; private set; }
    public DateTime? CreatedOn { get; private set; }
    public DateTime? DeletedOn { get; set; }
    public DefaultIdType? DeletedBy { get; set; }
    public DanhGia DanhGia { get; private set; }
    public BuocXuLy? BuocXuLy { get; private set; }
    public ApplicationUserGroup User { get; private set; }
    public TrangThaiDanhGia TrangThaiDanhGia { get; private set; }

    public VetXuLyDanhGia()
    {
        CreatedOn = DateTime.Now;
    }
    public VetXuLyDanhGia(DefaultIdType userId, DefaultIdType? buocXuLyId, DefaultIdType danhGiaId, string tenThaoTac, string tenBuocXuLy, string tenNguoiXuLy, string taiKhoanXuLy, bool laNguoiDaXuLy, DefaultIdType trangThaiDanhGiaId)
    {
        TenThaoTac = tenThaoTac;
        TenBuocXuLy = tenBuocXuLy;
        TenNguoiXuLy = tenNguoiXuLy;
        TaiKhoanXuLy = taiKhoanXuLy;
        CreatedOn = DateTime.Now;
        LaNguoiDaXuLy = laNguoiDaXuLy;
        TrangThaiDanhGiaId = trangThaiDanhGiaId;
        DanhGiaId = danhGiaId;
        BuocXuLyId = buocXuLyId;
        UserId = userId;
    }

    public VetXuLyDanhGia SoftDelete(DefaultIdType? nguoiXoa)
    {
        DeletedOn = DateTime.UtcNow;
        if (nguoiXoa != Guid.Empty && nguoiXoa != null)
        {
            DeletedBy = nguoiXoa;
        }
        return this;
    }
    public VetXuLyDanhGia Restore()
    {
        DeletedOn = null;
        DeletedBy = null;
        return this;
    }
}
