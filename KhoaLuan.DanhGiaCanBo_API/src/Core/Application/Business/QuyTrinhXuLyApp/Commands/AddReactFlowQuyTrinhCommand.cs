using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;
public class AddReactFlowQuyTrinhCommand : ICommand
{
    public List<LienKetBuocXuLy>? LienKetBuocXuLys { get; set; }
    public List<BuocXuLy> BuocXuLys { get; set; }
    public Guid QuyTrinhXuLyId { get; set; }
}
