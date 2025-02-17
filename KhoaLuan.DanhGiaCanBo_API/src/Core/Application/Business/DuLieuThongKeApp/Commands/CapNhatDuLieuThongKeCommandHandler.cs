using MediatR;
using System.Text.RegularExpressions;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp.Queries;
using TD.DanhGiaCanBo.Application.Business.DuLieuThongKeApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;

public class CapNhatDuLieuThongKeCommandHandler : ICommandHandler<CapNhatDuLieuThongKeCommand>
{
    private readonly IRepositoryWithEvents<DuLieuThongKe> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mdeiator;

    public CapNhatDuLieuThongKeCommandHandler(IRepositoryWithEvents<DuLieuThongKe> repositoryWithEvents, IDapperRepository dapperRepository, IMediator mdeiator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
        _mdeiator = mdeiator;
    }
    private string GetThoiGianDanhGiaByThoiGianQuery(int thoiGianQuery)
    {
        string rel = string.Empty;
        try
        {
            string s = thoiGianQuery.ToString();
            string thang = s.Substring(4);

            if (s.Length == 6)
            {
                if (thang.StartsWith("0"))
                    rel = "Tháng " + thang.Replace("0", "");
                else
                    rel = "Tháng " + thang;

            }
            else if (s.Length == 7)
            {
                var intThang = int.Parse(thang);
                if (intThang == 1) rel = "Quý I";
                if (intThang == 2) rel = "Quý II";
                if (intThang == 3) rel = "Quý III";
                if (intThang == 4) rel = "Quý IV";
            }
            else if (s.Length == 8)
            {
                var intThang = int.Parse(thang);
                if (intThang == 1) rel = "6 tháng đầu năm";
                if (intThang == 2) rel = "6 tháng cuối năm";
            }


        }
        catch
        {
            return "Error";
        }
        return rel;
    }
    private int GetNamDanhGiaByThoiGianQuery(int thoiGianQuery)
    {
        try
        {
            string s = thoiGianQuery.ToString();
            string nam = s.Substring(0, 4);
            return int.Parse(nam);
        }
        catch { return 0; }
    }
    private string GetLoaiThoiGian(int thoiGianQuery)
    {
        string rel = string.Empty;
        try
        {
            if (thoiGianQuery.ToString().Length == 6) rel = "Tháng";
            else if (thoiGianQuery.ToString().Length == 7) rel = "Quý";
            else if (thoiGianQuery.ToString().Length == 8) rel = "6 tháng";
            else rel = "Năm";


        }
        catch { }
        return rel;
    }
    private async Task<string> GetFullMaCha(string groupcode, CancellationToken cancellationToken)
    {
        var userSql2 = $@"SELECT FullCode FROM [Catalog].[Groups] WHERE [GroupCode] = @GroupCode and Active=1 and DeletedOn IS NULL";
        return await _dapperRepository.QueryFirstOrDefaultObjectAsync<string>(userSql2, new { GroupCode = groupcode });
    }

    public async Task<Result> Handle(CapNhatDuLieuThongKeCommand request, CancellationToken cancellationToken)
    {

        try
        {
            var lstMaCha = new List<string>();
            if (request.Input == null)
            {
                request.Input = new DanhGia();
                request.Input.LoaiThoiGian = GetLoaiThoiGian(request.Input.ThoiGianQuery.Value);
                request.Input.NamDanhGia = GetNamDanhGiaByThoiGianQuery(request.Input.ThoiGianQuery.Value);
                request.Input.ThoiGian = GetThoiGianDanhGiaByThoiGianQuery(request.Input.ThoiGianQuery.Value);
            }
            if (!string.IsNullOrEmpty(request.Input.MaPhongBan))
            {

                if (!request.Input.MaPhongBan.Contains('.'))
                {

                }
                else
                {
                    var maCha = await GetFullMaCha(request.Input.MaPhongBan, cancellationToken);
                    lstMaCha = maCha.Split('#').ToList();
                }
            }
            //if (Regex.IsMatch(request.request.Input.MaPhongBan, @"[0-9]{3}\.[A-Z0-9]{2}\.[A-Z0-9]{2}\.[A-Z][0-9]{2}"))
            //{

            //    if (request.request.Input.MaPhongBan.StartsWith("000.00.00"))
            //    {

            //    }
            //    else if (request.request.Input.MaPhongBan.StartsWith("000.00"))
            //    {
            //        var lstMaDV = request.request.Input.MaPhongBan.Split('.').ToList();
            //        lstMaCha.Add("000.00.00." + lstMaDV[3]);
            //    }
            //    else if (request.request.Input.MaPhongBan.StartsWith("000"))
            //    {
            //        var lstMaDV = request.request.Input.MaPhongBan.Split('.').ToList();
            //        lstMaCha.Add("000.00." + lstMaDV[2] + "." + lstMaDV[3]);
            //        lstMaCha.Add("000.00.00." + lstMaDV[3]);
            //    }
            //    else
            //    {
            //        var lstMaDV = request.request.Input.MaPhongBan.Split('.').ToList();
            //        lstMaCha.Add("000." + lstMaDV[1] + "." + lstMaDV[2] + "." + lstMaDV[3]);
            //        lstMaCha.Add("000.00." + lstMaDV[2] + "." + lstMaDV[3]);
            //        lstMaCha.Add("000.00.00." + lstMaDV[3]);
            //    }
            //}
            var ngayHT = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");
            if (request.Input.MaDonVi != request.Input.MaPhongBan)
            {
                string query = "SELECT TOP 1 ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai,TongSoCongViec,CongViecChuaHoanThanh,CongViecDangXuLy,CongViecDaHoanThanh FROM  Business.DuLieuThongKes";
                string where = $" WHERE 1 = 1  and MaDonVi = @MaPhongBan";
                where += $" and ThoiGianQuery =@ThoiGianQuery";

                var itemDV = await _dapperRepository.QueryFirstOrDefaultAsync<DuLIeuThongKeDto>(query + where, request.Input);
                if (itemDV != null)
                {
                    if (request.Type == "DanhGia")
                    {
                        switch (request.XuLy)
                        {
                            case "Xoa":
                                var propUpdateCVXoa = "";
                                if (itemDV.TongSoTuDanhGia > 0) itemDV.TongSoTuDanhGia = itemDV.TongSoTuDanhGia - 1;
                                propUpdateCVXoa += $"TongSoTuDanhGia = {itemDV.TongSoTuDanhGia},";
                                propUpdateCVXoa += $"LastModifiedOn = GETDATE()";
                                
                                 string whereUpdateXoa = $" WHERE Id = '{itemDV.Id}'";
                                var sqlQueryXoa = "UPDATE "+ "Business.DuLieuThongKes" + " SET " + propUpdateCVXoa + whereUpdateXoa;
                                await _dapperRepository.ExcuteAsync(sqlQueryXoa, itemDV);

                                //CapNhatDonViCha
                                if (lstMaCha.Count > 0)
                                {
                                    string maCha = string.Join(",", lstMaCha);
                                    string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                    string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={request.Input.ThoiGianQuery}";
                                    var thongKeLstAll =await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
                                    if (thongKeLstAll.Count > 0)
                                    {
                                        foreach (var itemDG in thongKeLstAll)
                                        {
                                            var propUpdateItmCV = "";
                                            if (itemDG.TongSoTuDanhGia > 0) itemDG.TongSoTuDanhGia = itemDG.TongSoTuDanhGia - 1;
                                            propUpdateItmCV += $"TongSoTuDanhGia = {itemDG.TongSoTuDanhGia},";
                                            propUpdateItmCV += $"LastModifiedOn = GETDATE()";
                                            string whereUpdateCV = $" WHERE Id = '{itemDG.Id}'";
                                            var sqlQueryCV = "UPDATE "+ "Business.DuLieuThongKes" + " SET " + propUpdateItmCV + whereUpdateCV;
                                            await _dapperRepository.ExcuteAsync(sqlQueryCV, itemDG);
                                        }
                                    }
                                }
                                break;
                            case "Them":
                                var propUpdateCVThem = "";
                                var trangThaiCV = request.Input.TrangThai;
                                if (trangThaiCV == "Đã đánh giá")
                                {
                                    var phanLoai = request.Input.PhanLoaiDanhGia;
                                    if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                    {
                                        if (itemDV.DanhGiaLoaiA < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiA = itemDV.DanhGiaLoaiA + 1;
                                        propUpdateCVThem += $"DanhGiaLoaiA = {itemDV.DanhGiaLoaiA},";
                                    }
                                    if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                    {

                                        if (itemDV.DanhGiaLoaiD < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiD = itemDV.DanhGiaLoaiD + 1;
                                        propUpdateCVThem += $"DanhGiaLoaiD = {itemDV.DanhGiaLoaiD},";
                                    }
                                    if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                    {
                                        if (itemDV.DanhGiaLoaiC < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiC = itemDV.DanhGiaLoaiC + 1;
                                        propUpdateCVThem += $"DanhGiaLoaiC = {itemDV.DanhGiaLoaiC},";
                                    }
                                    if (phanLoai == "Loại B - Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                    {
                                        if (itemDV.DanhGiaLoaiB < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiB = itemDV.DanhGiaLoaiB + 1;
                                        propUpdateCVThem += $"DanhGiaLoaiB = {itemDV.DanhGiaLoaiB},";
                                    }
                                    if (itemDV.TongSoTuDanhGia < itemDV.TongSoCanBo) itemDV.TongSoTuDanhGia = itemDV.TongSoTuDanhGia + 1;
                                    if (itemDV.TongSoDaXepLoai < itemDV.TongSoCanBo) itemDV.TongSoDaXepLoai = itemDV.TongSoDaXepLoai + 1;
                                    propUpdateCVThem += $"TongSoTuDanhGia = {itemDV.TongSoTuDanhGia},";
                                    propUpdateCVThem += $"TongSoDaXepLoai = {itemDV.TongSoDaXepLoai},";
                                    propUpdateCVThem += $"LastModifiedOn = GETDATE()";
                                    string whereUpdateThem = $" WHERE Id = '{itemDV.Id}'";
                                    var sqlQueryThem = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateCVThem + whereUpdateThem;
                                    await _dapperRepository.ExcuteAsync(sqlQueryThem, itemDV);
                                    if (lstMaCha.Count > 0)
                                    {
                                        string maCha = string.Join(",", lstMaCha);
                                        string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                        string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={request.Input.ThoiGianQuery}";
                                        var thongKeLstAll = await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
                                        if (thongKeLstAll.Count > 0)
                                        {
                                            foreach (var itemDG in thongKeLstAll)
                                            {
                                                propUpdateCVThem = "";

                                                if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                                {

                                                    if (itemDG.DanhGiaLoaiA < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiA = itemDG.DanhGiaLoaiA + 1;
                                                    propUpdateCVThem += $"DanhGiaLoaiA = {itemDG.DanhGiaLoaiA},";
                                                }
                                                if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                                {
                                                    if (itemDG.DanhGiaLoaiD < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiD = itemDG.DanhGiaLoaiD + 1;
                                                    propUpdateCVThem += $"DanhGiaLoaiD = {itemDG.DanhGiaLoaiD},";
                                                }
                                                if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                                {
                                                    itemDG.DanhGiaLoaiC = itemDG.DanhGiaLoaiC + 1;
                                                    propUpdateCVThem += $"DanhGiaLoaiC = {itemDG.DanhGiaLoaiC},";
                                                }
                                                if (phanLoai == "Loại B - Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                                {
                                                    if (itemDG.DanhGiaLoaiB < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiB = itemDG.DanhGiaLoaiB + 1;
                                                    propUpdateCVThem += $"DanhGiaLoaiB = {itemDG.DanhGiaLoaiB},";
                                                }
                                                if (itemDG.TongSoTuDanhGia < itemDG.TongSoCanBo) itemDG.TongSoTuDanhGia = itemDG.TongSoTuDanhGia + 1;
                                                if (itemDG.TongSoDaXepLoai < itemDG.TongSoCanBo) itemDG.TongSoDaXepLoai = itemDG.TongSoDaXepLoai + 1;
                                                propUpdateCVThem += $"TongSoTuDanhGia = {itemDG.TongSoTuDanhGia},";
                                                propUpdateCVThem += $"TongSoDaXepLoai = {itemDG.TongSoDaXepLoai},";
                                                propUpdateCVThem += $"LastModifiedOn = GETDATE()";
                                                string whereUpdateDGThem = $" WHERE Id = '{itemDG.Id}'";
                                                var sqlQueryDGThem = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateCVThem + whereUpdateDGThem;
                                                await _dapperRepository.ExcuteAsync(sqlQueryDGThem, itemDG);
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    if (itemDV.TongSoTuDanhGia < itemDV.TongSoCanBo)
                                        itemDV.TongSoTuDanhGia = itemDV.TongSoTuDanhGia + 1;
                                    propUpdateCVThem += $"TongSoTuDanhGia = {itemDV.TongSoTuDanhGia},";
                                    propUpdateCVThem += $"LastModifiedOn = GETDATE()";
                                    string whereUpdateThem = $" WHERE Id = '{itemDV.Id}'";
                                    var sqlQueryThem = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateCVThem + whereUpdateThem;
                                    await _dapperRepository.ExcuteAsync(sqlQueryThem, itemDV);
                                    //CapNhatDonViCha
                                    if (lstMaCha.Count > 0)
                                    {
                                        string maCha = string.Join(",", lstMaCha);
                                        string queryDLTK = "SELECT ID,TongSoTuDanhGia,TongSoCanBo FROM Business.DuLieuThongKes";
                                        string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={request.Input.ThoiGianQuery}";
                                        var thongKeLstAll = await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
                                        if (thongKeLstAll.Count > 0)
                                        {
                                            foreach (var itemDG in thongKeLstAll)
                                            {
                                                var propUpdateItmCV = "";
                                                if (itemDG.TongSoTuDanhGia < itemDG.TongSoCanBo)
                                                    itemDG.TongSoTuDanhGia = itemDG.TongSoTuDanhGia + 1;
                                                propUpdateItmCV += $"TongSoTuDanhGia = {itemDG.TongSoTuDanhGia},";
                                                propUpdateItmCV += $"LastModifiedOn = GETDATE()";
                                                string whereUpdateCV = $" WHERE Id = '{itemDG.Id}'";
                                                var sqlQueryCV = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateItmCV + whereUpdateCV;
                                                await _dapperRepository.ExcuteAsync(sqlQueryCV, itemDG);
                                            }
                                        }
                                    }
                                }
                                break;
                            case "Sua":
                                if (request.Input.TrangThai == "Đã đánh giá")
                                {
                                    var phanLoai = request.Input.PhanLoaiDanhGia;
                                    var propUpdateCVSua = "";
                                    if (request.Input.TrangThai == request.TrangThaiCVCu)
                                    {
                                        if (phanLoai != request.PhanLoaiCu)
                                        {
                                            //Đã đánh giá
                                            var thayDoiXLA = 0; var thayDoiXLB = 0; var thayDoiXLC = 0; var thayDoiXLD = 0;

                                            if (request.PhanLoaiCu == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || request.PhanLoaiCu == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                            {
                                                thayDoiXLA = thayDoiXLA - 1;
                                            }
                                            if (request.PhanLoaiCu == "Loại D - Không hoàn thành nhiệm vụ" || request.PhanLoaiCu == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                            {
                                                thayDoiXLD = thayDoiXLD - 1;
                                            }
                                            if (request.PhanLoaiCu == "Loại C - Hoàn thành nhiệm vụ" || request.PhanLoaiCu == "Hoàn thành nhiệm vụ (xếp loại C)")
                                            {
                                                thayDoiXLC = thayDoiXLC - 1;
                                            }
                                            if (request.PhanLoaiCu == "Loại B - Hoàn thành tốt nhiệm vụ" || request.PhanLoaiCu == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                            {
                                                thayDoiXLB = thayDoiXLB - 1;
                                            }
                                            if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                            {
                                                thayDoiXLA = thayDoiXLA + 1;
                                            }
                                            if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                            {
                                                thayDoiXLD = thayDoiXLD + 1;
                                            }
                                            if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                            {
                                                thayDoiXLC = thayDoiXLC + 1;
                                            }
                                            if (phanLoai == "Loại B - Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                            {
                                                thayDoiXLB = thayDoiXLB + 1;
                                            }
                                            if (thayDoiXLA != 0)
                                            {
                                                itemDV.DanhGiaLoaiA = itemDV.DanhGiaLoaiA + thayDoiXLA;
                                                propUpdateCVSua += $"DanhGiaLoaiA = {itemDV.DanhGiaLoaiA},";
                                            }
                                            if (thayDoiXLB != 0)
                                            {
                                                itemDV.DanhGiaLoaiB = itemDV.DanhGiaLoaiB + thayDoiXLB;
                                                propUpdateCVSua += $"DanhGiaLoaiB = {itemDV.DanhGiaLoaiB},";
                                            }
                                            if (thayDoiXLC != 0)
                                            {
                                                itemDV.DanhGiaLoaiC = itemDV.DanhGiaLoaiC + thayDoiXLC;
                                                propUpdateCVSua += $"DanhGiaLoaiC = {itemDV.DanhGiaLoaiC},";
                                            }
                                            if (thayDoiXLD != 0)
                                            {
                                                itemDV.DanhGiaLoaiD = itemDV.DanhGiaLoaiD + thayDoiXLD;
                                                propUpdateCVSua += $"DanhGiaLoaiD = {itemDV.DanhGiaLoaiD},";
                                            }
                                            propUpdateCVSua += $"LastModifiedOn = GETDATE()";
                                            string whereUpdateSua = $" WHERE Id = '{itemDV.Id}'";
                                            var sqlQuerySua = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateCVSua + whereUpdateSua;
                                            await _dapperRepository.ExcuteAsync(sqlQuerySua, itemDV);
                                            //CapNhatDonViCha
                                            if (lstMaCha.Count > 0)
                                            {
                                                string maCha = string.Join(",", lstMaCha);
                                                string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                                string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={request.Input.ThoiGianQuery}";
                                                var thongKeLstAll = await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
                                                if (thongKeLstAll.Count > 0)
                                                {
                                                    foreach (var itemDG in thongKeLstAll)
                                                    {
                                                        var propUpdateItmCVSua = "";
                                                        if (thayDoiXLA != 0)
                                                        {
                                                            itemDG.DanhGiaLoaiA = itemDG.DanhGiaLoaiA + thayDoiXLA;
                                                            propUpdateItmCVSua += $"DanhGiaLoaiA = {itemDG.DanhGiaLoaiA},";
                                                        }
                                                        if (thayDoiXLB != 0)
                                                        {
                                                            itemDG.DanhGiaLoaiB = itemDG.DanhGiaLoaiB + thayDoiXLB;
                                                            propUpdateItmCVSua += $"DanhGiaLoaiB = {itemDG.DanhGiaLoaiB},";
                                                        }
                                                        if (thayDoiXLC != 0)
                                                        {
                                                            itemDG.DanhGiaLoaiC = itemDG.DanhGiaLoaiC + thayDoiXLC;
                                                            propUpdateItmCVSua += $"DanhGiaLoaiC = {itemDG.DanhGiaLoaiC},";
                                                        }
                                                        if (thayDoiXLD != 0)
                                                        {
                                                            itemDG.DanhGiaLoaiD = itemDG.DanhGiaLoaiD + thayDoiXLD;
                                                            propUpdateItmCVSua += $"DanhGiaLoaiD = {itemDG.DanhGiaLoaiD},";
                                                        }
                                                        propUpdateItmCVSua += $"LastModifiedOn = GETDATE()";
                                                        string whereUpdateImSua = $" WHERE Id = '{itemDG.Id}'";
                                                        var sqlQueryImSua = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateItmCVSua + whereUpdateImSua;
                                                        await _dapperRepository.ExcuteAsync(sqlQueryImSua, itemDG);
                                                    }
                                                }
                                            }
                                        }


                                    }
                                    else
                                    {
                                        if (itemDV.TongSoDaXepLoai < itemDV.TongSoCanBo)
                                            itemDV.TongSoDaXepLoai = itemDV.TongSoDaXepLoai + 1;
                                        propUpdateCVSua += $"TongSoDaXepLoai = {itemDV.TongSoDaXepLoai},";
                                        if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                        {
                                            if (itemDV.DanhGiaLoaiA < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiA = itemDV.DanhGiaLoaiA + 1;
                                            propUpdateCVSua += $"DanhGiaLoaiA = {itemDV.DanhGiaLoaiA},";
                                        }
                                        if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                        {
                                            if (itemDV.DanhGiaLoaiD < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiD = itemDV.DanhGiaLoaiD + 1;
                                            propUpdateCVSua += $"DanhGiaLoaiD = {itemDV.DanhGiaLoaiD},";
                                        }
                                        if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                        {
                                            if (itemDV.DanhGiaLoaiC < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiC = itemDV.DanhGiaLoaiC + 1;
                                            propUpdateCVSua += $"DanhGiaLoaiC = {itemDV.DanhGiaLoaiC},";
                                        }
                                        if (phanLoai == "Loại B - Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                        {
                                            if (itemDV.DanhGiaLoaiB < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiB = itemDV.DanhGiaLoaiB + 1;
                                            propUpdateCVSua += $"DanhGiaLoaiB = {itemDV.DanhGiaLoaiB},";
                                        }
                                        propUpdateCVSua += $"LastModifiedOn = GETDATE()";
                                        string whereUpdateSua = $" WHERE Id = '{itemDV.Id}'";
                                        var sqlQuerySua = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateCVSua + whereUpdateSua;
                                        await _dapperRepository.ExcuteAsync(sqlQuerySua, itemDV);
                                        //CapNhatDonViCha
                                        if (lstMaCha.Count > 0)
                                        {
                                            string maCha = string.Join(",", lstMaCha);
                                            string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                            string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={request.Input.ThoiGianQuery}";
                                            var thongKeLstAll = await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
                                            if (thongKeLstAll.Count > 0)
                                            {
                                                foreach (var itemDG in thongKeLstAll)
                                                {
                                                    var propUpdateItmCVSua = "";
                                                    if (itemDG.TongSoDaXepLoai < itemDG.TongSoCanBo)
                                                        itemDG.TongSoDaXepLoai = itemDG.TongSoDaXepLoai + 1;
                                                    propUpdateItmCVSua += $"TongSoDaXepLoai = {itemDG.TongSoDaXepLoai},";
                                                    if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                                    {
                                                        if (itemDG.DanhGiaLoaiA < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiA = itemDG.DanhGiaLoaiA + 1;
                                                        propUpdateItmCVSua += $"DanhGiaLoaiA = {itemDG.DanhGiaLoaiA},";
                                                    }
                                                    if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                                    {
                                                        if (itemDG.DanhGiaLoaiD < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiD = itemDG.DanhGiaLoaiD + 1;
                                                        propUpdateItmCVSua += $"DanhGiaLoaiD = {itemDG.DanhGiaLoaiD},";
                                                    }
                                                    if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                                    {
                                                        if (itemDG.DanhGiaLoaiC < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiC = itemDG.DanhGiaLoaiC + 1;
                                                        propUpdateItmCVSua += $"DanhGiaLoaiC = {itemDG.DanhGiaLoaiC},";
                                                    }
                                                    if (phanLoai == "Loại B - Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                                    {
                                                        if (itemDG.DanhGiaLoaiB < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiB = itemDG.DanhGiaLoaiB + 1;
                                                        propUpdateItmCVSua += $"DanhGiaLoaiB = {itemDG.DanhGiaLoaiB},";
                                                    }
                                                    propUpdateItmCVSua += $"LastModifiedOn = GETDATE()";
                                                    string whereUpdateImSua = $" WHERE Id = '{itemDG.Id}'";
                                                    var sqlQueryImSua = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateItmCVSua + whereUpdateImSua;
                                                    await _dapperRepository.ExcuteAsync(sqlQueryImSua, itemDG);
                                                }
                                            }
                                        }
                                    }
                                }
                                break;
                        }

                    }
                }
            }
            else
            {
                string query = "SELECT TOP 1 ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai,TongSoCongViec,CongViecChuaHoanThanh,CongViecDangXuLy,CongViecDaHoanThanh FROM " + "Business.DuLieuThongKes";
                string where = $" WHERE 1 = 1  and MaDonVi = '{request.Input.MaPhongBan}'";
                where += $" and ThoiGianQuery = {request.Input.ThoiGianQuery}";
                var itemDV = await _dapperRepository.QuerySingleAsync<DuLieuThongKe>(query + where);
                if (itemDV != null)
                {
                    if (request.Type == "DanhGia")
                    {
                        switch (request.XuLy)
                        {
                            case "Xoa":
                                var propUpdateCVXoa = "";
                                if (itemDV.TongSoTuDanhGia > 0) itemDV.TongSoTuDanhGia = itemDV.TongSoTuDanhGia - 1;
                                propUpdateCVXoa += $"TongSoTuDanhGia = {itemDV.TongSoTuDanhGia},";
                                propUpdateCVXoa += $"LastModifiedOn = GETDATE()";
                                string whereUpdateXoa = $" WHERE Id = '{itemDV.Id}'";
                                var sqlQueryXoa = "UPDATE "+ "Business.DuLieuThongKes" +" SET " + propUpdateCVXoa + whereUpdateXoa;
                                await _dapperRepository.ExcuteAsync(sqlQueryXoa, itemDV);
                                //CapNhatDonViCha
                                if (lstMaCha.Count > 0)
                                {
                                    string maCha = string.Join(",", lstMaCha);
                                    string queryDLTK = "SELECT ID,TongSoTuDanhGia FROM Business.DuLieuThongKes";
                                    string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={request.Input.ThoiGianQuery}";
                                    var thongKeLstAll = await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
                                    if (thongKeLstAll.Count > 0)
                                    {
                                        foreach (var itemDG in thongKeLstAll)
                                        {
                                            var propUpdateItmCV = "";
                                            if (itemDV.TongSoTuDanhGia > 0)
                                                itemDG.TongSoTuDanhGia = itemDG.TongSoTuDanhGia - 1;
                                            propUpdateItmCV += $"TongSoTuDanhGia = {itemDG.TongSoTuDanhGia},";
                                            propUpdateItmCV += $"LastModifiedOn = GETDATE()";
                                            string whereUpdateCV = $" WHERE Id = '{itemDG.Id}'";
                                            var sqlQueryCV = "UPDATE "+ "Business.DuLieuThongKes" +" SET " + propUpdateItmCV + whereUpdateCV;
                                            await _dapperRepository.ExcuteAsync(sqlQueryCV, itemDG);
                                         }
                                    }
                                }
                                break;
                            case "Them":
                                var propUpdateCVThem = "";
                                var trangThaiCV = request.Input.TrangThai;
                                if (trangThaiCV == "Đã đánh giá")
                                {
                                    var phanLoai = request.Input.PhanLoaiDanhGia;
                                    if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                    {
                                        if (itemDV.DanhGiaLoaiA < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiA = itemDV.DanhGiaLoaiA + 1;
                                        propUpdateCVThem += $"DanhGiaLoaiA = {itemDV.DanhGiaLoaiA},";
                                    }
                                    if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                    {
                                        if (itemDV.DanhGiaLoaiD < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiD = itemDV.DanhGiaLoaiD + 1;
                                        propUpdateCVThem += $"DanhGiaLoaiD = {itemDV.DanhGiaLoaiD},";
                                    }
                                    if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                    {
                                        if (itemDV.DanhGiaLoaiC < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiC = itemDV.DanhGiaLoaiC + 1;
                                        propUpdateCVThem += $"DanhGiaLoaiC = {itemDV.DanhGiaLoaiC},";
                                    }
                                    if (phanLoai == "Loại B - Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                    {
                                        if (itemDV.DanhGiaLoaiB < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiB = itemDV.DanhGiaLoaiB + 1;
                                        propUpdateCVThem += $"DanhGiaLoaiB = {itemDV.DanhGiaLoaiB},";
                                    }
                                    if (itemDV.TongSoTuDanhGia < itemDV.TongSoCanBo) itemDV.TongSoTuDanhGia = itemDV.TongSoTuDanhGia + 1;
                                    if (itemDV.TongSoDaXepLoai < itemDV.TongSoCanBo) itemDV.TongSoDaXepLoai = itemDV.TongSoDaXepLoai + 1;
                                    propUpdateCVThem += $"TongSoTuDanhGia = {itemDV.TongSoTuDanhGia},";
                                    propUpdateCVThem += $"TongSoDaXepLoai = {itemDV.TongSoDaXepLoai},";
                                    propUpdateCVThem += $"LastModifiedOn = GETDATE()";
                                    string whereUpdateThem = $" WHERE Id = '{itemDV.Id}'";
                                    var sqlQueryThem = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateCVThem + whereUpdateThem;
                                    await _dapperRepository.ExcuteAsync(sqlQueryThem, itemDV);
                                    //CapNhatDonViCha
                                    if (lstMaCha.Count > 0)
                                    {
                                        string maCha = string.Join(",", lstMaCha);
                                        string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                        string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={request.Input.ThoiGianQuery}";
                                        var thongKeLstAll = await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
                                        if (thongKeLstAll.Count > 0)
                                        {
                                            foreach (var itemDG in thongKeLstAll)
                                            {
                                                propUpdateCVThem = "";
                                                if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                                {
                                                    if (itemDG.DanhGiaLoaiA < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiA = itemDG.DanhGiaLoaiA + 1;
                                                    propUpdateCVThem += $"DanhGiaLoaiA = {itemDG.DanhGiaLoaiA},";
                                                }
                                                if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                                {
                                                    if (itemDG.DanhGiaLoaiD < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiD = itemDG.DanhGiaLoaiD + 1;
                                                    propUpdateCVThem += $"DanhGiaLoaiD = {itemDG.DanhGiaLoaiD},";
                                                }
                                                if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                                {
                                                    if (itemDG.DanhGiaLoaiC < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiC = itemDG.DanhGiaLoaiC + 1;
                                                    propUpdateCVThem += $"DanhGiaLoaiC = {itemDG.DanhGiaLoaiC},";
                                                }
                                                if (phanLoai == "Loại B - Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                                {
                                                    if (itemDG.DanhGiaLoaiB < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiB = itemDG.DanhGiaLoaiB + 1;
                                                    propUpdateCVThem += $"DanhGiaLoaiB = {itemDG.DanhGiaLoaiB},";
                                                }
                                                if (itemDG.TongSoTuDanhGia < itemDG.TongSoCanBo) itemDG.TongSoTuDanhGia = itemDG.TongSoTuDanhGia + 1;
                                                if (itemDG.TongSoDaXepLoai < itemDG.TongSoCanBo) itemDG.TongSoDaXepLoai = itemDG.TongSoDaXepLoai + 1;
                                                propUpdateCVThem += $"TongSoTuDanhGia = {itemDG.TongSoTuDanhGia},";
                                                propUpdateCVThem += $"TongSoDaXepLoai = {itemDG.TongSoDaXepLoai},";
                                                propUpdateCVThem += $"LastModifiedOn = GETDATE()";
                                                string whereUpdateDGThem = $" WHERE Id = '{itemDG.Id}'";
                                                var sqlQueryDGThem = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateCVThem + whereUpdateDGThem;
                                                await _dapperRepository.ExcuteAsync(sqlQueryDGThem, itemDG);
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    if (itemDV.TongSoTuDanhGia < itemDV.TongSoCanBo)
                                        itemDV.TongSoTuDanhGia = itemDV.TongSoTuDanhGia + 1;
                                    propUpdateCVThem += $"TongSoTuDanhGia = {itemDV.TongSoTuDanhGia},";
                                    propUpdateCVThem += $"LastModifiedOn = GETDATE()";
                                    string whereUpdateThem = $" WHERE Id = '{itemDV.Id}'";
                                    var sqlQueryThem = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateCVThem + whereUpdateThem;
                                    await _dapperRepository.ExcuteAsync(sqlQueryThem, itemDV);
                                    //CapNhatDonViCha
                                    if (lstMaCha.Count > 0)
                                    {
                                        string maCha = string.Join(",", lstMaCha);
                                        string queryDLTK = "SELECT ID,TongSoTuDanhGia,TongSoCanBo FROM Business.DuLieuThongKes";
                                        string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={request.Input.ThoiGianQuery}";
                                        var thongKeLstAll = await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
                                        if (thongKeLstAll.Count > 0)
                                        {
                                            foreach (var itemDG in thongKeLstAll)
                                            {
                                                var propUpdateItmCV = "";
                                                if (itemDG.TongSoTuDanhGia < itemDG.TongSoCanBo)
                                                    itemDG.TongSoTuDanhGia = itemDG.TongSoTuDanhGia + 1;
                                                propUpdateItmCV += $"TongSoTuDanhGia = {itemDG.TongSoTuDanhGia},";
                                                propUpdateItmCV += $"LastModifiedOn = GETDATE()";
                                                string whereUpdateCV = $" WHERE Id = '{itemDG.Id}'";
                                                var sqlQueryCV = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateItmCV + whereUpdateCV;
                                                await _dapperRepository.ExcuteAsync(sqlQueryCV, itemDG);
                                            }
                                        }
                                    }
                                }
                                break;
                            case "Sua":
                                if (request.Input.TrangThai == "Đã đánh giá")
                                {
                                    var phanLoai = request.Input.PhanLoaiDanhGia;
                                    var propUpdateCVSua = "";
                                    if (request.Input.TrangThai == request.TrangThaiCVCu)
                                    {
                                        if (phanLoai != request.PhanLoaiCu)
                                        {
                                            //Đã đánh giá
                                            var thayDoiXLA = 0; var thayDoiXLB = 0; var thayDoiXLC = 0; var thayDoiXLD = 0;

                                            if (request.PhanLoaiCu == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || request.PhanLoaiCu == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                            {
                                                thayDoiXLA = thayDoiXLA - 1;
                                            }
                                            if (request.PhanLoaiCu == "Loại D - Không hoàn thành nhiệm vụ" || request.PhanLoaiCu == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                            {
                                                thayDoiXLD = thayDoiXLD - 1;
                                            }
                                            if (request.PhanLoaiCu == "Loại C - Hoàn thành nhiệm vụ" || request.PhanLoaiCu == "Hoàn thành nhiệm vụ (xếp loại C)")
                                            {
                                                thayDoiXLC = thayDoiXLC - 1;
                                            }
                                            if (request.PhanLoaiCu == "Loại B - Hoàn thành tốt nhiệm vụ" || request.PhanLoaiCu == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                            {
                                                thayDoiXLB = thayDoiXLB - 1;
                                            }
                                            if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                            {
                                                thayDoiXLA = thayDoiXLA + 1;
                                            }
                                            if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                            {
                                                thayDoiXLD = thayDoiXLD + 1;
                                            }
                                            if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                            {
                                                thayDoiXLC = thayDoiXLC + 1;
                                            }
                                            if (phanLoai == "Loại B - Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                            {
                                                thayDoiXLB = thayDoiXLB + 1;
                                            }
                                            if (thayDoiXLA != 0)
                                            {
                                                itemDV.DanhGiaLoaiA = itemDV.DanhGiaLoaiA + thayDoiXLA;
                                                propUpdateCVSua += $"DanhGiaLoaiA = {itemDV.DanhGiaLoaiA},";
                                            }
                                            if (thayDoiXLB != 0)
                                            {
                                                itemDV.DanhGiaLoaiB = itemDV.DanhGiaLoaiB + thayDoiXLB;
                                                propUpdateCVSua += $"DanhGiaLoaiB = {itemDV.DanhGiaLoaiB},";
                                            }
                                            if (thayDoiXLC != 0)
                                            {
                                                itemDV.DanhGiaLoaiC = itemDV.DanhGiaLoaiC + thayDoiXLC;
                                                propUpdateCVSua += $"DanhGiaLoaiC = {itemDV.DanhGiaLoaiC},";
                                            }
                                            if (thayDoiXLD != 0)
                                            {
                                                itemDV.DanhGiaLoaiD = itemDV.DanhGiaLoaiD + thayDoiXLD;
                                                propUpdateCVSua += $"DanhGiaLoaiD = {itemDV.DanhGiaLoaiD},";
                                            }
                                            propUpdateCVSua += $"LastModifiedOn = GETDATE()";
                                            string whereUpdateSua = $" WHERE Id = '{itemDV.Id}'";
                                            var sqlQuerySua = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateCVSua + whereUpdateSua;
                                            await _dapperRepository.ExcuteAsync(sqlQuerySua, itemDV);
                                            //CapNhatDonViCha
                                            if (lstMaCha.Count > 0)
                                            {
                                                string maCha = string.Join(",", lstMaCha);
                                                string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                                string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={request.Input.ThoiGianQuery}";
                                                var thongKeLstAll = await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
                                                if (thongKeLstAll.Count > 0)
                                                {
                                                    foreach (var itemDG in thongKeLstAll)
                                                    {
                                                        var propUpdateItmCVSua = "";
                                                        if (thayDoiXLA != 0)
                                                        {
                                                            itemDG.DanhGiaLoaiA = itemDG.DanhGiaLoaiA + thayDoiXLA;
                                                            propUpdateItmCVSua += $"DanhGiaLoaiA = {itemDG.DanhGiaLoaiA},";
                                                        }
                                                        if (thayDoiXLB != 0)
                                                        {
                                                            itemDG.DanhGiaLoaiB = itemDG.DanhGiaLoaiB + thayDoiXLB;
                                                            propUpdateItmCVSua += $"DanhGiaLoaiB = {itemDG.DanhGiaLoaiB},";
                                                        }
                                                        if (thayDoiXLC != 0)
                                                        {
                                                            itemDG.DanhGiaLoaiC = itemDG.DanhGiaLoaiC + thayDoiXLC;
                                                            propUpdateItmCVSua += $"DanhGiaLoaiC = {itemDG.DanhGiaLoaiC},";
                                                        }
                                                        if (thayDoiXLD != 0)
                                                        {
                                                            itemDG.DanhGiaLoaiD = itemDG.DanhGiaLoaiD + thayDoiXLD;
                                                            propUpdateItmCVSua += $"DanhGiaLoaiD = {itemDG.DanhGiaLoaiD},";
                                                        }
                                                        propUpdateItmCVSua += $"LastModifiedOn = GETDATE()";
                                                        string whereUpdateImSua = $" WHERE Id = '{itemDG.Id}'";
                                                        var sqlQueryImSua = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateItmCVSua + whereUpdateImSua;
                                                        await _dapperRepository.ExcuteAsync(sqlQueryImSua, itemDG);
                                                    }
                                                }
                                            }
                                        }


                                    }
                                    else
                                    {
                                        if (itemDV.TongSoDaXepLoai < itemDV.TongSoCanBo)
                                            itemDV.TongSoDaXepLoai = itemDV.TongSoDaXepLoai + 1;
                                        propUpdateCVSua += $"TongSoDaXepLoai = {itemDV.TongSoDaXepLoai},";
                                        if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                        {
                                            if (itemDV.DanhGiaLoaiA < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiA = itemDV.DanhGiaLoaiA + 1;
                                            propUpdateCVSua += $"DanhGiaLoaiA = {itemDV.DanhGiaLoaiA},";
                                        }
                                        if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                        {
                                            if (itemDV.DanhGiaLoaiD < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiD = itemDV.DanhGiaLoaiD + 1;
                                            propUpdateCVSua += $"DanhGiaLoaiD = {itemDV.DanhGiaLoaiD},";
                                        }
                                        if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                        {
                                            if (itemDV.DanhGiaLoaiC < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiC = itemDV.DanhGiaLoaiC + 1;
                                            propUpdateCVSua += $"DanhGiaLoaiC = {itemDV.DanhGiaLoaiC},";
                                        }
                                        if (phanLoai == "Loại B - Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                        {
                                            if (itemDV.DanhGiaLoaiB < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiB = itemDV.DanhGiaLoaiB + 1;
                                            propUpdateCVSua += $"DanhGiaLoaiB = {itemDV.DanhGiaLoaiB},";
                                        }
                                        propUpdateCVSua += $"LastModifiedOn = GETDATE()";
                                        string whereUpdateSua = $" WHERE Id = '{itemDV.Id}'";
                                        var sqlQuerySua = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateCVSua + whereUpdateSua;
                                        await _dapperRepository.ExcuteAsync(sqlQuerySua, itemDV);
                                        //CapNhatDonViCha
                                        if (lstMaCha.Count > 0)
                                        {
                                            string maCha = string.Join(",", lstMaCha);
                                            string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                            string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={request.Input.ThoiGianQuery}";
                                            var thongKeLstAll = await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
                                            if (thongKeLstAll.Count > 0)
                                            {
                                                foreach (var itemDG in thongKeLstAll)
                                                {
                                                    var propUpdateItmCVSua = "";
                                                    if (itemDG.TongSoDaXepLoai < itemDG.TongSoCanBo)
                                                        itemDG.TongSoDaXepLoai = itemDG.TongSoDaXepLoai + 1;
                                                    propUpdateItmCVSua += $"TongSoDaXepLoai = {itemDG.TongSoDaXepLoai},";
                                                    if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                                    {
                                                        if (itemDG.DanhGiaLoaiA < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiA = itemDG.DanhGiaLoaiA + 1;
                                                        propUpdateItmCVSua += $"DanhGiaLoaiA = {itemDG.DanhGiaLoaiA},";
                                                    }
                                                    if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                                    {
                                                        if (itemDG.DanhGiaLoaiD < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiD = itemDG.DanhGiaLoaiD + 1;
                                                        propUpdateItmCVSua += $"DanhGiaLoaiD = {itemDG.DanhGiaLoaiD},";
                                                    }
                                                    if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                                    {
                                                        if (itemDG.DanhGiaLoaiC < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiC = itemDG.DanhGiaLoaiC + 1;
                                                        propUpdateItmCVSua += $"DanhGiaLoaiC = {itemDG.DanhGiaLoaiC},";
                                                    }
                                                    if (phanLoai == "Loại B - Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                                    {
                                                        if (itemDG.DanhGiaLoaiB < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiB = itemDG.DanhGiaLoaiB + 1;
                                                        propUpdateItmCVSua += $"DanhGiaLoaiB = {itemDG.DanhGiaLoaiB},";
                                                    }
                                                    propUpdateItmCVSua += $"LastModifiedOn = GETDATE()";
                                                    string whereUpdateImSua = $" WHERE Id = '{itemDG.Id}'";
                                                    var sqlQueryImSua = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateItmCVSua + whereUpdateImSua;
                                                    await _dapperRepository.ExcuteAsync(sqlQueryImSua, itemDG);
                                                }
                                            }
                                        }
                                    }
                                }
                                break;
                        }
                    }
                }
            }
            //var itemExitst = await _repositoryWithEvents.GetByIdAsync(request.Id, cancellationToken);
            //if (itemExitst == null)
            //    throw new NotFoundException($"ChucVu với mã: {request.Id} chưa được thêm vào hệ thống");
            //var updatedChucVu = itemExitst.Update(request.Ten, request.Ma, request.MoTa, request.Active);
            //await _repositoryWithEvents.UpdateAsync(updatedChucVu, cancellationToken);
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }
    }
}
