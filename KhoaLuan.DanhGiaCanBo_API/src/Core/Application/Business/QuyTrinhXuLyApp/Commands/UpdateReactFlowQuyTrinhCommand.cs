using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;
public class UpdateReactFlowQuyTrinhCommand : ICommand
{
    public List<LienKetBuocXuLyData>? LienKetBuocXuLys { get; set; }
    public List<BuocXuLyPosition>? BuocXuLys { get; set; }
    public Guid QuyTrinhXuLyId { get; set; }
    public class BuocXuLyPosition
    {
        public DefaultIdType Id { get; set; }
        public double PositionX { get; set; }
        public double PositionY { get; set; }
        public double PositionAbsoluteX { get; set; }
        public double PositionAbsoluteY { get; set; }
        public bool LaBuocDauTien { get; set; }
        public bool CungDonVi { get; set; }
        public bool CungPhongBan { get; set; }
        public bool LayNguoiQuanLy { get; set; }
        public bool LaBuocCuoiCung { get; set; }
        public bool Deletable { get; set; }
        public bool Selected { get; set; }
        public bool Dragging { get; set; }

    }
    public class LienKetBuocXuLyData
    {
        public DefaultIdType Id { get; set; }
        public string Type { get; set; }
        public string MarkerEndType { get; set; } = "arrowclosed";
        public bool Animated { get; set; } = true;
        public int StyleStrokeWidth { get; set; } = 4;
        public string StyleStroke { get; set; } = "black";
        public Guid Source { get; set; }
        public Guid Target { get; set; }
        public Guid QuyTrinhXuLyId { get; set; }
        public string SourceHandle { get; set; }
        public string TargetHandle { get; set; }
        public string Label { get; set; }
    }
}
