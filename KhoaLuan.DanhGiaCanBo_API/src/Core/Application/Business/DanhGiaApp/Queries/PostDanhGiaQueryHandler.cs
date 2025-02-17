//using Microsoft.Extensions.Configuration;
//using Newtonsoft.Json;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Text.RegularExpressions;
//using System.Threading.Tasks;
//using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
//using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
//using TD.DanhGiaCanBo.Application.Business.QuyTrinhXuLyApp.Commands;
//using TD.DanhGiaCanBo.Application.Common.Caching;
//using TD.DanhGiaCanBo.Application.Common.Mailing;
//using TD.DanhGiaCanBo.Application.Common.Persistence;
//using TD.DanhGiaCanBo.Domain.Business;
//using TD.DanhGiaCanBo.Domain.Constant;

//namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;

//public class PostDanhGiaQueryWhereBuilder
//{

//}
//public class PostDanhGiaQueryHandler : IQueryHandler<PostDanhGiaQuery, DanhGia>
//{
//    private readonly ICacheService _cacheService;
//    private readonly int _cacheTime = 2;
//    private readonly IDapperRepository _dapperRepository;
//    private readonly IRepository<DuLieuThongKe> _duLieuThongKerepository;
//    private readonly IRepository<DanhGia> _danhGiaKerepository;
//    private readonly IConfiguration _configuration;
//    private readonly ILogger<DanhGia> _logger;

//    public PostDanhGiaQueryHandler(IDapperRepository dapperRepository, IRepository<DuLieuThongKe> duLieuThongKerepository, IRepository<DanhGia> danhGiaKerepository, IConfiguration configuration, ILogger<UsersController> logger)
//    {
//        _dapperRepository = dapperRepository;
//        _duLieuThongKerepository = duLieuThongKerepository;
//        _danhGiaKerepository = danhGiaKerepository;
//        _configuration = configuration;
//        _logger = logger;
//    }
//    public async Task<Result<DanhGia>> Handle(PostDanhGiaQuery request, CancellationToken cancellationToken)
//    {
//        if (!request.KhongDanhGia.HasValue) request.KhongDanhGia = false;
//        var danhGia = DanhGia.Create(request.MaPhieu, request.LoaiDanhGia, request.ChiTietDiemDanhGia, request.HoVaTen, request.TaiKhoan, request.MaNguoiDung, request.ChucVu,
//             request.ChucDanh, request.TenPhongBan, request.MaPhongBan, request.TenDonVi, request.MaDonVi, request.TrangThai, request.PhanLoaiTuDanhGia, request.PhanLoaiDanhGia, request.PhanLoaiNhanXet,
//             request.DiemDanhGia, request.DiemTuDanhGia, request.DiemNhanXet, request.DiemThamMuu, request.PhanLoaiThamMuu, request.NamDanhGia, request.ThoiGianTao, request.ThoiGianNhanXet, request.ThoiGianDanhGia, request.ThoiGianHDDanhGia, request.ThoiGianThamMuu, request.TruongDonVi, request.SuDung,
//             request.MaDonViCha, request.LyDoThayDoiXepLoai, request.YKienLanhDao, request.YKienTuDanhGia, request.YKienNhanXet, request.YKienThamMuu, request.YkienDanhGia,
//             request.FileDinhKem, request.FileDinhKemNX, request.FileDinhKemTM, request.FileDinhKemDG, request.KhongDanhGia, request.KiemNhiem, request.Phone, request.Email,
//             request.NguoiTaoUser, request.NguoiSuaUser, request.NgaySuaUser, request.NgayTaoUser, request.ThuTu, request.TenMauPhieuDanhGia, request.MaMauPhieuDanhGia, request.NguoiTuDanhGia,
//             request.NguoiNhanXet, request.NguoiThamMuu, request.NguoiDanhGia, request.ThamQuyenXepLoai, request.BuocHienTaiId, request.BuocTruocId, request.NguoiDangXuLyId,
//              request.DaXem, request.MaHoSo, request.ThoiGianQuery, request.LoaiThoiGian, request.ThoiGian);
//       var itemAdd =  await _danhGiaKerepository.AddAsync(danhGia);
//        //LuuVet
//        string checkKT = _configuration.GetSection("KiemTrungDanhGia").Value;
//        if (checkKT == "1")
//        {
//            if (string.IsNullOrEmpty(request.HoVaTen))
//            {
//                var log = request;
//                _logger.LogError("DanhGia2Ctrl_PostDanhGias_HoVaTenNull", new
//                {
//                    Req = JsonConvert.SerializeObject(log),
//                 });
             
//            }

//            var count = _Dapper_DanhGiaRepos.CheckKyDanhGia(entity.BoTieuChuanID.ToString(), entity.ThoiGian, entity.TaiKhoan, entity.MaDonVi);
//            if (count > 0)
//            {

//                _DanhGiaRepository.UpdateDanhGiaTT(count, entity);
//                DanhGia = _Dapper_DanhGiaRepos.Find(count);
//            }
//            else
//            {
//                DanhGia = _DanhGiaRepository.Add(entity);

//            }
//            _Dapper_DuLieuThongKeRepos.CapNhatDuLieuThongKe("DanhGia", "Them", entity, null, null, null);
//            //else
//            //{
//            //    var DanhGia = _Dapper_DanhGiaRepos.Find(count);
//            //    return ApiOk(DanhGia);
//            //}
//        }

//        //Update vào Phiếu
//        return Result<DanhGia>.Success(itemAdd);
//    }
//}
