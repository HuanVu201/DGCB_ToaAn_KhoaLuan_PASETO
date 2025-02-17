namespace TD.DanhGiaCanBo.Application.Common.NEAC;
public class NEACSignFileRequest
{
    /// <summary>
    /// Số CCCD/CMND/Hộ chiếu/Mã số thuế/ của cá nhân/tổ chức muốn đăng nhập
    /// </summary>
    public string user_id { get; set; }
    /// <summary>
    /// Tên của CA công cộng mà cá nhân/tổ chức đăng ký. (Tham chiếu tên tại url: https://neac.gov.vn/vi/ca-cong-cong/)
    /// </summary>
    public string ca_name { get; set; }
    /// <summary>
    /// Dữ liệu chứng thư số (dạng base64)
    /// </summary>
    public string cert_data { get; set; }
    /// <summary>
    /// Số xê-ri của chứng thư số
    /// </summary>
    public string serial_number { get; set; }
    /// <summary>
    /// Mã định danh giao dịch khởi tạo bởi Cổng eSign
    /// </summary>
    public string transaction_id { get; set; }
    /// <summary>
    /// Danh sách tệp cần ký (nên ký 1 tệp 1 lần để đảm bảo hiệu năng tốt nhất)
    /// </summary>
    public List<NEACSignFile> sign_files { get; set; }
}

public class NEACSignFileResponse
{
    /// <summary>
    /// Mã request thành công hoặc mã lỗi tương ứng. VD: 200, 500…
    /// </summary>
    public int status_code { get; set; }
    /// <summary>
    /// Thông điệp thành công hoặc thông điệp lỗi tương ứng với mã trạng thái ở status_code.
    /// </summary>
    public string message { get; set; }
    /// <summary>
    /// Số xê-ri của chứng thư số yêu cầu ký(ở tham số đầu vào)
    /// </summary>
    public string serial_number { get; set; }
    /// <summary>
    /// Mã định danh giao dịch khởi tạo bởi Cổng eSign
    /// </summary>
    public string transaction_id { get; set; }
    /// <summary>
    /// Danh sách tệp đã ký
    /// </summary>
    public List<NEACSignFile> signFiles { get; set; }

}
public class NEACSignFileResponseWrapper
{
    public NEACSignFileResponse data { get; set; }
}


public class NEACSignFile
{
    /// <summary>
    /// Mã định danh tài liệu đã ký số 
    /// </summary>
    public string doc_id { get; set; }
    /// <summary>
    /// Tên tài liệu đã ký
    /// </summary>
    public string file_name { get; set; }
    /// <summary>
    /// Nội dung tài liệu đã ký dạng base64
    /// </summary>
    public string file_base64 { get; set; }
}