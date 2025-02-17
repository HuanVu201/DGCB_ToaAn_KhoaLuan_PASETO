

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.ActionApp;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;


public class TieuChiDanhGiaByMauPhieuDanhGiaDto : IDto
{
    /// <summary>
    ///  get danh sách tiêu chí theo mẫu phiếu
    ///  Phân loại đánh giá sẽ chưa idBoTieuChuan mà nó thuộc
    ///  Bộ tiêu chuẩn sẽ chưa các phân loại đánh giá 
    ///  Trong mẫu sẽ có danh sách bộ chuẩn của mẫu
    //   Tiêu chí đánh giá sẽ là con của 1 mẫu phiếu hoặc con của tiêu chí khác
    ///
    /// vậy thì get danh sách tiêu chí theo mẫu phiêu :
    /// sẽ nhận vào id của mẫu phiếu
    /// thì đơn giản tiêu chí sẽ là con của mẫu phiêu nên có 1 cái cây là con của mẫu phiếu
    /// danh sach phân loại đánh giá sẽ thuộc bộ tiêu chuẩn  bộ tiêu chuẩn sẽ thuộc mẫu phiếu
    /// </summary>
    public DefaultIdType Id { get; set; }
    [MaxLength(5000)]
    public string MaBoTieuChi { get; set; }  // Mã bộ tiêu chí 
    [MaxLength(100)]
    public string TenBoTieuChi { get; set; }
    public string LoaiThoiGian { get; set; }
    public string ThoiGian { get; set; }
    public List<LstPhanLoaiDanhGia>? DanhSachPhanLoaiDanhGia { get; set; } //Danh sách phân loại đánh giá
                                                                          // public List<LstTieuChi> DanhSachTieuChi { get; set; }  // danh sách tiêu chí con của mẫu phiếu
    public TieuChiDanhGiaNooTreeDto? DanhSachTieuChi { get; set; }
    public string CanhBao { get; set; }
    //Update

    [JsonIgnore]
    public int TotalCount { get; set; }
}

public class LstPhanLoaiDanhGia
{
    public Guid Id { get; set; }
    public string Ma { get; set; }

    public string Ten { get; set; }
    public string DiemToiThieu { get; set; }

    public string DiemToiDa { get; set; }
    public string BoTieuChuanID { get; set; }
}
public class LstTieuChi
{
    public Guid Id { get; set; }
    public string TenTieuChi { get; set; }

    public string MaTieuChi { get; set; }
    public string MaDayDu { get; set; }

    public string ThangDiem { get; set; }
    public string DiemDatYeuCau { get; set; }
    public int DiemThuong { get; set; }

    public int DiemTru { get; set; }
    public int KiemNhiem { get; set; }

    public string Level { get; set; }
    public List<LstTieuChi> DanhSachTieuChiCon { get; set; }
}