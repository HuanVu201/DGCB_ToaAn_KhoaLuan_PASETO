using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.VetXuLyDanhGiaDonViApp.Commands;
public class AddVetXuLyDanhGiaDonViCommandHandler : ICommandHandler<AddVetXuLyDanhGiaDonViCommand, Guid>
{
    private readonly IRepository<VetXuLyDanhGiaDonVi> _repositoryWithEvents;
    public AddVetXuLyDanhGiaDonViCommandHandler(IRepository<VetXuLyDanhGiaDonVi> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result<DefaultIdType>> Handle(AddVetXuLyDanhGiaDonViCommand request, CancellationToken cancellationToken)
    {
        var vetXuLyDanhGiaDonVi = VetXuLyDanhGiaDonVi.Create(request.MaPhieu, request.MaPhongBan, request.TenThaoTac, request.TenNguoiXuLy, request.TaiKhoanXuLy);
        await _repositoryWithEvents.AddAsync(vetXuLyDanhGiaDonVi, cancellationToken);
        return Result<Guid>.Success(vetXuLyDanhGiaDonVi.Id);

    }
}