
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ChucDanhApp.Commands;
public sealed record RestoreChucDanhCommand(Guid Id) : ICommand;
