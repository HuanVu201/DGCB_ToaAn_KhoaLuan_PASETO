using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Commands;
public class AddNhomDonViCommand : ICommand<Guid>
{
    public string TenNhom { get; set; }
    public string? MoTa { get; set; }
    public List<string> DonViIds { get; set; }
}
