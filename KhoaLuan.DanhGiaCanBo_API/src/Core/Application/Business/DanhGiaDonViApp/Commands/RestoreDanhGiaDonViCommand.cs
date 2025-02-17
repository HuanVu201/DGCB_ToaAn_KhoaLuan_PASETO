
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;
public sealed record RestoreDanhGiaDonViCommand(Guid Id) : ICommand;
