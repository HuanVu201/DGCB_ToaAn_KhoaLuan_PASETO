
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.XepLoaiDanhGiaApp.Commands;
public sealed record RestoreXepLoaiDanhGiaCommand(Guid Id) : ICommand;
