using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

public class DongBoDanhGiaCoCauDto : IDto
{
    public int SoLieuThemMoi { get; set; }
    public int SoLieuCapNhat { get; set; }

}
