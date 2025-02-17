using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.BuocXuLyApp.Commands;
public sealed record RestoreBuocXuLyCommand(DefaultIdType Id) : ICommand;
