using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;
public class AddQuyTrinhXuLyCommand : ICommand<DefaultIdType>
{
    public string TenQuyTrinh { get; set; }
    public List<string> DonViIds { get; set; }
    public int ThuTu { get; set; } = 1;
    public bool LaQuyTrinhDonVi { get; set; }
}
