
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.KhoTieuChiApp.Commands;
public sealed record RestoreKhoTieuChiCommand(Guid Id) : ICommand;
