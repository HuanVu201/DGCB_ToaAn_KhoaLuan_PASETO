using MediatR;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class KhoiPhucDanhGiaQtQueryHandler : ICommandHandler<KhoiPhucDanhGiaQtQuery>
{
    private readonly ICacheService _cacheService;
    private readonly int _cacheTime = 2;
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<DanhGia> _repositoryWithEvents;
    private readonly IVetXuLyDanhGiaService _vetXuLyDanhGiaService;
    private readonly ICurrentUser _currentUser;
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;
    private readonly IConfiguration _configuration;
    public KhoiPhucDanhGiaQtQueryHandler(IDapperRepository dapperRepository, IRepositoryWithEvents<DanhGia> repositoryWithEvents,IVetXuLyDanhGiaService vetXuLyDanhGiaService,ICurrentUser currentUser,IReadRepository<BuocXuLy> buocXuLyRepo, IConfiguration configuration)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
        _currentUser = currentUser;
        _buocXuLyRepo = buocXuLyRepo;
        _configuration = configuration;
    }
    public async Task<Result> Handle(KhoiPhucDanhGiaQtQuery request, CancellationToken cancellationToken)
    {
        string namTachDuLieuMoiNhat = _configuration.GetSection("DaTachDuLieuNamCu").Value != null ? _configuration.GetSection("DaTachDuLieuNamCu").Value : "2022";
        var currentUserID = _currentUser.GetUserId();
        var currentUserGroupId = _currentUser.GetUserGroupId();
        var tenThaoTac = "KhoiPhuc";
        var itemDg = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken) ?? throw new NotFoundException($"DanhGia với mã: {request.Id} chưa được thêm vào hệ thống");

        string queryCheck = $@"SELECT ID,TrangThai FROM {TableNames.DanhGias}";
        string whereCheck = " WHERE 1 = 1 and SuDung = 1 and KhongDanhGia!=1";
        whereCheck += $" and TaiKhoan =  @TaiKhoan ";
        whereCheck += $" and MaDonVi = @MaDonVi";
        whereCheck += $" and ThoiGianQuery = @ThoiGianQuery";
        var thoiGianQr = itemDg.ThoiGianQuery.ToString();
        var namCheck = thoiGianQr.Substring(0, 4);
        var namHT = DateTime.Now.Year.ToString();
        if (namHT != namCheck && int.Parse(namCheck) <= int.Parse(namTachDuLieuMoiNhat)) queryCheck = $@"SELECT ID,TrangThai FROM {TableNames.DanhGias}"  + namCheck;
        var itemCheck = await _dapperRepository.QuerySingleAsync<DanhGia>(queryCheck + whereCheck,new {TaiKhoan = itemDg.TaiKhoan, MaDonVi = itemDg.MaDonVi, ThoiGianQuery = itemDg.ThoiGianQuery});
        if(itemCheck != null)
        {
            if (itemCheck.TrangThai == "Chưa đánh giá")
            {
                var buocXuly = await _buocXuLyRepo.GetByIdAsync(itemDg.BuocHienTaiId, cancellationToken);

                /// Xóa itemDG Delete(itemCheck.ID);
                var sqlDel = $@"Delete Form {TableNames.DanhGias} Where ID = @Id";
                await _dapperRepository.QueryAsync<DanhGia>(sqlDel, new { Id = itemCheck.Id });
                await _vetXuLyDanhGiaService.Add(Guid.Parse(currentUserGroupId), (Guid)itemDg.BuocHienTai.Id, itemDg.Id, tenThaoTac, buocXuly.TenBuoc, _currentUser.GetUserFullName(), _currentUser.GetUserName(), false, buocXuly.TrangThaiDanhGiaId, cancellationToken);
                var sqlUd = $@"UPDATE {TableNames.DanhGias} Set Sudung = 1 Where Id = @Id";
                await _dapperRepository.QueryAsync<DanhGia>(sqlUd, new { Id = request.Id });
                return (Result)Result.Success();
            }
            else return (Result)Result.Fail($"Đã tồn tại đánh giá Id : {itemCheck.Id}"); 
        }
        else
        {
            var buocXuly = await _buocXuLyRepo.GetByIdAsync(itemDg.BuocHienTaiId, cancellationToken);
            await _vetXuLyDanhGiaService.Add(Guid.Parse(currentUserGroupId), (Guid)itemDg.BuocHienTai.Id, itemDg.Id, tenThaoTac, buocXuly.TenBuoc, _currentUser.GetUserFullName(), _currentUser.GetUserName(), false, buocXuly.TrangThaiDanhGiaId, cancellationToken);
            var sqlUd = $@"UPDATE {TableNames.DanhGias} Set Sudung = 1 Where Id = @Id";
            await _dapperRepository.QueryAsync<DanhGia>(sqlUd, new { Id = request.Id });
            return (Result)Result.Success();
        }
    }
}
