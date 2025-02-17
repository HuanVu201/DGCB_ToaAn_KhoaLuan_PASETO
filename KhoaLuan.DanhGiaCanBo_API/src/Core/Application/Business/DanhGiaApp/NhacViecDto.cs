using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

public class NhacViecDto : IDto
{
    public string DuongDan { get; set; }
    public string MauSac { get; set; }
    public string Class { get; set; }
    public string Icon { get; set; }
    public string MoTa { get; set; }
    public string GiaTri { get; set; }
    public string Ma { get; set; }
}
