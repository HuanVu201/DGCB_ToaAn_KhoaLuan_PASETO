
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
public sealed record RestoreChucVuCommand(Guid Id) : ICommand;
