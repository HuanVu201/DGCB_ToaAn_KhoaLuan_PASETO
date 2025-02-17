
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Commands;
public sealed record RestoreBoTieuChuanCommand(Guid Id) : ICommand;
