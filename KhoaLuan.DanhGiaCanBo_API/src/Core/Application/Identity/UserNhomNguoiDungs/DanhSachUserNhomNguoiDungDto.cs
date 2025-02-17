using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Common.Interfaces;

namespace TD.DanhGiaCanBo.Application.Identity.UserNhomNguoiDungs;

public class DanhSachUserNhomNguoiDungDto : IDto
{
    public string Id { get; set; }
    public DefaultIdType UserNhomId { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    public string GroupName { get; set; }
    public string OfficeName { get; set; }
    public string OfficeCode { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }

}


public class DanhSachUserNotInNhomNguoiDungDto : IDto
{
    public DefaultIdType Id { get; set; }
    public string UserName { get; set; }
    public string FullName { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }

}