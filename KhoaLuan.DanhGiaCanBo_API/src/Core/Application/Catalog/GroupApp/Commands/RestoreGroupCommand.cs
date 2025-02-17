
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Commands;
public sealed record RestoreGroupCommand(Guid Id) : ICommand;
