using MediatR;
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
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;

public class XoaDanhGiaChonQueryHandler : ICommandHandler<XoaDanhGiaChonQuery>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IRepositoryWithEvents<DanhGia> _repositoryWithEvents;
    private readonly IVetXuLyDanhGiaService _vetXuLyDanhGiaService;
    private readonly ICurrentUser _currentUser;
    private readonly IReadRepository<BuocXuLy> _buocXuLyRepo;
    private readonly IMediator _mediator;
    public XoaDanhGiaChonQueryHandler(IDapperRepository dapperRepository, IRepositoryWithEvents<DanhGia> repositoryWithEvents, IVetXuLyDanhGiaService vetXuLyDanhGiaService, ICurrentUser currentUser, IReadRepository<BuocXuLy> buocXuLyRepo, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _repositoryWithEvents = repositoryWithEvents;
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
        _currentUser = currentUser;
        _buocXuLyRepo = buocXuLyRepo;
        _mediator = mediator;
    }

    public async Task<Result> Handle(XoaDanhGiaChonQuery request, CancellationToken cancellationToken)
    {
        string currentUserID = _currentUser.GetUserGroupId() ?? string.Empty;
        string tenThaoTac = "XoaDanhGia";

        string ids = string.Join(",", request.Ids.Select(id => $"'{id}'"));
        string where = $"WHERE ID IN ({ids}) AND SuDung = 1 AND DeletedOn IS NULL AND TrangThai != N'Chưa đánh giá'";
        string query = $@"SELECT * FROM {TableNames.DanhGias} {where}";

        var lstItemDg = await _dapperRepository.QueryAsync<DanhGia>(query, request);
        if (lstItemDg != null)
        {
            foreach (var itemDg in lstItemDg)
            {
                //// Tạo phiếu mới
                //var danhGia = DanhGia.Create(itemDg.MaPhieu, itemDg.LoaiDanhGia, itemDg.ChiTietDiemDanhGia, itemDg.HoVaTen, itemDg.TaiKhoan, itemDg.MaNguoiDung, itemDg.ChucVu,
                //   itemDg.ChucDanh, itemDg.TenPhongBan, itemDg.MaPhongBan, itemDg.TenDonVi, itemDg.MaDonVi, "Chưa đánh giá", itemDg.PhanLoaiLanhDaoDanhGia, itemDg.PhanLoaiTuDanhGia, itemDg.PhanLoaiDanhGia, itemDg.PhanLoaiNhanXet,
                //   itemDg.DiemDanhGia, itemDg.DiemTuDanhGia, itemDg.DiemNhanXet, itemDg.DiemThamMuu, itemDg.DiemLanhDaoDanhGia, itemDg.PhanLoaiThamMuu, itemDg.NamDanhGia, itemDg.ThoiGianTao, itemDg.ThoiGianNhanXet, itemDg.ThoiGianDanhGia, itemDg.ThoiGianHDDanhGia, itemDg.ThoiGianThamMuu, itemDg.TruongDonVi, itemDg.SuDung,
                //   itemDg.MaDonViCha, itemDg.LyDoThayDoiXepLoai, itemDg.YKienLanhDao, itemDg.YKienTuDanhGia, itemDg.YKienNhanXet, itemDg.YKienThamMuu, itemDg.YKienDanhGia,
                //   itemDg.FileDinhKem, itemDg.FileDinhKemNX, itemDg.FileDinhKemTM, itemDg.FileDinhKemDG, itemDg.KhongDanhGia, itemDg.KiemNhiem, itemDg.Phone, itemDg.Email,
                //   itemDg.NguoiTaoUser, itemDg.NguoiSuaUser, itemDg.NgaySuaUser, itemDg.NgayTaoUser, itemDg.ThuTu, itemDg.TenMauPhieuDanhGia, itemDg.MaMauPhieuDanhGia, itemDg.NguoiTuDanhGia, itemDg.NguoiTuDanhGiaId,
                //   itemDg.NguoiNhanXet, itemDg.NguoiNhanXetId, itemDg.NguoiThamMuu, itemDg.NguoiThamMuuId, itemDg.NguoiDanhGia, itemDg.NguoiDanhGiaId, itemDg.ThamQuyenXepLoai, itemDg.BuocHienTaiId, itemDg.BuocTruocId, itemDg.NguoiDangXuLyId,
                //   itemDg.DaXem, itemDg.MaHoSo, itemDg.ThoiGianQuery, itemDg.LoaiThoiGian, itemDg.ThoiGian, itemDg.MaBoTieuChuan, itemDg.TenBoTieuChuan, itemDg.DanhSachPhanLoaiDanhGia, itemDg.QuyTrinhXuLyId, itemDg.UrlPdf, itemDg.UrlDocx, itemDg.IsKySoCaNhan, itemDg.IsKySoNhanXet, itemDg.IsKySoThamMuu, itemDg.IsKySoLanhDao,itemDg.MaDonViFull);

                try
                {
                    //await _repositoryWithEvents.AddAsync(danhGia, cancellationToken);
                    await _mediator.Send(new UpdateDanhGiaCommand()
                    {
                        Id = itemDg.Id,
                        SuDung = false,
                        BuocHienTaiId = itemDg.BuocHienTaiId,
                        TenThaoTacVetXuLy = "Xóa chấm điểm (Đánh giá toàn bộ đơn vị)",
                        NamDanhGia = itemDg.NamDanhGia
                    });
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message, ex);
                }

            }
            var req = new CapNhatDuLieuThongKeDonViCommand()
            {
                XuLy = "Xoa",
                LstItem = lstItemDg.ToList(),
            };
            var res = await _mediator.Send(req);
        }
        else
        {
            throw new NotFoundException($"DanhGia với mã: {request.Ids} chưa được thêm vào hệ thống");
        }

        return (Result)Result.Success(message: "Thao tác thành công!");
    }
}
