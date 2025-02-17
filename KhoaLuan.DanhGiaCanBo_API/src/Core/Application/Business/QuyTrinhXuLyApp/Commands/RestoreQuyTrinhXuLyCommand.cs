using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;
public sealed record RestoreQuyTrinhXuLyCommand(DefaultIdType Id) : ICommand;
