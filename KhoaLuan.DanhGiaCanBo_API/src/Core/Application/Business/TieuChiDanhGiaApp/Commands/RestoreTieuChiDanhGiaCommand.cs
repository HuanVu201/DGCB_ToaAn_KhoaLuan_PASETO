
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Commands;
public sealed record RestoreTieuChiDanhGiaCommand(Guid Id) : ICommand;
