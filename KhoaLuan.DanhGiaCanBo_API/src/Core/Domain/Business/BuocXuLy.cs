using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Emit;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Domain.Business;
public class BuocXuLy : AuditableEntity, IAggregateRoot
{
    [MaxLength(255)]
    public string TenBuoc { get; private set; }
    public bool CungDonVi { get; private set; } = false;
    public bool CungPhongBan { get; private set; } = false;
    public bool LayNguoiQuanLy { get; private set; } = false;
    public bool LayDonViCapTren { get; private set; } = false;
    public bool LaBuocDauTien { get; private set; } = false;
    public bool LaBuocCuoiCung { get; private set; } = false;
    public bool KhongCoChucVu { get; private set; } = false;
    public bool KhongCoChucDanh { get; private set; } = false;
    public double? ThoiHanXuLy { get; private set; }
    public DefaultIdType QuyTrinhXuLyId { get; private set; }
    public DefaultIdType TrangThaiDanhGiaId { get; private set; }
    #region ReactFlow Data
    public double PositionX { get; private set; }
    public double PositionY { get; private set; }
    public double PositionAbsoluteX { get; private set; }
    public double PositionAbsoluteY { get; private set; }
    [MaxLength(50)]
    [Column(TypeName = "varchar")]
    public string Type { get; private set; }
    public bool Deletable { get; private set; } = false;
    public int Width { get; private set; }
    public int Height { get; private set; }
    public bool Selected { get; private set; } = false;
    public bool Dragging { get; private set; } = false;
    #endregion ReactFlow Data
    private readonly List<LienKetBuocXuLy> _Sources = [];
    public IReadOnlyCollection<LienKetBuocXuLy> Sources => _Sources;

    private readonly List<LienKetBuocXuLy> _Targets = [];
    public IReadOnlyCollection<LienKetBuocXuLy> Targets => _Targets;

    private readonly List<BuocXuLyChucDanh> _BuocXuLyChucDanhs = [];
    public IReadOnlyCollection<BuocXuLyChucDanh> BuocXuLyChucDanhs => _BuocXuLyChucDanhs;

    private readonly List<BuocXuLyChucVu> _BuocXuLyChucVus = [];
    public IReadOnlyCollection<BuocXuLyChucVu> BuocXuLyChucVus => _BuocXuLyChucVus;

    private readonly List<BuocXuLyNhomNguoiDung> _BuocXuLyNhomNguoiDungs = [];
    public IReadOnlyCollection<BuocXuLyNhomNguoiDung> BuocXuLyNhomNguoiDungs => _BuocXuLyNhomNguoiDungs;

    private readonly List<DanhGia> _DanhGias = [];
    public IReadOnlyCollection<DanhGia> DanhGias => _DanhGias;

    private readonly List<BuocXuLyGroup> _DonVis = [];
    public IReadOnlyCollection<BuocXuLyGroup> DonVis => _DonVis;
    public QuyTrinhXuLy QuyTrinhXuLy { get; private set; }
    public TrangThaiDanhGia TrangThaiDanhGia { get; private set; }
    public BuocXuLy() { }
    public BuocXuLy(string tenBuoc, bool laBuocDauTien, bool laBuocCuoiCung, bool cungDonVi, bool cungPhongBan, bool layNguoiQuanLy, bool layDonViCapTren, bool khongCoChucVu, bool khongCoChucDanh,
        DefaultIdType quyTrinhXuLyId, DefaultIdType trangThaiDanhGiaId, double positionX, double positionY, double positionAbsoluteX,
        double positionAbsoluteY, string type, bool deletable, int width, int height, bool selected, bool dragging, double? thoiHanXuLy)
    {
        TenBuoc = tenBuoc;
        LaBuocDauTien = laBuocDauTien;
        LaBuocCuoiCung = laBuocCuoiCung;
        CungDonVi = cungDonVi;
        CungPhongBan = cungPhongBan;
        LayNguoiQuanLy = layNguoiQuanLy;
        QuyTrinhXuLyId = quyTrinhXuLyId;
        TrangThaiDanhGiaId = trangThaiDanhGiaId;
        PositionX = positionX;
        PositionY = positionY;
        PositionAbsoluteX = positionAbsoluteX;
        PositionAbsoluteY = positionAbsoluteY;
        Type = type;
        Deletable = deletable;
        Width = width;
        Height = height;
        Selected = selected;
        ThoiHanXuLy = thoiHanXuLy;
        Dragging = dragging;
        LayDonViCapTren = layDonViCapTren;
        KhongCoChucDanh = khongCoChucDanh;
        KhongCoChucVu = khongCoChucVu;
    }
    public BuocXuLy SetQuyTrinhXuLyId(DefaultIdType Id)
    {
        QuyTrinhXuLyId = Id;
        return this;
    }
    public BuocXuLy Update(BuocXuLy buocXuLy)
    {
        string? tenBuoc = buocXuLy.TenBuoc;
        bool? laBuocDauTien = buocXuLy.LaBuocDauTien;
        bool? laBuocCuoiCung = buocXuLy.LaBuocCuoiCung;
        bool? cungDonVi = buocXuLy.CungDonVi;
        bool? cungPhongBan = buocXuLy.CungPhongBan;
        bool? layNguoiQuanLy = buocXuLy.LayNguoiQuanLy;
        bool? layDonViCapTren = buocXuLy.LayDonViCapTren;
        bool? khongCoChucVu = buocXuLy.KhongCoChucVu;
        bool? khongCoChucDanh = buocXuLy.KhongCoChucDanh;
        DefaultIdType? quyTrinhXuLyId = buocXuLy.QuyTrinhXuLyId;
        DefaultIdType? trangThaiDanhGiaId = buocXuLy.TrangThaiDanhGiaId;
        double? positionX = buocXuLy.PositionX;
        double? positionY = buocXuLy.PositionY;
        double? positionAbsoluteX = buocXuLy.PositionAbsoluteX;
        double? positionAbsoluteY = buocXuLy.PositionAbsoluteY;
        double? thoiHanXuLy = buocXuLy.ThoiHanXuLy;
        string? type = buocXuLy.Type;
        bool? deletable = buocXuLy.Deletable;
        int? width = buocXuLy.Width;
        int? height = buocXuLy.Height;
        bool? selected = buocXuLy.Selected;
        bool? dragging = buocXuLy.Dragging;

        if (tenBuoc is not null && TenBuoc?.Equals(tenBuoc) is not true) TenBuoc = tenBuoc;
        if (laBuocDauTien is not null && LaBuocDauTien.Equals(laBuocDauTien) is not true) LaBuocDauTien = (bool)laBuocDauTien;
        if (laBuocCuoiCung is not null && LaBuocCuoiCung.Equals(laBuocCuoiCung) is not true) LaBuocCuoiCung = (bool)laBuocCuoiCung;
        if (cungDonVi is not null && CungDonVi.Equals(cungDonVi) is not true) CungDonVi = (bool)cungDonVi;
        if (layDonViCapTren is not null && LayDonViCapTren.Equals(layDonViCapTren) is not true) LayDonViCapTren = (bool)layDonViCapTren;
        if (khongCoChucVu is not null && KhongCoChucVu.Equals(khongCoChucVu) is not true) KhongCoChucVu = (bool)khongCoChucVu;
        if (khongCoChucDanh is not null && KhongCoChucDanh.Equals(khongCoChucDanh) is not true) KhongCoChucDanh = (bool)khongCoChucDanh;
        if (cungPhongBan is not null && CungPhongBan.Equals(cungPhongBan) is not true) CungPhongBan = (bool)cungPhongBan;
        if (layNguoiQuanLy is not null && LayNguoiQuanLy.Equals(layNguoiQuanLy) is not true) LayNguoiQuanLy = (bool)layNguoiQuanLy;
        if (quyTrinhXuLyId != Guid.Empty && quyTrinhXuLyId != null && QuyTrinhXuLyId != null && QuyTrinhXuLyId.Equals(quyTrinhXuLyId) is not true) QuyTrinhXuLyId = (DefaultIdType)quyTrinhXuLyId;
        if (trangThaiDanhGiaId != Guid.Empty && trangThaiDanhGiaId != null && TrangThaiDanhGiaId != null && TrangThaiDanhGiaId.Equals(trangThaiDanhGiaId) is not true) TrangThaiDanhGiaId = (DefaultIdType)trangThaiDanhGiaId;
        if (positionX is not null && PositionX.Equals(positionX) is not true) PositionX = (double)positionX;
        if (positionY is not null && PositionY.Equals(positionY) is not true) PositionY = (double)positionY;
        if (thoiHanXuLy is not null && ThoiHanXuLy.Equals(thoiHanXuLy) is not true) ThoiHanXuLy = (double)thoiHanXuLy;
        if (positionAbsoluteX is not null && PositionAbsoluteX.Equals(positionAbsoluteX) is not true) PositionAbsoluteX = (double)positionAbsoluteX;
        if (positionAbsoluteY is not null && PositionAbsoluteY.Equals(positionAbsoluteY) is not true) PositionAbsoluteY = (double)positionAbsoluteY;
        if (type is not null && Type?.Equals(type) is not true) Type = type;
        if (deletable is not null && Deletable.Equals(deletable) is not true) Deletable = (bool)deletable;
        if (width is not null && Width.Equals(width) is not true) Width = (int)width;
        if (height is not null && Height.Equals(height) is not true) Height = (int)height;
        if (selected is not null && Selected.Equals(selected) is not true) Selected = (bool)selected;
        if (dragging is not null && Dragging.Equals(dragging) is not true) Dragging = (bool)dragging;

        return this;
    }

    public BuocXuLy SetId (DefaultIdType id)
    {
        Id = id;
        return this;
    }

    public void UpsertChucVus(List<Guid>? buocXuLyChucVus)
    {
        if (buocXuLyChucVus == null)
        {
            return;
        }
        var newChucVuIds = buocXuLyChucVus.ConvertAll(id => new BuocXuLyChucVu(id, Id));

        // Xóa các liên kết không còn nằm trong danh sách mới
        _BuocXuLyChucVus.RemoveAll(existing => !buocXuLyChucVus.Contains(existing.ChucVuId));

        // Thêm các liên kết mới chưa có trong danh sách hiện tại
        foreach (var newChucVu in newChucVuIds)
        {
            if (!_BuocXuLyChucVus.Any(existing => existing.ChucVuId == newChucVu.ChucVuId))
            {
                _BuocXuLyChucVus.Add(newChucVu);
            }
        }
    }

    public void UpsertGroups(List<DefaultIdType>? nhomDonViIds)
    {
        if (nhomDonViIds == null)
        {
            return;
        }
        var newDonViIds = nhomDonViIds.ConvertAll(id => new BuocXuLyGroup(id, Id));

        // Xóa các liên kết không còn nằm trong danh sách mới
        _DonVis.RemoveAll(existing => !nhomDonViIds.Contains(existing.NhomDonViId));

        // Thêm các liên kết mới chưa có trong danh sách hiện tại
        foreach (var newDonVi in newDonViIds)
        {
            if (!_DonVis.Any(existing => existing.NhomDonViId == newDonVi.NhomDonViId))
            {
                _DonVis.Add(newDonVi);
            }
        }
    }

    public void UpsertChucDanhs(List<Guid>? buocXuLyChucDanhs)
    {
        if (buocXuLyChucDanhs == null)
        {
            return;
        }
        var newChucDanhIds = buocXuLyChucDanhs.ConvertAll(id => new BuocXuLyChucDanh(id, Id));

        // Xóa các liên kết không còn nằm trong danh sách mới
        _BuocXuLyChucDanhs.RemoveAll(existing => !buocXuLyChucDanhs.Contains(existing.ChucDanhId));

        // Thêm các liên kết mới chưa có trong danh sách hiện tại
        foreach (var newChucDanh in newChucDanhIds)
        {
            if (!_BuocXuLyChucDanhs.Any(existing => existing.ChucDanhId == newChucDanh.ChucDanhId))
            {
                _BuocXuLyChucDanhs.Add(newChucDanh);
            }
        }
    }

    public void UpsertNhomNguoiDungs(List<Guid>? buocXuLyNhomNguoiDungs)
    {
        if (buocXuLyNhomNguoiDungs == null)
        {
            return;
        }
        var newNhomNguoiDungIds = buocXuLyNhomNguoiDungs.ConvertAll(id => new BuocXuLyNhomNguoiDung(Id, id));

        // Xóa các liên kết không còn nằm trong danh sách mới
        _BuocXuLyNhomNguoiDungs.RemoveAll(existing => !buocXuLyNhomNguoiDungs.Contains(existing.NhomNguoiDungId));

        // Thêm các liên kết mới chưa có trong danh sách hiện tại
        foreach (var newNhomNguoiDung in newNhomNguoiDungIds)
        {
            if (!_BuocXuLyNhomNguoiDungs.Any(existing => existing.NhomNguoiDungId == newNhomNguoiDung.NhomNguoiDungId))
            {
                _BuocXuLyNhomNguoiDungs.Add(newNhomNguoiDung);
            }
        }
    }

    public BuocXuLy SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public BuocXuLy Restore()
    {
        DeletedOn = null;
        return this;
    }
}
public class ChuyenBuocXuLyCommandActionType
{
    public const string Forward = "forward";
    public const string Backward = "backward";
}