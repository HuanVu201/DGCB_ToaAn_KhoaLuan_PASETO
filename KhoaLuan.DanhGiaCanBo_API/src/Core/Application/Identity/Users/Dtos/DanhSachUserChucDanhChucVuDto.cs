using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
public class DanhSachUserChucDanhChucVuDto : IDto
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string TenChucVu { get; set; }
    public DanhSachUserChucDanhChucVuDto(User user, ChucVu chucVu)
    {
        Id = user.Id;
        UserName = user.UserName;
        FullName = user.FullName;
        TenChucVu = chucVu.Ten;
    }

    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public User(string id, string userName, string fullName)
        {
            Id = id;
            UserName = userName;
            FullName = fullName;
        }
    }
}

public class NguoiXuLyTiepDto : IDto
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string TenChucVu { get; set; }
    public DefaultIdType BuocXuLyId { get; set; }
    public string TenTrangThai { get; set; }
    public NguoiXuLyTiepDto(User user, string tenChucVu)
    {
        Id = user.Id;
        UserName = user.UserName;
        FullName = user.FullName;
        TenChucVu = tenChucVu;
    }

    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public User(string id, string userName, string fullName)
        {
            Id = id;
            UserName = userName;
            FullName = fullName;
        }
    }
}