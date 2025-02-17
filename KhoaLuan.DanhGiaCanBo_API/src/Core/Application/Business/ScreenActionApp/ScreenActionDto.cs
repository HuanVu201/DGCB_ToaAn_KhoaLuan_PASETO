

using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.ActionApp;

namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp;


public class ScreenActionDto : IDto
{
    public DefaultIdType Id { get; set; }
    public DefaultIdType ScreenId { get; set; }
    public DefaultIdType ActionId { get; set; }
    public string MaScreen { get; set; }
    public string MaAction { get; set; }
    public string Ten { get; set; }
    public string Quyen { get; set; }
    public string ThuTu { get; set; }
    public string? IconName { get; set; }
    public string? ColorCode { get; set; }
    public bool? ShowInModal { get; set; }
    public bool? ShowInTable { get; set; }
    public bool? ShowActionInModal { get; set; }
    public bool? ShowActionInTable { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}

public class ScreenActionWithPermissionDto : IDto
{
    public DefaultIdType Id { get; set; }
    public DefaultIdType ScreenId { get; set; }
    public DefaultIdType ActionId { get; set; }
    public string MaScreen { get; set; }
    public string MaAction { get; set; }
    public string Ten { get; set; }
    public string Quyen { get; set; }
    public string ThuTu { get; set; }
    public string? IconName { get; set; }
    public string? ColorCode { get; set; }
    public bool? ShowInModal { get; set; }
    public bool? ShowInTable { get; set; }
    public bool? ShowActionInModal { get; set; }
    public bool? ShowActionInTable { get; set; }
    public string? ApplyForUsers { get; set; }
    public string? ApplyForUserGroups { get; set; }

    [JsonIgnore]
    public int TotalCount { get; set; }
}


