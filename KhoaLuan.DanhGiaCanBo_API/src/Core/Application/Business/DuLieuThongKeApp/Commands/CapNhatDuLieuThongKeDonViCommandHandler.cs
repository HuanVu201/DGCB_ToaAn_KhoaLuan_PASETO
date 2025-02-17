using MediatR;
using System.Net.WebSockets;
using System.Text.RegularExpressions;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Business.DuLieuThongKeApp;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.ChucVuApp.Commands;

public class CapNhatDuLieuThongKeDonViCommandHandler : ICommandHandler<CapNhatDuLieuThongKeDonViCommand>
{
    private readonly IRepositoryWithEvents<DuLieuThongKe> _repositoryWithEvents;
    private readonly IDapperRepository _dapperRepository;
    private readonly IMediator _mdeiator;

    public CapNhatDuLieuThongKeDonViCommandHandler(IRepositoryWithEvents<DuLieuThongKe> repositoryWithEvents, IDapperRepository dapperRepository, IMediator mdeiator)
    {
        _repositoryWithEvents = repositoryWithEvents;
        _dapperRepository = dapperRepository;
        _mdeiator = mdeiator;
    }
    private async Task<string> GetFullMaCha(string groupcode, CancellationToken cancellationToken)
    {
        var userSql2 = $@"SELECT FullCode FROM [Catalog].[Groups] WHERE [GroupCode] = @GroupCode and Active=1 and DeletedOn IS NULL";
        return await _dapperRepository.QueryFirstOrDefaultObjectAsync<string>(userSql2, new { GroupCode = groupcode });
    }
    public async Task<Result> Handle(CapNhatDuLieuThongKeDonViCommand request, CancellationToken cancellationToken)
    {
        
        try
        {

            var lstIDKhoiPhuc = new List<string>();
            if (!string.IsNullOrEmpty(request.IdKhoiPhuc))
            {
                if (request.IdKhoiPhuc.Contains(','))
                    lstIDKhoiPhuc = request.IdKhoiPhuc.Split(',').ToList();
                else lstIDKhoiPhuc.Add(request.IdKhoiPhuc);
                request.LstItem = request.LstItem.Where(x => lstIDKhoiPhuc.Contains(x.Id.ToString())).ToList();
            }
            foreach (var input in request.LstItem)
            {
                var trangThai = input.TrangThai;
                var phanLoai = input.PhanLoaiDanhGia;
                //string urlRoot = SPContext.Current.Site.RootWeb.Url;
                var lstMaCha = new List<string>();
                //D01.50.12.VP D01.50.12
                if (!string.IsNullOrEmpty(input.MaPhongBan))
                {

                    if (!input.MaPhongBan.Contains('.'))
                    {

                    }
                    else
                    {
                        var maCha = await GetFullMaCha(input.MaPhongBan, cancellationToken);
                        lstMaCha = maCha.Split('#').ToList();
                    }
                    //else if (input.MaPhongBan.Split('.').Length == 2)
                    //{
                    //    var maCha = await GetMaCha(input.MaPhongBan, cancellationToken);
                    //     lstMaCha.Add(maCha);
                    //    //var lstMaDV = input.MaPhongBan.Split('.').ToList();
                    //    //lstMaCha.Add(lstMaDV[0]);
                    //}
                    //else if (input.MaPhongBan.Split('.').Length == 3)
                    //{
                    //    var lstMaDV = input.MaPhongBan.Split('.').ToList();
                    //    lstMaCha.Add(lstMaDV[0] + "." + lstMaDV[1]);
                    //    lstMaCha.Add(lstMaDV[0]);
                    //    //lstMaCha.Add("000.00." + lstMaDV[2] + "." + lstMaDV[3]);
                    //    //lstMaCha.Add("000.00.00." + lstMaDV[3]);
                    //}
                    //else
                    //{
                    //    var lstMaDV = input.MaPhongBan.Split('.').ToList();
                    //    lstMaCha.Add(lstMaDV[0] + "." + lstMaDV[1] + "." + lstMaDV[2]);
                    //    lstMaCha.Add(lstMaDV[0] + "." + lstMaDV[1]);
                    //    lstMaCha.Add(lstMaDV[0]);
                    //    //lstMaCha.Add("000." + lstMaDV[1] + "." + lstMaDV[2] + "." + lstMaDV[3]);
                    //    //lstMaCha.Add("000.00." + lstMaDV[2] + "." + lstMaDV[3]);
                    //    //lstMaCha.Add("000.00.00." + lstMaDV[3]);
                    //}
                }
                var ngayHT = DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss");

                if (input.MaDonVi != input.MaPhongBan)
                {
                    string query = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai,TongSoCongViec,CongViecChuaHoanThanh,CongViecDangXuLy,CongViecDaHoanThanh FROM Business.DuLieuThongKes ";
                    string where = $" WHERE ID > 0 and MaDonVi = '{input.MaPhongBan}'";
                    where += $" and ThoiGianQuery = {input.ThoiGianQuery}";
                    where += $" and LoaiThongKe = N'Nhóm'";
                    string whereOrder = $" ORDER BY ID DESC";
                    var itemDV = await _dapperRepository.QueryFirstOrDefaultAsync<DuLIeuThongKeDto>(query + where + whereOrder);
                    if (itemDV != null)
                    {
                        var propUpdateCVXoa = "";
                        switch (request.XuLy)
                        {
                            case "Xoa":
                                propUpdateCVXoa = "";
                                if (trangThai == "Đã đánh giá")
                                {
                                    if (itemDV.TongSoDaXepLoai > 0) itemDV.TongSoDaXepLoai = itemDV.TongSoDaXepLoai - 1;
                                    propUpdateCVXoa += $"TongSoDaXepLoai = {itemDV.TongSoDaXepLoai},";
                                    if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                    {
                                        if (itemDV.DanhGiaLoaiA > 0) itemDV.DanhGiaLoaiA = itemDV.DanhGiaLoaiA - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiA = {itemDV.DanhGiaLoaiA},";
                                    }
                                    if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                    {
                                        if (itemDV.DanhGiaLoaiD > 0) itemDV.DanhGiaLoaiD = itemDV.DanhGiaLoaiD - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiD = {itemDV.DanhGiaLoaiD},";
                                    }
                                    if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                    {
                                        if (itemDV.DanhGiaLoaiC > 0) itemDV.DanhGiaLoaiC = itemDV.DanhGiaLoaiC - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiC = {itemDV.DanhGiaLoaiC},";
                                    }
                                    if (phanLoai == "Loại B- Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                    {
                                        if (itemDV.DanhGiaLoaiB > 0) itemDV.DanhGiaLoaiB = itemDV.DanhGiaLoaiB - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiB = {itemDV.DanhGiaLoaiB},";
                                    }

                                }
                                if (itemDV.TongSoTuDanhGia > 0) itemDV.TongSoTuDanhGia = itemDV.TongSoTuDanhGia - 1;
                                propUpdateCVXoa += $"TongSoTuDanhGia = {itemDV.TongSoTuDanhGia},";
                                propUpdateCVXoa += $"LastModifiedOn = GETDATE()";
                                string whereUpdateXoa = $" WHERE Id = '{itemDV.Id}'";
                                var sqlQueryXoa = " UPDATE Business.DuLieuThongKes SET " + propUpdateCVXoa + whereUpdateXoa;
                                await _dapperRepository.ExcuteAsync(sqlQueryXoa, itemDV);
                                //CapNhatDonViCha
                                if (lstMaCha.Count > 0)
                                {
                                    string maCha = string.Join(",", lstMaCha);
                                    string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                    string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={input.ThoiGianQuery}";
                                    var thongKeLstAll = await _dapperRepository.QueryAsync<DuLIeuThongKeDto>(queryDLTK + whereDLTK);
                                    if (thongKeLstAll.Count > 0)
                                    {
                                        foreach (var itemDG in thongKeLstAll)
                                        {
                                            var propUpdateItmCV = "";
                                            if (itemDG.TongSoTuDanhGia > 0) itemDG.TongSoTuDanhGia = itemDG.TongSoTuDanhGia - 1;
                                            propUpdateItmCV += $"TongSoTuDanhGia = {itemDG.TongSoTuDanhGia},";
                                            if (trangThai == "Đã đánh giá")
                                            {
                                                if (itemDG.TongSoDaXepLoai > 0) itemDG.TongSoDaXepLoai = itemDG.TongSoDaXepLoai - 1;
                                                propUpdateItmCV += $"TongSoDaXepLoai = {itemDG.TongSoDaXepLoai},";
                                                if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                                {
                                                    if (itemDG.DanhGiaLoaiA > 0) itemDG.DanhGiaLoaiA = itemDG.DanhGiaLoaiA - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiA = {itemDG.DanhGiaLoaiA},";
                                                }
                                                if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                                {
                                                    if (itemDG.DanhGiaLoaiD > 0) itemDG.DanhGiaLoaiD = itemDG.DanhGiaLoaiD - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiD = {itemDG.DanhGiaLoaiD},";
                                                }
                                                if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                                {
                                                    if (itemDG.DanhGiaLoaiC > 0) itemDG.DanhGiaLoaiC = itemDG.DanhGiaLoaiC - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiC = {itemDG.DanhGiaLoaiC},";
                                                }
                                                if (phanLoai == "Loại B- Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                                {
                                                    if (itemDG.DanhGiaLoaiB > 0) itemDG.DanhGiaLoaiB = itemDG.DanhGiaLoaiB - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiB = {itemDG.DanhGiaLoaiB},";
                                                }

                                            }
                                            propUpdateItmCV += $"LastModifiedOn = GETDATE()";
                                            string whereUpdateCV = $" WHERE Id = '{itemDG.Id}'";
                                            var sqlQueryCV = "UPDATE  Business.DuLieuThongKes  SET " + propUpdateItmCV + whereUpdateCV;
                                            await _dapperRepository.ExcuteAsync(sqlQueryCV, itemDG);
                                        }
                                    }
                                }
                                break;

                            case "ThuHoi":
                                propUpdateCVXoa = "";
                                if (trangThai == "Đã đánh giá")
                                {
                                    if (itemDV.TongSoDaXepLoai > 0) itemDV.TongSoDaXepLoai = itemDV.TongSoDaXepLoai - 1;
                                    propUpdateCVXoa += $"TongSoDaXepLoai = {itemDV.TongSoDaXepLoai},";
                                    if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                    {
                                        if (itemDV.DanhGiaLoaiA > 0) itemDV.DanhGiaLoaiA = itemDV.DanhGiaLoaiA - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiA = {itemDV.DanhGiaLoaiA},";
                                    }
                                    if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                    {
                                        if (itemDV.DanhGiaLoaiD > 0) itemDV.DanhGiaLoaiD = itemDV.DanhGiaLoaiD - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiD = {itemDV.DanhGiaLoaiD},";
                                    }
                                    if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                    {
                                        if (itemDV.DanhGiaLoaiC > 0) itemDV.DanhGiaLoaiC = itemDV.DanhGiaLoaiC - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiC = {itemDV.DanhGiaLoaiC},";
                                    }
                                    if (phanLoai == "Loại B- Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                    {
                                        if (itemDV.DanhGiaLoaiB > 0) itemDV.DanhGiaLoaiB = itemDV.DanhGiaLoaiB - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiB = {itemDV.DanhGiaLoaiB},";
                                    }

                                }
                                //if (itemDV.TongSoTuDanhGia > 0) itemDV.TongSoTuDanhGia = itemDV.TongSoTuDanhGia - 1;
                                //propUpdateCVXoa += $"TongSoTuDanhGia = {itemDV.TongSoTuDanhGia},";
                                propUpdateCVXoa += $"LastModifiedOn = GETDATE()";
                                string whereUpdateTH = $" WHERE Id = '{itemDV.Id}'";
                                var sqlQueryTH = "UPDATE " + "Business.DuLieuThongKes" + " SET " + propUpdateCVXoa + whereUpdateTH;
                                //this._db.Execute(sqlQueryTH, itemDV);
                                await _dapperRepository.ExcuteAsync(sqlQueryTH, itemDV);
                        //CapNhatDonViCha
                        if (lstMaCha.Count > 0)
                                {
                                    string maCha = string.Join(",", lstMaCha);
                                    string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                    string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={input.ThoiGianQuery}";
                                    var thongKeLstAll = await _dapperRepository.QueryAsync<DuLieuThongKe>(queryDLTK + whereDLTK);
                                    if (thongKeLstAll.Count > 0)
                                    {
                                        foreach (var itemDG in thongKeLstAll)
                                        {
                                            var propUpdateItmCV = "";
                                            //if (itemDG.TongSoTuDanhGia > 0) itemDG.TongSoTuDanhGia = itemDG.TongSoTuDanhGia - 1;
                                            //propUpdateItmCV += $"TongSoTuDanhGia = {itemDG.TongSoTuDanhGia},";
                                            if (trangThai == "Đã đánh giá")
                                            {
                                                if (itemDG.TongSoDaXepLoai > 0) itemDG.TongSoDaXepLoai = itemDG.TongSoDaXepLoai - 1;
                                                propUpdateItmCV += $"TongSoDaXepLoai = {itemDG.TongSoDaXepLoai},";
                                                if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                                {
                                                    if (itemDG.DanhGiaLoaiA > 0) itemDG.DanhGiaLoaiA = itemDG.DanhGiaLoaiA - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiA = {itemDG.DanhGiaLoaiA},";
                                                }
                                                if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                                {
                                                    if (itemDG.DanhGiaLoaiD > 0) itemDG.DanhGiaLoaiD = itemDG.DanhGiaLoaiD - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiD = {itemDG.DanhGiaLoaiD},";
                                                }
                                                if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                                {
                                                    if (itemDG.DanhGiaLoaiC > 0) itemDG.DanhGiaLoaiC = itemDG.DanhGiaLoaiC - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiC = {itemDG.DanhGiaLoaiC},";
                                                }
                                                if (phanLoai == "Loại B- Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                                {
                                                    if (itemDG.DanhGiaLoaiB > 0) itemDG.DanhGiaLoaiB = itemDG.DanhGiaLoaiB - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiB = {itemDG.DanhGiaLoaiB},";
                                                }

                                            }
                                            propUpdateItmCV += $"LastModifiedOn = GETDATE()";
                                            string whereUpdateCV = $" WHERE Id = '{itemDG.Id}'";
                                            var sqlQueryCV = "UPDATE Business.DuLieuThongKes SET " + propUpdateItmCV + whereUpdateCV;
                                           //await _dapperRepository.Execute(sqlQueryCV, itemDG);
                                            await _dapperRepository.ExcuteAsync(sqlQueryCV, itemDG);
                                }
                                    }
                                }
                                 break;

                            case "KhoiPhuc":
                                propUpdateCVXoa = "";
                                if (trangThai == "Đã đánh giá")
                                {
                                    if (itemDV.TongSoDaXepLoai < itemDV.TongSoCanBo)
                                        itemDV.TongSoDaXepLoai = itemDV.TongSoDaXepLoai + 1;
                                    propUpdateCVXoa += $"TongSoDaXepLoai = {itemDV.TongSoDaXepLoai},";
                                    if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                    {
                                        if (itemDV.DanhGiaLoaiA < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiA = itemDV.DanhGiaLoaiA + 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiA = {itemDV.DanhGiaLoaiA},";
                                    }
                                    if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                    {
                                        if (itemDV.DanhGiaLoaiD < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiD = itemDV.DanhGiaLoaiD + 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiD = {itemDV.DanhGiaLoaiD},";
                                    }
                                    if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                    {
                                        if (itemDV.DanhGiaLoaiC < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiC = itemDV.DanhGiaLoaiC + 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiC = {itemDV.DanhGiaLoaiC},";
                                    }
                                    if (phanLoai == "Loại B- Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                    {
                                        if (itemDV.DanhGiaLoaiB < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiB = itemDV.DanhGiaLoaiB + 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiB = {itemDV.DanhGiaLoaiB},";
                                    }

                                }
                                if (itemDV.TongSoTuDanhGia < itemDV.TongSoCanBo) itemDV.TongSoTuDanhGia = itemDV.TongSoTuDanhGia + 1;
                                propUpdateCVXoa += $"TongSoTuDanhGia = {itemDV.TongSoTuDanhGia},";
                                propUpdateCVXoa += $"LastModifiedOn = GETDATE()";
                                string whereUpdateKP = $" WHERE Id = '{itemDV.Id}'";
                                var sqlQueryKP = "UPDATE Business.DuLieuThongKes SET " + propUpdateCVXoa + whereUpdateKP;
                            //await _dapperRepository.Execute(sqlQueryKP, itemDV);
                            await _dapperRepository.ExcuteAsync(sqlQueryKP, itemDV);
                            //CapNhatDonViCha
                            if (lstMaCha.Count > 0)
                                {
                                    string maCha = string.Join(",", lstMaCha);
                                    string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                    string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={input.ThoiGianQuery}";
                                var thongKeLstAll = await _dapperRepository.QueryAsync<DuLIeuThongKeDto>(queryDLTK + whereDLTK);
                               
                                    if (thongKeLstAll.Count > 0)
                                    {
                                        foreach (var itemDG in thongKeLstAll)
                                        {
                                            var propUpdateItmCV = "";
                                            if (itemDG.TongSoTuDanhGia < itemDG.TongSoCanBo)
                                                itemDG.TongSoTuDanhGia = itemDG.TongSoTuDanhGia + 1;
                                            propUpdateItmCV += $"TongSoTuDanhGia = {itemDG.TongSoTuDanhGia},";
                                            if (trangThai == "Đã đánh giá")
                                            {
                                                if (itemDG.TongSoDaXepLoai < itemDG.TongSoCanBo) itemDG.TongSoDaXepLoai = itemDG.TongSoDaXepLoai + 1;
                                                propUpdateItmCV += $"TongSoDaXepLoai = {itemDG.TongSoDaXepLoai},";
                                                if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                                {
                                                    if (itemDG.DanhGiaLoaiA < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiA = itemDG.DanhGiaLoaiA + 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiA = {itemDG.DanhGiaLoaiA},";
                                                }
                                                if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                                {
                                                    if (itemDG.DanhGiaLoaiD < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiD = itemDG.DanhGiaLoaiD - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiD = {itemDG.DanhGiaLoaiD},";
                                                }
                                                if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                                {
                                                    if (itemDG.DanhGiaLoaiC < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiC = itemDG.DanhGiaLoaiC + 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiC = {itemDG.DanhGiaLoaiC},";
                                                }
                                                if (phanLoai == "Loại B- Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                                {
                                                    if (itemDG.DanhGiaLoaiB < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiB = itemDG.DanhGiaLoaiB + 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiB = {itemDG.DanhGiaLoaiB},";
                                                }

                                            }
                                            propUpdateItmCV += $"LastModifiedOn = GETDATE()";
                                            string whereUpdateCV = $" WHERE Id = '{itemDG.Id}'";
                                            var sqlQueryCV = "UPDATE Business.DuLieuThongKes SET " + propUpdateItmCV + whereUpdateCV;
                                           //await _dapperRepository.Execute(sqlQueryCV, itemDG);
                                        await _dapperRepository.ExcuteAsync(sqlQueryCV, itemDG);
                                    }
                                    }
                                }
                                break;
                        }
                    }
                }
                else
                {
                    string query = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai,TongSoCongViec,CongViecChuaHoanThanh,CongViecDangXuLy,CongViecDaHoanThanh FROM Business.DuLieuThongKes";
                    string where = $" WHERE ID > 0 and MaDonVi = '{input.MaPhongBan}'";
                    where += $" and ThoiGianQuery = {input.ThoiGianQuery}";
                    where += $" and LoaiThongKe = N'Đơn vị'";
                    string whereOrder = $" ORDER BY ID DESC";
                    var itemDV = await _dapperRepository.QueryFirstOrDefaultAsync<DuLIeuThongKeDto>(query + where + whereOrder);
                    if (itemDV != null)
                    {
                        var propUpdateCVXoa = "";
                        switch (request.XuLy)
                        {
                            case "Xoa":
                                propUpdateCVXoa = "";
                                if (trangThai == "Đã đánh giá")
                                {
                                    if (itemDV.TongSoDaXepLoai > 0) itemDV.TongSoDaXepLoai = itemDV.TongSoDaXepLoai - 1;
                                    propUpdateCVXoa += $"TongSoDaXepLoai = {itemDV.TongSoDaXepLoai},";
                                    if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                    {
                                        if (itemDV.DanhGiaLoaiA > 0) itemDV.DanhGiaLoaiA = itemDV.DanhGiaLoaiA - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiA = {itemDV.DanhGiaLoaiA},";
                                    }
                                    if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                    {
                                        if (itemDV.DanhGiaLoaiD > 0) itemDV.DanhGiaLoaiD = itemDV.DanhGiaLoaiD - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiD = {itemDV.DanhGiaLoaiD},";
                                    }
                                    if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                    {
                                        if (itemDV.DanhGiaLoaiC > 0) itemDV.DanhGiaLoaiC = itemDV.DanhGiaLoaiC - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiC = {itemDV.DanhGiaLoaiC},";
                                    }
                                    if (phanLoai == "Loại B- Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                    {
                                        if (itemDV.DanhGiaLoaiB > 0) itemDV.DanhGiaLoaiB = itemDV.DanhGiaLoaiB - 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiB = {itemDV.DanhGiaLoaiB},";
                                    }

                                }
                                if (itemDV.TongSoTuDanhGia > 0) itemDV.TongSoTuDanhGia = itemDV.TongSoTuDanhGia - 1;
                                propUpdateCVXoa += $"TongSoTuDanhGia = {itemDV.TongSoTuDanhGia}";
                                propUpdateCVXoa += $"LastModifiedOn = GETDATE()";
                                string whereUpdateXoa = $" WHERE Id = '{itemDV.Id}'";
                                var sqlQueryXoa = "UPDATE Business.DuLieuThongKes SET " + propUpdateCVXoa + whereUpdateXoa;
                               await _dapperRepository.ExcuteAsync(sqlQueryXoa, itemDV);
                                //CapNhatDonViCha
                                if (lstMaCha.Count > 0)
                                {
                                    string maCha = string.Join(",", lstMaCha);
                                    string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                    string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={input.ThoiGianQuery}";
                                    var thongKeLstAll = await _dapperRepository.QueryAsync<DuLIeuThongKeDto>(queryDLTK + whereDLTK);
                                    if (thongKeLstAll.Count > 0)
                                    {
                                        foreach (var itemDG in thongKeLstAll)
                                        {
                                            var propUpdateItmCV = "";
                                            if (itemDG.TongSoTuDanhGia > 0) itemDG.TongSoTuDanhGia = itemDG.TongSoTuDanhGia - 1;
                                            propUpdateItmCV += $"TongSoTuDanhGia = {itemDG.TongSoTuDanhGia},";
                                            if (trangThai == "Đã đánh giá")
                                            {
                                                if (itemDG.TongSoDaXepLoai > 0) itemDG.TongSoDaXepLoai = itemDG.TongSoDaXepLoai - 1;
                                                propUpdateItmCV += $"TongSoDaXepLoai = {itemDG.TongSoDaXepLoai},";
                                                if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                                {
                                                    if (itemDG.DanhGiaLoaiA > 0) itemDG.DanhGiaLoaiA = itemDG.DanhGiaLoaiA - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiA = {itemDG.DanhGiaLoaiA},";
                                                }
                                                if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                                {
                                                    if (itemDG.DanhGiaLoaiD > 0) itemDG.DanhGiaLoaiD = itemDG.DanhGiaLoaiD - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiD = {itemDG.DanhGiaLoaiD},";
                                                }
                                                if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                                {
                                                    if (itemDG.DanhGiaLoaiC > 0) itemDG.DanhGiaLoaiC = itemDG.DanhGiaLoaiC - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiC = {itemDG.DanhGiaLoaiC},";
                                                }
                                                if (phanLoai == "Loại B- Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                                {
                                                    if (itemDG.DanhGiaLoaiB > 0) itemDG.DanhGiaLoaiB = itemDG.DanhGiaLoaiB - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiB = {itemDG.DanhGiaLoaiB},";
                                                }

                                            }
                                            propUpdateItmCV += $"LastModifiedOn = GETDATE()";
                                            string whereUpdateCV = $" WHERE Id = '{itemDG.Id}'";
                                            var sqlQueryCV = "UPDATE Business.DuLieuThongKes SET " + propUpdateItmCV + whereUpdateCV;
                                           await _dapperRepository.ExcuteAsync(sqlQueryCV, itemDG);
                                        }
                                    }
                                }
                                break;
                            case "KhoiPhuc":
                                propUpdateCVXoa = "";
                                if (trangThai == "Đã đánh giá")
                                {
                                    if (itemDV.TongSoDaXepLoai < itemDV.TongSoCanBo) itemDV.TongSoDaXepLoai = itemDV.TongSoDaXepLoai + 1;
                                    propUpdateCVXoa += $"TongSoDaXepLoai = {itemDV.TongSoDaXepLoai},";
                                    if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                    {
                                        if (itemDV.DanhGiaLoaiA < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiA = itemDV.DanhGiaLoaiA + 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiA = {itemDV.DanhGiaLoaiA},";
                                    }
                                    if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                    {
                                        if (itemDV.DanhGiaLoaiD < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiD = itemDV.DanhGiaLoaiD + 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiD = {itemDV.DanhGiaLoaiD},";
                                    }
                                    if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                    {
                                        if (itemDV.DanhGiaLoaiC < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiC = itemDV.DanhGiaLoaiC + 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiC = {itemDV.DanhGiaLoaiC},";
                                    }
                                    if (phanLoai == "Loại B- Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                    {
                                        if (itemDV.DanhGiaLoaiB < itemDV.TongSoCanBo) itemDV.DanhGiaLoaiB = itemDV.DanhGiaLoaiB + 1;
                                        propUpdateCVXoa += $"DanhGiaLoaiB = {itemDV.DanhGiaLoaiB},";
                                    }

                                }
                                if (itemDV.TongSoTuDanhGia < itemDV.TongSoCanBo) itemDV.TongSoTuDanhGia = itemDV.TongSoTuDanhGia + 1;
                                propUpdateCVXoa += $"TongSoTuDanhGia = {itemDV.TongSoTuDanhGia},";
                                propUpdateCVXoa += $"LastModifiedOn = GETDATE()";
                                string whereUpdateKP = $" WHERE Id = '{itemDV.Id}'";
                                var sqlQueryKP = "UPDATE Business.DuLieuThongKes SET " + propUpdateCVXoa + whereUpdateKP;
                               await _dapperRepository.ExcuteAsync(sqlQueryKP, itemDV);
                                //CapNhatDonViCha
                                if (lstMaCha.Count > 0)
                                {
                                    string maCha = string.Join(",", lstMaCha);
                                    string queryDLTK = "SELECT ID,DanhGiaLoaiA,DanhGiaLoaiB,DanhGiaLoaiC,DanhGiaLoaiD,TongSoCanBo,TongSoTuDanhGia,TongSoDaXepLoai FROM Business.DuLieuThongKes";
                                    string whereDLTK = $" WHERE CHARINDEX(MaDonVi,'{maCha}')>0 and DeletedOn IS NULL and ThoiGianQuery={input.ThoiGianQuery}";
                                    var thongKeLstAll = await _dapperRepository.QueryAsync<DuLIeuThongKeDto>(queryDLTK + whereDLTK);
                                    if (thongKeLstAll.Count > 0)
                                    {
                                        foreach (var itemDG in thongKeLstAll)
                                        {
                                            var propUpdateItmCV = "";
                                            if (itemDG.TongSoTuDanhGia < itemDG.TongSoCanBo)
                                                itemDG.TongSoTuDanhGia = itemDG.TongSoTuDanhGia + 1;
                                            propUpdateItmCV += $"TongSoTuDanhGia = {itemDG.TongSoTuDanhGia},";
                                            if (trangThai == "Đã đánh giá")
                                            {
                                                if (itemDG.TongSoDaXepLoai < itemDG.TongSoCanBo)
                                                    itemDG.TongSoDaXepLoai = itemDG.TongSoDaXepLoai + 1;
                                                propUpdateItmCV += $"TongSoDaXepLoai = {itemDG.TongSoDaXepLoai},";
                                                if (phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ" || phanLoai == "Loại A - Hoàn thành xuất sắc nhiệm vụ")
                                                {
                                                    if (itemDG.DanhGiaLoaiA < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiA = itemDG.DanhGiaLoaiA + 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiA = {itemDG.DanhGiaLoaiA},";
                                                }
                                                if (phanLoai == "Loại D - Không hoàn thành nhiệm vụ" || phanLoai == "Không hoàn thành nhiệm vụ (xếp loại D)")
                                                {
                                                    if (itemDG.DanhGiaLoaiD < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiD = itemDG.DanhGiaLoaiD - 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiD = {itemDG.DanhGiaLoaiD},";
                                                }
                                                if (phanLoai == "Loại C - Hoàn thành nhiệm vụ" || phanLoai == "Hoàn thành nhiệm vụ (xếp loại C)")
                                                {
                                                    if (itemDG.DanhGiaLoaiC < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiC = itemDG.DanhGiaLoaiC + 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiC = {itemDG.DanhGiaLoaiC},";
                                                }
                                                if (phanLoai == "Loại B- Hoàn thành tốt nhiệm vụ" || phanLoai == "Hoàn thành tốt nhiệm vụ (xếp loại B)")
                                                {
                                                    if (itemDG.DanhGiaLoaiB < itemDG.TongSoCanBo) itemDG.DanhGiaLoaiB = itemDG.DanhGiaLoaiB + 1;
                                                    propUpdateItmCV += $"DanhGiaLoaiB = {itemDG.DanhGiaLoaiB},";
                                                }

                                            }
                                            propUpdateItmCV += $"LastModifiedOn = GETDATE()";
                                            string whereUpdateCV = $" WHERE Id = '{itemDG.Id}'";
                                            var sqlQueryCV = $"UPDATE Business.DuLieuThongKes SET " + propUpdateItmCV + whereUpdateCV;
                                            await _dapperRepository.ExcuteAsync(sqlQueryCV, itemDG);
                                        }
                                    }
                                }
                                break;
                        }
                    }
                }
            }
            return (Result)Result.Success();
        }
        catch (Exception ex)
        {
            return (Result)Result.Fail(ex.Message);
        }
    }
    private async Task<string> GetMaCha(string groupcode, CancellationToken cancellationToken)
    {
        var userSql2 = $@"SELECT OfGroupCode FROM [Catalog].[Groups] WHERE [GroupCode] = @GroupCode and Active=1 and DeletedOn IS NULL";
        return await _dapperRepository.QueryFirstOrDefaultObjectAsync<string>(userSql2, new { GroupCode = groupcode });
    }
}
