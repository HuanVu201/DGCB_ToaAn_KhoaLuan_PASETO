using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Dtos;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Queries;
public sealed record GetBuocXuLyQuery(DefaultIdType Id, bool? InCludeChucVu, bool? InCludeChucDanh, bool? InCludeNhomNguoiDung, bool? InCludeTrangThaiDanhGia, bool? InCludeSource, bool? InCludeTarget, bool? InCludeDonVi) : IQuery<ReactFlowNodeDto>
{
    public Include IncludeTable { get; init; } = new Include(InCludeChucVu, InCludeChucDanh, InCludeNhomNguoiDung, InCludeTrangThaiDanhGia, InCludeSource, InCludeTarget, InCludeDonVi);
    public class Include
    {
        public Include()
        {
            InCludeChucVu = false;
            InCludeChucDanh = false;
            InCludeNhomNguoiDung = false;
            InCludeTrangThaiDanhGia = false;
            InCludeSource = false;
            InCludeTarget = false;
        }
        public Include(bool? inCludeChucVu, bool? inCludeChucDanh, bool? inCludeNhomNguoiDung, bool? inCludeTrangThaiDanhGia, bool? inCludeSource, bool? inCludeTarget, bool? inCludeDonVi)
        {
            InCludeChucVu = inCludeChucVu ?? false;
            InCludeChucDanh = inCludeChucDanh ?? false;
            InCludeNhomNguoiDung = inCludeNhomNguoiDung ?? false;
            InCludeTrangThaiDanhGia = inCludeTrangThaiDanhGia ?? false;
            InCludeSource = inCludeSource ?? false;
            InCludeTarget = inCludeTarget ?? false;
            InCludeDonVi = inCludeDonVi ?? false;
        }

        public bool InCludeChucVu { get; init; }
        public bool InCludeDonVi { get; init; }
        public bool InCludeChucDanh { get; init; }
        public bool InCludeNhomNguoiDung { get; init; }
        public bool InCludeSource { get; init; }
        public bool InCludeTarget { get; init; }
        public bool InCludeTrangThaiDanhGia { get; init; }
    }
}