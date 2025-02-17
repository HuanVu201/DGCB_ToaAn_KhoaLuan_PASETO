using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ActionApp.Commands;
public sealed record RestoreActionCommand(DefaultIdType Id) : ICommand;
