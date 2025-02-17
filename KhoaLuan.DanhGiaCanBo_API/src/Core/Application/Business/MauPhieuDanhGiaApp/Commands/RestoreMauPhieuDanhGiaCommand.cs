
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp.Commands;
public sealed record RestoreMauPhieuDanhGiaCommand(Guid Id) : ICommand;
