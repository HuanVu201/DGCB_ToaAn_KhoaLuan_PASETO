using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.Wordprocessing;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Domain.Common.Contracts;

namespace TD.DanhGiaCanBo.Infrastructure.Identity.Entities;
public class ApplicationUserGroup : BaseEntity, IAggregateRoot, ISoftDelete
{
    [MaxLength(450)]
    public string UserId { get; private set; }
    [MaxLength(50)]
    public string OfficeCode { get; private set; }
    [MaxLength(50)]
    public string GroupCode { get; private set; }
    [Column(TypeName = "VARCHAR")]
    [MaxLength(450)]
    public string? MaPhieuDanhGia { get; private set; }
    public DefaultIdType? ChucDanhId { get; private set; }
    public DefaultIdType? ChucVuId { get; private set; }
    public bool IsDefault { get; private set; } = false;
    public int UserOrder { get; private set; } = 1;
    public bool? ThamQuyenXepLoai { get; private set; } = false;
    public bool? KiemNhiem { get; private set; } = false;
    public bool? TruongDonVi { get; private set; } = false;
    public bool? KhongDanhGia { get; private set; } = false;
    public bool? IsKySo { get; private set; } = false;
    [MaxLength(500)]
    public string? NoiDungKiemNhiem { get; private set; }
    public Group Group { get; private set; }
    public Group? PhongBan { get; private set; }
    public ApplicationUser User { get; private set; }
    public ChucVu ChucVu { get; private set; }
    public ChucDanh ChucDanh { get; private set; }

    private readonly List<ApplicationUserGroupNhomNguoiDung> _applicationUserGroupNhomNguoiDungs = [];
    public IReadOnlyCollection<ApplicationUserGroupNhomNguoiDung> ApplicationUserGroupNhomNguoiDungs => _applicationUserGroupNhomNguoiDungs;

    private readonly List<VetXuLyDanhGia> _vetXuLyDanhGias = [];
    public IReadOnlyCollection<VetXuLyDanhGia> VetXuLyDanhGias => _vetXuLyDanhGias;
    private readonly List<VetXuLyDanhGiaToChuc> _vetXuLyDanhGiaToChucs = [];
    public IReadOnlyCollection<VetXuLyDanhGiaToChuc> VetXuLyDanhGiaToChucs => _vetXuLyDanhGiaToChucs;
    public DateTime? DeletedOn { get; set; }
    public DefaultIdType? DeletedBy { get; set; }

    public ApplicationUserGroup(){}

    public ApplicationUserGroup(string userId, string donViId, string phongBanId, DefaultIdType? chucDanhId, DefaultIdType? chucVuId, bool isDefault, int userOrder, string? noiDungKiemNhiem, string? maPhieuDanhGia, bool? thamQuyenXepLoai = false,
        bool? kiemNhiem = false, bool? truongDonVi = false, bool? khongDanhGia = false,bool? isKySo = false)
    {
        UserId = userId;
        OfficeCode = donViId;
        GroupCode = phongBanId;
        ChucDanhId = chucDanhId;
        ChucVuId = chucVuId;
        IsDefault = isDefault;
        UserOrder = userOrder;
        ThamQuyenXepLoai = thamQuyenXepLoai;
        KiemNhiem = kiemNhiem;
        TruongDonVi = truongDonVi;
        KhongDanhGia = khongDanhGia;
        NoiDungKiemNhiem = noiDungKiemNhiem;
        MaPhieuDanhGia = maPhieuDanhGia;
        IsKySo = IsKySo;
    }
    public ApplicationUserGroup Update(string? userId, string groupId, string? phongBanId, DefaultIdType? chucDanhId, DefaultIdType? chucVuId, bool? isDefault, int? userOrder, string? noiDungKiemNhiem, bool? thamQuyenXepLoai,
        bool? kiemNhiem, bool? truongDonVi, bool? khongDanhGia, string? maPhieuDanhGia, bool? isKySo)
    {
        //if (userId is not null && UserId?.Equals(userId) is not true) UserId = userId;
        //if (groupId != Guid.Empty && GroupId.Equals(groupId) is not true) GroupId = groupId;
        //if (phongBanId != Guid.Empty && phongBanId != null && PhongBanId != null && PhongBanId.Equals(phongBanId) is not true) PhongBanId = (DefaultIdType)phongBanId;
        if (!string.IsNullOrEmpty(phongBanId) && GroupCode != null && GroupCode.Equals(phongBanId) is not true) GroupCode = phongBanId;
        if (chucDanhId != Guid.Empty) ChucDanhId = chucDanhId;
        if (chucVuId != Guid.Empty) ChucVuId = chucVuId;
        if (isDefault is not null && IsDefault.Equals(isDefault) is not true) IsDefault = (bool)isDefault;
        if (thamQuyenXepLoai is not null && ThamQuyenXepLoai.Equals(thamQuyenXepLoai) is not true) ThamQuyenXepLoai = (bool)thamQuyenXepLoai;
        if (kiemNhiem is not null && KiemNhiem.Equals(kiemNhiem) is not true) KiemNhiem = (bool)kiemNhiem;
        if (truongDonVi is not null && TruongDonVi.Equals(truongDonVi) is not true) TruongDonVi = (bool)truongDonVi;
        if (khongDanhGia is not null && KhongDanhGia.Equals(khongDanhGia) is not true) KhongDanhGia = (bool)khongDanhGia;
        if (userOrder is not null && UserOrder.Equals(userOrder) is not true) UserOrder = (int)userOrder;
        if (noiDungKiemNhiem is not null && NoiDungKiemNhiem?.Equals(noiDungKiemNhiem) is not true) NoiDungKiemNhiem = noiDungKiemNhiem;
        if (isKySo is not null) IsKySo = (bool)isKySo;
        MaPhieuDanhGia = maPhieuDanhGia;
        return this;
    }

    public ApplicationUserGroup(string userId, string donViId)
    {
        UserId = userId;
        OfficeCode = donViId;
    }
    public ApplicationUserGroup SoftDelete(DefaultIdType? nguoiXoa)
    {
        DeletedOn = DateTime.UtcNow;
        if (nguoiXoa != Guid.Empty && nguoiXoa != null)
        {
            DeletedBy = nguoiXoa;
        }
        return this;
    }

    public void UpsertNhomNguoiDung(List<Guid>? nhomNguoiDungs)
    {
        if (nhomNguoiDungs == null)
        {
            return;
        }
        var newNhomNguoiDungIds = nhomNguoiDungs.ConvertAll(id => new ApplicationUserGroupNhomNguoiDung(Id, id));

        // Xóa các liên kết không còn nằm trong danh sách mới
        _applicationUserGroupNhomNguoiDungs.RemoveAll(existing => !nhomNguoiDungs.Contains(existing.NhomNguoiDungId));

        // Thêm các liên kết mới chưa có trong danh sách hiện tại
        foreach (var newNhomNguoiDung in newNhomNguoiDungIds)
        {
            if (!_applicationUserGroupNhomNguoiDungs.Any(existing => existing.NhomNguoiDungId == newNhomNguoiDung.NhomNguoiDungId))
            {
                _applicationUserGroupNhomNguoiDungs.Add(newNhomNguoiDung);
            }
        }
    }

    public ApplicationUserGroup Restore()
    {
        DeletedOn = null;
        DeletedBy = null;
        return this;
    }
}
