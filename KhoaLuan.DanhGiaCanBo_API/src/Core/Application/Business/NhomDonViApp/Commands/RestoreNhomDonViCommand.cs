
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.NhomDonViApp.Commands;
public sealed record RestoreNhomDonViCommand(Guid Id) : ICommand;
