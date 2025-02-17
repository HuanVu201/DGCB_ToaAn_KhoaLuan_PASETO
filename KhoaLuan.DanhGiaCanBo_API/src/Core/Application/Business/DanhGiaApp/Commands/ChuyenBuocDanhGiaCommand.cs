using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
public sealed record ChuyenBuocDanhGiaCommand(DefaultIdType? TargetId, DefaultIdType DanhGiaId, string? TenThaoTac, bool? ThuHoi = false) : ICommand;
