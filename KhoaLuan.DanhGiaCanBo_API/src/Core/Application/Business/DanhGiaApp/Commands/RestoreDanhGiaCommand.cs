
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
public sealed record RestoreDanhGiaCommand(Guid Id) : ICommand;
