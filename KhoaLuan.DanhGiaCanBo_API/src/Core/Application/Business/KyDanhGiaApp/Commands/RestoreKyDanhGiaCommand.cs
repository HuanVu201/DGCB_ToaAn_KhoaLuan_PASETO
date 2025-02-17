
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.KyDanhGiaApp.Commands;
public sealed record RestoreKyDanhGiaCommand(Guid Id) : ICommand;
