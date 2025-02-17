
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.MenuApp.Commands;
public sealed record RestoreMenuCommand(Guid Id) : ICommand;
