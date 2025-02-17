using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ScreenApp.Commands;
public sealed record RestoreScreenCommand(DefaultIdType Id) : ICommand;
