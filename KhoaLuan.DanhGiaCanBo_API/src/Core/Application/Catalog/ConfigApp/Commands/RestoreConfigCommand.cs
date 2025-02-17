
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.ConfigApp.Commands;
public sealed record RestoreConfigCommand(Guid Id) : ICommand;
