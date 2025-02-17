using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;
public class AddActionCommandHandler : ICommandHandler<AddQuyTrinhXuLyCommand, DefaultIdType>
{
    private readonly IRepository<QuyTrinhXuLy> _repositoryWithEvents;
    public AddActionCommandHandler(IRepository<QuyTrinhXuLy> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddQuyTrinhXuLyCommand request, CancellationToken cancellationToken)
    {
        var quyTrinh = new QuyTrinhXuLy(request.TenQuyTrinh, request.ThuTu, request.LaQuyTrinhDonVi);
        quyTrinh.AddDonViSuDungQuyTrinh(request.DonViIds);
        await _repositoryWithEvents.AddAsync(quyTrinh, cancellationToken);
        return Result<DefaultIdType>.Success(quyTrinh.Id);
    }
}
