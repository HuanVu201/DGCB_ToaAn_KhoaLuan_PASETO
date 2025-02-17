
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.NhomNguoiDungApp.Commands;
public sealed record RestoreNhomNguoiDungCommand(Guid Id) : ICommand;
