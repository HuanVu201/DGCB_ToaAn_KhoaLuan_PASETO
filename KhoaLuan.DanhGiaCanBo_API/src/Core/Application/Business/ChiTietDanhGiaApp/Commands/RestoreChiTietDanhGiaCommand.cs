
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaApp.Commands;
public sealed record RestoreDanhGiaCommand(Guid Id) : ICommand;
