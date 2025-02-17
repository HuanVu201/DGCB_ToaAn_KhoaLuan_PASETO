
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp.Commands;
public sealed record RestoreTrangThaiDanhGiaCommand(Guid Id) : ICommand;
