
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.APITichHopApp.Commands;
public sealed record RestoreAPITichHopCommand(Guid Id) : ICommand;
