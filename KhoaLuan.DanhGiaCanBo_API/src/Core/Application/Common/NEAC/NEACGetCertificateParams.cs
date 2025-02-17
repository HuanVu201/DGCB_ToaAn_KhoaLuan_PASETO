using System.Runtime.InteropServices;

namespace TD.DanhGiaCanBo.Application.Common.NEAC;
public class NEACGetCertificateRequest
{
    /// <summary>
    /// Số CCCD/CMND/Hộ chiếu/Mã số thuế/ của cá nhân/tổ chức muốn đăng nhập
    /// </summary>
    public string user_id { get; set; }
    /// <summary>
    /// Tên của CA công cộng mà cá nhân/tổ chức đăng ký. (Tham chiếu tên tại url: https://neac.gov.vn/vi/ca-cong-cong/)
    /// </summary>
    public string ca_name { get; set; }
}

public class NEACGetCertificateResponse
{
    /// <summary>
    /// Mã request thành công hoặc mã lỗi tương ứng. VD: 200, 500…
    /// </summary>
    public int status_code { get; set; }
    /// <summary>
    /// Thông điệp thành công hoặc thông điệp lỗi tương ứng với mã trạng thái ở status_code.
    /// </summary>
    public string message { get; set; }

    public NEACGetUserCertificateResponse data { get; set; }
}

public class NEACGetUserCertificateResponse
{
    public List<NEACUserCertificateResponse> user_certificates { get; set; }
}

public class NEACUserCertificateResponse
{
    /// <summary>
    /// Định danh chứng thư số (còn gọi là cert alias)
    /// </summary>
    public string cert_id { get; set; }
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
}