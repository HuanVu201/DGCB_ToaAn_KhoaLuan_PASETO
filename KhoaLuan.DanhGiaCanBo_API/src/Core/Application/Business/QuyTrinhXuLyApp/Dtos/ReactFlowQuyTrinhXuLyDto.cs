using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos;
public class ReactFlowQuyTrinhXuLyDto : IDto
{
    public List<ReactFlowNodeDto> Nodes { get; set; }
    public List<ReactFlowEdgeDto> Edges { get; set; }
}
