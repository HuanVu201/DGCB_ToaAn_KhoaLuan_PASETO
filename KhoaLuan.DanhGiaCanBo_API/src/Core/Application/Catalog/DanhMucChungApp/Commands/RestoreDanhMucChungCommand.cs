
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.DanhMucChungApp.Commands;
public sealed record RestoreDanhMucChungCommand(Guid Id) : ICommand;
