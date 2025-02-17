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
using TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

public class KhoiPhucDanhGiaChonQueryHandler : ICommandHandler<KhoiPhucDanhGiaChonQuery>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<DanhGia> _repositoryWithEvents;
    private readonly IVetXuLyDanhGiaService _vetXuLyDanhGiaService;
    private readonly ICurrentUser _currentUser;
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;
    private readonly IConfiguration _configuration;
    private readonly IMediator _mediator;
    public KhoiPhucDanhGiaChonQueryHandler(IDapperRepository dapperRepository, IRepositoryWithEvents<DanhGia> repositoryWithEvents, IVetXuLyDanhGiaService vetXuLyDanhGiaService, ICurrentUser currentUser, IReadRepository<BuocXuLy> buocXuLyRepo, IConfiguration configuration, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
        _currentUser = currentUser;
        _buocXuLyRepo = buocXuLyRepo;
        _configuration = configuration;
        _mediator = mediator;
    }
    public async Task<Result> Handle(KhoiPhucDanhGiaChonQuery request, CancellationToken cancellationToken)
    {
        string ids = string.Join(",", request.Ids.Select(id => $"'{id}'"));
        string namTachDuLieuMoiNhat = _configuration.GetSection("DaTachDuLieuNamCu").Value != null ? _configuration.GetSection("DaTachDuLieuNamCu").Value : "2022";
        var currentUserID = _currentUser.GetUserId();
        var currentUserGroupId = _currentUser.GetUserGroupId();
        var tenThaoTac = "KhoiPhuc";
        string where = $" WHERE ID in ({ids}) ";
        string query = $"SELECT * FROM {TableNames.DanhGias} {where}";
        var lstitemDg = await _dapperRepository.QueryAsync<DanhGia>(query, new { });

        var sumTC = 0;
        List<string> lstIDKP = new List<string>();
        var lstitemDgUpdate = new List<DanhGia>();
        if (lstitemDg.Count > 0)
        {
            var ngayHT = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
            foreach (var itemDG in lstitemDg)
            {
                string queryCheck = $@"SELECT ID,TrangThai FROM {TableNames.DanhGias}";
                string whereCheck = " WHERE SuDung = 1 and KhongDanhGia!=1 AND DeletedOn IS NULL";
                whereCheck += $" and TaiKhoan =  @TaiKhoan ";
                whereCheck += $" and MaDonVi = @MaDonVi";
                whereCheck += $" and ThoiGianQuery = @ThoiGianQuery";
                var itemCheck = await _dapperRepository.QueryFirstOrDefaultAsync<DanhGia>(queryCheck + whereCheck, new { TaiKhoan = itemDG.TaiKhoan, MaDonVi = itemDG.MaDonVi, ThoiGianQuery = itemDG.ThoiGianQuery });
                if (itemCheck != null)
                {
                    if (itemCheck.TrangThai == "Chưa đánh giá")
                    {
                        var buocXuly = await _buocXuLyRepo.GetByIdAsync(itemDG.BuocHienTaiId, cancellationToken);

                        /// Xóa itemDG Delete(itemCheck.ID);
                        var sqlDel = $@"Delete FROM {TableNames.DanhGias} Where ID = @Id";
                        sumTC = sumTC + 1;
                        lstIDKP.Add(itemDG.Id.ToString());
                        lstitemDgUpdate.Add(itemDG);
                        await _dapperRepository.QueryAsync<DanhGia>(sqlDel, new { Id = itemCheck.Id });
                        await _vetXuLyDanhGiaService.Add(Guid.Parse(currentUserGroupId), (Guid)itemDG.BuocHienTaiId, itemDG.Id, tenThaoTac, "Khôi phục chấm điểm (Đánh giá toàn đơn vị)", _currentUser.GetUserFullName(), _currentUser.GetUserName(), false, buocXuly.TrangThaiDanhGiaId, cancellationToken);
                        var sqlUd = $@"UPDATE {TableNames.DanhGias} Set SuDung = 1 Where Id = @Id";
                        await _dapperRepository.QueryAsync<DanhGia>(sqlUd, new { Id = itemDG.Id });
                        return (Result)Result.Success();
                    }
                   
                }
                else
                {
                    var buocXuly = await _buocXuLyRepo.GetByIdAsync(itemDG.BuocHienTaiId, cancellationToken);
                    sumTC = sumTC + 1;
                    lstIDKP.Add(itemDG.Id.ToString());
                    lstitemDgUpdate.Add(itemDG);
                    await _vetXuLyDanhGiaService.Add(Guid.Parse(currentUserGroupId), (Guid)itemDG.BuocHienTaiId, itemDG.Id, tenThaoTac, "Khôi phục chấm điểm (Đánh giá toàn đơn vị)", _currentUser.GetUserFullName(), _currentUser.GetUserName(), false, buocXuly.TrangThaiDanhGiaId, cancellationToken);
                    var sqlUd = $@"UPDATE {TableNames.DanhGias} Set SuDung = 1 Where Id = @Id";
                    await _dapperRepository.QueryAsync<DanhGia>(sqlUd, new { Id = itemDG.Id });
                }
            }
        }

        var strID = string.Join(",", lstIDKP);
        var messTitle = string.Empty;
        if (lstIDKP.Count > 0)
        {
            if(lstitemDg != null)
            {
                var req = new CapNhatDuLieuThongKeDonViCommand()
                {
                    XuLy = "KhoiPhuc",
                    LstItem = lstitemDgUpdate.ToList(),
                    IdKhoiPhuc = strID,
                };
                var res = await _mediator.Send(req);
                messTitle = "Khôi phục đánh giá thành công!";
             }
            //else return (Result)Result.Fail(message: "Cập nhật dữ liệu đơn vị thất bại");

        }

    
        return messTitle!=""?((Result)Result.Success(message: "Khôi phục đánh giá thành công!")): ((Result)Result.Fail(message: "Dữ liệu đánh giá không thể khôi phục vì đã tồn tại!"));
    }
}
