using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Text.Json;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp;
using TD.DanhGiaCanBo.Application.Business.ChiTietDanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Commands;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
using TD.DanhGiaCanBo.Application.Common.Caching;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Application.Identity.UserGroups;
using TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGiaToChuc;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;
using Newtonsoft.Json;
using TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;

public class DuyetPhieuNhanXetDGDVQueryHandler : IRequestHandler<DuyetPhieuNhanXetDGDVQuery, Result>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IVetXuLyDanhGiaToChucService _vetXuLyDanhGiaService;
    private readonly ICurrentUser _currentUser;
    private readonly IRepositoryWithEvents<DanhGiaDonVi> _repositoryWithEvents;
    private readonly IUserGroupService _userGroupService;
    private readonly IMediator _mediator;

    public DuyetPhieuNhanXetDGDVQueryHandler(IDapperRepository dapperRepository, IVetXuLyDanhGiaToChucService vetXuLyDanhGiaService, ICurrentUser currentUser, IRepositoryWithEvents<DanhGiaDonVi> repositoryWithEvents, IUserGroupService userGroupService, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
        _currentUser = currentUser;
        _repositoryWithEvents = repositoryWithEvents;
        _userGroupService = userGroupService;
        _mediator = mediator;
    }

    public async Task<Result> Handle(DuyetPhieuNhanXetDGDVQuery request, CancellationToken cancellationToken)
    {
        if (request.Ids.Count == 0)
        {
            return (Result)Result.Fail("Không có thông tin ID đánh giá để duyệt!");
        }

        try
        {
            foreach (Guid danhGiaId in request.Ids)
            {
                var itemDG = await _repositoryWithEvents.GetByIdAsync(danhGiaId, cancellationToken);
                if (itemDG == null)
                    throw new NotFoundException($"DanhGiaDonVi với mã: {danhGiaId} chưa được thêm vào hệ thống");
                if (itemDG.BuocHienTaiId == null)
                    throw new Exception($"DanhGiaDonVi với mã: {danhGiaId} không có thông tin bước hiện tại");

                Result<NguoiXuLyTiepDto> resNguoiXuLyTiep = new Result<NguoiXuLyTiepDto>();
                if (!string.IsNullOrEmpty(request.LoaiDiem) && request.LoaiDiem != "DanhGia")
                {
                    resNguoiXuLyTiep = await _userGroupService.SearchDanhSachNguoiXuLyTiep(
                          new SearchUserByBuocXuLyHienTaiRequest()
                          {
                              SourceId = itemDG.BuocHienTaiId.Value,
                              GroupCode = _currentUser.GetGroupCode(),
                              OfficeCode = _currentUser.GetOfficeCode()
                          },
                          cancellationToken);

                    if (resNguoiXuLyTiep == null)
                        throw new Exception($"DanhGia với mã: {danhGiaId} không có người xử lý tiếp!");
                }

                var resUpdateDanhGia = await _mediator.Send(new UpdateDanhGiaDonViCommand()
                {
                    Id = itemDG.Id,
                    TenThaoTacVetXuLy = request.TenThaoTac ?? "Duyệt chấm điểm",
                    TrangThai = request.LoaiDiem == "DanhGia" ? "Đã đánh giá" : resNguoiXuLyTiep.Data.TenTrangThai,
                    BuocTruocId = itemDG.BuocHienTaiId,
                    BuocHienTaiId = request.LoaiDiem == "DanhGia" ? itemDG.BuocHienTaiId : resNguoiXuLyTiep.Data.BuocXuLyId,
                    NguoiDangXuLyId = request.LoaiDiem == "DanhGia" ? "Da ket thuc danh gia" : resNguoiXuLyTiep.Data.Id,
                    LaNguoiDaXuLy = true,

                    NamDanhGia = itemDG.NamDanhGia, // chưa rõ nguyên nhân value = 0
                    SuDung = itemDG.SuDung, // chưa rõ nguyên nhân value = 0

                   NguoiThamMuu = request.LoaiDiem != "ThamMuu" ? null : _currentUser.GetUserFullName(),
                    NguoiDanhGia = request.LoaiDiem != "DanhGia" ? null : _currentUser.GetUserFullName(),

                    NguoiThamMuuId = request.LoaiDiem != "ThamMuu" ? null : _currentUser.GetUserGroupId(),
                    NguoiDanhGiaId = request.LoaiDiem != "DanhGia" ? null : _currentUser.GetUserGroupId(),

                    ThoiGianThamMuu = request.LoaiDiem != "ThamMuu" ? null : DateTime.Now,
                    ThoiGianDanhGia = request.LoaiDiem != "DanhGia" ? null : DateTime.Now,

                });

                if (!resUpdateDanhGia.Succeeded)
                    throw new Exception("Có lỗi trong quá trình cập nhật [Business].[DanhGiaDonVis]");

                // var resGetChiTiets = await GetNewListChiTietDanhGias(itemDG.MaPhieu ?? string.Empty, request.LoaiDiem ?? string.Empty, cancellationToken);
                // List<UpdateItemChiTietDanhGia> data = resGetChiTiets.ToList();
                // await _mediator.Send(new UpdateListChiTietDanhGiaQuery()
                // {
                //    Data = data
                // });

                string tenTrangThaiQuery = string.Empty;
                if (request.LoaiDiem == "DanhGia")
                {
                    tenTrangThaiQuery = "Đã đánh giá";
                }
                else if (!string.IsNullOrEmpty(resNguoiXuLyTiep.Data.TenTrangThai))
                {
                    tenTrangThaiQuery = resNguoiXuLyTiep.Data.TenTrangThai;
                }

                string sqlTrangThai = $@"Select Ten, Id From {TableNames.TrangThaiDanhGias} Where Ten = @Ten";
                var itemTrangThai = await _dapperRepository.QueryFirstOrDefaultAsync<TrangThaiDanhGiaDto>(sqlTrangThai, new { Ten = tenTrangThaiQuery });
                if (itemTrangThai == null)
                    return (Result)Result.Fail(message: $"Trạng thái {tenTrangThaiQuery} chưa tồn tại!");

                await _vetXuLyDanhGiaService.Add(Guid.Parse(_currentUser.GetUserGroupId() ?? string.Empty), (Guid)(request.LoaiDiem == "DanhGia" ? itemDG.BuocHienTaiId : resNguoiXuLyTiep.Data.BuocXuLyId), itemDG.Id, "DuyeDanhGia", request.TenThaoTac ?? string.Empty, _currentUser.GetUserFullName() ?? string.Empty, _currentUser.GetUserName() ?? string.Empty, true, itemTrangThai.Id, cancellationToken);
            };
        }
        catch (Exception ex)
        {
            throw new Exception("Lỗi duyệt đánh giá: " + ex.Message);
        }

        return (Result)Result.Success(message: "Duyệt đánh giá thành công!");
    }

    // public async Task<List<UpdateItemChiTietDanhGia>> GetNewListChiTietDanhGias(string MaPhieu, string loaiDiem, CancellationToken cancellationToken)
    // {
    //    List<UpdateItemChiTietDanhGia> results = new List<UpdateItemChiTietDanhGia>();

    //    string sqlGetAllChiTiet = @"
    //                SELECT Id, TenMauPhieu, MaPhieu, ChiTietDiemDanhGia, ChiTietDiemTuDanhGia, ChiTietDiemNhanXet, ChiTietDiemThamMuu, ChiTietDiemLanhDaoDanhGia, 
    //                    DataTuDanhGia, DataNhanXet, DataThamMuu, DataLanhDaoDanhGia, DiemDanhGia, DiemTuDanhGia, DiemNhanXet, DiemThamMuu, DiemLanhDaoDanhGia 
    //                FROM [Business].[ChiTietDanhGias] 
    //                WHERE  MaPhieu = @MaPhieu ";

    //    var chiTietDanhGias = await _dapperRepository.PaginatedListSingleQueryAsync<UpdateItemChiTietDanhGia>(sqlGetAllChiTiet, 10, "TenMauPhieu ASC", cancellationToken, 1, new { MaPhieu = MaPhieu });

    //    foreach (UpdateItemChiTietDanhGia item in chiTietDanhGias.Data.ToList())
    //    {
    //        UpdateItemChiTietDanhGia newItem = new UpdateItemChiTietDanhGia();
    //        newItem.Id = item.Id;

    //        string newJsonData = string.Empty;

    //        if (!string.IsNullOrEmpty(item.DataTuDanhGia) || !string.IsNullOrEmpty(item.DataNhanXet) || !string.IsNullOrEmpty(item.DataThamMuu))
    //        {
    //            IDanhGiaColumn jsonData = JsonConvert.DeserializeObject<IDanhGiaColumn>(item.DataThamMuu ?? item.DataNhanXet ?? item.DataTuDanhGia);
    //            if (jsonData == null)
    //                throw new Exception("Không có JSON để sao chép duyệt chấm điểm");
    //            AddDiem(jsonData, loaiDiem);
    //            newJsonData = JsonConvert.SerializeObject(jsonData, Formatting.Indented);
    //        }

    //        if (string.IsNullOrEmpty(newJsonData))
    //            throw new Exception("Lỗi xử lý dữ liệu json");


    //        if (loaiDiem == "NhanXet")
    //        {
    //            newItem.DiemNhanXet = item.DiemNhanXet;
    //            newItem.ChiTietDiemNhanXet = item.ChiTietDiemNhanXet;
    //            newItem.DataNhanXet = newJsonData;
    //        }

    //        if (loaiDiem == "ThamMuu")
    //        {
    //            newItem.DiemThamMuu = item.DiemThamMuu;
    //            newItem.ChiTietDiemThamMuu = item.ChiTietDiemThamMuu;
    //            newItem.DataThamMuu = newJsonData;
    //        }

    //        if (loaiDiem == "DanhGia")
    //        {
    //            newItem.DiemLanhDaoDanhGia = item.DiemLanhDaoDanhGia;
    //            newItem.ChiTietDiemLanhDaoDanhGia = item.ChiTietDiemLanhDaoDanhGia;
    //            newItem.DataLanhDaoDanhGia = newJsonData;
    //        }

    //        results.Add(newItem);
    //    }

    //    return results;

    //}

    // public static void AddDiem(IDanhGiaColumn item, string loaiDiem)
    // {
    //    if (item.DiemTuCham.HasValue || item.DiemNhanXet.HasValue || item.DiemThamMuu.HasValue || item.DiemDanhGia.HasValue)
    //    {
    //        if (loaiDiem == "NhanXet")
    //            item.DiemNhanXet = item.DiemTuCham ?? 0;
    //        if (loaiDiem == "ThamMuu")
    //            item.DiemThamMuu = item.DiemNhanXet ?? item.DiemTuCham ?? 0;
    //        if (loaiDiem == "DanhGia")
    //            item.DiemDanhGia = item.DiemThamMuu ?? item.DiemNhanXet ?? item.DiemTuCham ?? 0;
    //    }

    //    if (loaiDiem == "NhanXet")
    //    {
    //        if (item.DiemTuCham.HasValue)
    //        {
    //            item.isDisabledNX = item.isDisabled;
    //            item.isCheckedNX = item.isChecked;
    //        }
    //    }

    //    if (loaiDiem == "ThamMuu")
    //    {
    //        if (item.DiemNhanXet.HasValue)
    //        {
    //            item.isDisabledTM = item.isDisabledNX;
    //            item.isCheckedTM = item.isCheckedNX;
    //        }
    //        else if (item.DiemTuCham.HasValue)
    //        {
    //            item.isDisabledTM = item.isDisabled;
    //            item.isCheckedTM = item.isChecked;
    //        }
    //    }

    //    if (loaiDiem == "DanhGia")
    //    {
    //        if (item.DiemThamMuu.HasValue)
    //        {
    //            item.isDisabledDG = item.isDisabledTM;
    //            item.isCheckedDG = item.isCheckedTM;
    //        }
    //        else if (item.DiemNhanXet.HasValue)
    //        {
    //            item.isDisabledDG = item.isDisabledNX;
    //            item.isCheckedDG = item.isCheckedNX;
    //        }
    //        else if (item.DiemTuCham.HasValue)
    //        {
    //            item.isDisabledDG = item.isDisabled;
    //            item.isCheckedDG = item.isChecked;
    //        }
    //    }

    //    if (item.DanhSachTieuChiCon != null)
    //    {
    //        foreach (var childItem in item.DanhSachTieuChiCon)
    //        {
    //            AddDiem(childItem, loaiDiem);
    //        }
    //    }
    //}
}
