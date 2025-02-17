using Mapster;
using TD.DanhGiaCanBo.Domain.Business;
using static TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Dtos.ChiTietQuyTrinhXuLyDto;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;
public class ReactFlowNodeDto : IDto
{
    public ReactFlowNodeDto() { }
    public ReactFlowNodeDto(BuocXuLy buocXuLy, IReadOnlyCollection<BuocXuLyChucDanh>? buocXuLyChucDanh = null, IReadOnlyCollection<BuocXuLyChucVu>? buocXuLyChucVu = null, IReadOnlyCollection<BuocXuLyNhomNguoiDung>? buocXuLyNhomNguoiDung = null, IReadOnlyCollection<BuocXuLyGroup>? buocXuLyGroups = null, IReadOnlyCollection<LienKetBuocXuLy>? sources = null, IReadOnlyCollection<LienKetBuocXuLy>? targets = null)
    {
        Id = buocXuLy.Id.ToString();
        Type = buocXuLy.Type;
        Deletable = buocXuLy.Deletable;
        Width = buocXuLy.Width;
        Height = buocXuLy.Height;
        Selected = buocXuLy.Selected;
        Dragging = buocXuLy.Dragging;
        Position = new ReactFlowPosition(buocXuLy.PositionX, buocXuLy.PositionY);
        PositionAbsolute = new ReactFlowPosition(buocXuLy.PositionAbsoluteX, buocXuLy.PositionAbsoluteY);
        Data = new ReactFlowData(buocXuLy.TrangThaiDanhGia, buocXuLy.TenBuoc, buocXuLy.LaBuocDauTien, buocXuLy.LaBuocCuoiCung, buocXuLy.ThoiHanXuLy, buocXuLy.CungDonVi,
            buocXuLy.CungPhongBan, buocXuLy.LayNguoiQuanLy, buocXuLy.LayDonViCapTren, buocXuLy.KhongCoChucDanh, buocXuLy.KhongCoChucVu, buocXuLyChucDanh, buocXuLyChucVu, buocXuLyNhomNguoiDung, buocXuLyGroups, sources, targets);
    }

    public string Id { get; set; }
    public string Type { get; set; }
    public bool Deletable { get; set; } = false;
    public int Width { get; set; }
    public int Height { get; set; }
    public bool Selected { get; set; } = false;
    public bool Dragging { get; set; } = false;
    public ReactFlowPosition Position { get; set; }
    public ReactFlowPosition PositionAbsolute { get; set; }
    public ReactFlowData Data { get; set; }
    public class ReactFlowData
    {
        public ReactFlowData(TrangThaiDanhGia trangThaiDanhGia, string tenBuoc, bool laBuocDauTien, bool laBuocCuoiCung, double? thoiHanXuLy, bool cungDonVi, bool cungPhongBan, bool layNguoiQuanLy,
            bool layDonViCapTren, bool khongCoChucDanh, bool khongCoChucVu, IReadOnlyCollection<BuocXuLyChucDanh>? buocXuLyChucDanh = null, IReadOnlyCollection<BuocXuLyChucVu>? buocXuLyChucVu = null,
            IReadOnlyCollection<BuocXuLyNhomNguoiDung>? buocXuLyNhomNguoiDung = null, IReadOnlyCollection<BuocXuLyGroup>? buocXuLyGroups = null, IReadOnlyCollection<LienKetBuocXuLy>? sources = null, IReadOnlyCollection<LienKetBuocXuLy>? targets = null)
        {
            TrangThaiDanhGia = trangThaiDanhGia.Adapt<TrangThaiDanhGiaReactFlowDto>();
            TenBuoc = tenBuoc;
            LaBuocDauTien = laBuocDauTien;
            CungDonVi = cungDonVi;
            CungPhongBan = cungPhongBan;
            LayNguoiQuanLy = layNguoiQuanLy;
            LaBuocCuoiCung = laBuocCuoiCung;
            ThoiHanXuLy = thoiHanXuLy;
            LayDonViCapTren = layDonViCapTren;
            KhongCoChucDanh = khongCoChucDanh;
            KhongCoChucVu = khongCoChucVu;
            if (buocXuLyChucDanh != null)
            {
                ChucDanhs = buocXuLyChucDanh.Select(x => x.ChucDanh).Adapt<List<ChucDanhReactFlowDto>>();
            }

            if (buocXuLyChucVu != null)
            {
                ChucVus = buocXuLyChucVu.Select(x => x.ChucVu).Adapt<List<ChucVuReactFlowDto>>();
            }

            if (buocXuLyGroups != null)
            {
                DonVis = buocXuLyGroups.Select(x => new
                {
                    x.NhomDonVi.TenNhom,
                    Id = x.NhomDonViId
                }).Adapt<List<DonViReactFlowDto>>();
            }

            if (buocXuLyNhomNguoiDung != null)
            {
                NhomNguoiDungs = buocXuLyNhomNguoiDung.Select(x => x.NhomNguoiDung).Adapt<List<NhomNguoiDungReactFlowDto>>();
            }

            if (sources != null)
            {
                Sources = sources.Select(x => x.SetId(x.Source)).Adapt<List<LienKetBuocXuLyReactFlowDto>>();
            }

            if (targets != null)
            {
                Targets = targets.Select(x => x.SetId(x.Target)).Adapt<List<LienKetBuocXuLyReactFlowDto>>();
            }
        }
         
        public TrangThaiDanhGiaReactFlowDto TrangThaiDanhGia { get; set; }
        public List<ChucDanhReactFlowDto>? ChucDanhs { get; set; }
        public List<ChucVuReactFlowDto>? ChucVus { get; set; }
        public List<NhomNguoiDungReactFlowDto>? NhomNguoiDungs { get; set; }
        public List<DonViReactFlowDto>? DonVis { get; set; }
        public List<LienKetBuocXuLyReactFlowDto>? Sources { get; set; }
        public List<LienKetBuocXuLyReactFlowDto>? Targets { get; set; }
        public string TenBuoc { get; set; }
        public bool LaBuocDauTien { get; set; }
        public bool LaBuocCuoiCung { get; set; }
        public bool CungDonVi { get; set; }
        public bool CungPhongBan { get; set; }
        public bool LayNguoiQuanLy { get; set; }
        public bool LayDonViCapTren { get; set; }
        public bool KhongCoChucDanh { get; set; }
        public bool KhongCoChucVu { get; set; }
        public double? ThoiHanXuLy { get; set; }
    }
}
public class ReactFlowEdgeDto : IDto
{
    public ReactFlowEdgeDto(LienKetBuocXuLy lienKetBuocXuLy)
    {
        Type = lienKetBuocXuLy.Type;
        MarkerEnd = new ReactFlowMarkerEnd(lienKetBuocXuLy.MarkerEndType);
        Animated = lienKetBuocXuLy.Animated;
        Style = new ReactFlowStyle(lienKetBuocXuLy.StyleStrokeWidth, lienKetBuocXuLy.StyleStroke);
        Source = lienKetBuocXuLy.Source;
        Target = lienKetBuocXuLy.Target;
        SourceHandle = lienKetBuocXuLy.SourceHandle;
        TargetHandle = lienKetBuocXuLy.TargetHandle;
        Label = lienKetBuocXuLy.Label;
        Id = lienKetBuocXuLy.Id.ToString();
    }
    public string Type { get; set; }
    public ReactFlowMarkerEnd MarkerEnd { get; set; }
    public bool Animated { get; set; } = true;
    public ReactFlowStyle Style { get; set; }
    public Guid Source { get; set; }
    public Guid Target { get; set; }
    public string SourceHandle { get; set; }
    public string TargetHandle { get; set; }
    public string Label { get; set; }
    public string Id { get; set; }
}

public class ReactFlowPosition
{
    public ReactFlowPosition(double x, double y)
    {
        X = x;
        Y = y;
    }
    public double X { get; set; }
    public double Y { get; set; }
}
public class TrangThaiDanhGiaReactFlowDto
{
    public string Id { get; set; }
    public string Ten { get; set; }
    public string Ma { get; set; }
}
public class LienKetBuocXuLyReactFlowDto
{
    public string Id { get; set; }
}

public class ChucVuReactFlowDto
{
    public string Id { get; set; }
    public string Ten { get; set; }
    public string Ma { get; set; }
}
public class ChucDanhReactFlowDto
{
    public string Id { get; set; }
    public string Ten { get; set; }
    public string Ma { get; set; }
}

public class NhomNguoiDungReactFlowDto
{
    public string Id { get; set; }
    public string Ten { get; set; }
    public string Ma { get; set; }
}

public class DonViReactFlowDto
{
    public string Id { get; set; }
    public string TenNhom { get; set; }
}
public class ReactFlowMarkerEnd
{
    public ReactFlowMarkerEnd(string type)
    {
        Type = type;
    }

    public string Type { get; set; }
}
public class ReactFlowStyle
{
    public ReactFlowStyle(int strokeWidth, string stroke)
    {
        StrokeWidth = strokeWidth;
        Stroke = stroke;
    }

    public int StrokeWidth { get; set; }
    public string Stroke { get; set; }
}

