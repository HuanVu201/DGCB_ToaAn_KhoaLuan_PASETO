using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TD.DanhGiaCanBo.Domain.Business;
public class LienKetBuocXuLy : AuditableEntity, IAggregateRoot
{
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string Type { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string MarkerEndType { get; private set; } = "arrowclosed";
    public bool Animated { get; private set; } = true;
    public int StyleStrokeWidth { get; private set; } = 4;
    [MaxLength(30)]
    [Column(TypeName = "varchar")]
    public string StyleStroke { get; private set; } = "black";
    public Guid Source { get; private set; }
    public Guid Target { get; private set; }
    public Guid QuyTrinhXuLyId { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string SourceHandle { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string TargetHandle { get; private set; }
    [MaxLength(255)]
    public string Label { get; private set; }
    public BuocXuLy BuocXuLySource { get; private set; }
    public BuocXuLy BuocXuLyTarget { get; private set; }
    public QuyTrinhXuLy QuyTrinhXuLy { get; private set; }
    public LienKetBuocXuLy() { }
    public LienKetBuocXuLy(string type, string markerEndType, bool animated, int styleStrokeWidth, string styleStroke, DefaultIdType source,
        DefaultIdType target, string sourceHandle, string targetHandle, string label)
    {
        Type = type;
        MarkerEndType = markerEndType;
        Animated = animated;
        StyleStrokeWidth = styleStrokeWidth;
        StyleStroke = styleStroke;
        Source = source;
        Target = target;
        SourceHandle = sourceHandle;
        TargetHandle = targetHandle;
        Label = label;
    }

    public LienKetBuocXuLy SetQuyTrinhXuLyId(DefaultIdType Id)
    {
        QuyTrinhXuLyId = Id;
        return this;
    }
    public LienKetBuocXuLy SetId(DefaultIdType id)
    {
        if(id != default)
            Id = id;
        return this;
    }
    public LienKetBuocXuLy SetLabel(string? label)
    {
        if(label != null)
            Label = label;
        return this;
    }
    public LienKetBuocXuLy Update(LienKetBuocXuLy lienKetBuocXuLy)
    {
        string? type = lienKetBuocXuLy.Type;
        string? markerEndType = lienKetBuocXuLy.MarkerEndType;
        bool? animated = lienKetBuocXuLy.Animated;
        int? styleStrokeWidth = lienKetBuocXuLy.StyleStrokeWidth;
        string? styleStroke = lienKetBuocXuLy.StyleStroke;
        DefaultIdType? source = lienKetBuocXuLy.Source;
        DefaultIdType? target = lienKetBuocXuLy.Target;
        string? sourceHandle = lienKetBuocXuLy.SourceHandle;
        string? targetHandle = lienKetBuocXuLy.TargetHandle;
        string? label = lienKetBuocXuLy.Label;

        if (type is not null && Type?.Equals(type) is not true) Type = type;
        if(markerEndType is not null && MarkerEndType?.Equals(markerEndType) is not true) MarkerEndType = markerEndType;
        if(animated is not null && Animated.Equals(animated) is not true) Animated = (bool)animated;
        if(styleStrokeWidth is not null && StyleStrokeWidth.Equals(styleStrokeWidth) is not true) StyleStrokeWidth = (int)styleStrokeWidth;
        if(styleStroke is not null && StyleStroke?.Equals(styleStroke) is not true) StyleStroke = styleStroke;
        if(source != default && Source.Equals(source) is not true) Source = (DefaultIdType)source;
        if(target is not null && Target.Equals(target) is not true) Target = (DefaultIdType)target;
        if(sourceHandle is not null && SourceHandle?.Equals(sourceHandle) is not true) SourceHandle = sourceHandle;
        if(targetHandle is not null && TargetHandle?.Equals(targetHandle) is not true) TargetHandle = targetHandle;
        if(label is not null && Label?.Equals(label) is not true) Label = label;
        return this;
    }

    public LienKetBuocXuLy SoftDelete(DefaultIdType? deletedBy)
    {
        DeletedOn = DateTime.UtcNow;
        DeletedBy = deletedBy;
        return this;
    }

    public LienKetBuocXuLy Restore()
    {
        DeletedOn = null;
        return this;
    }
}
