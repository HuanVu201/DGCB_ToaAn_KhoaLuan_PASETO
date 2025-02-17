namespace TD.DanhGiaCanBo.Application.Common.Sms;
public class SMSRequest
{
    public string soDienThoai { get; set; }
    public string noiDungthamSo { get; set; }
    public string? idMauTin { get; set; }
    public string? gioGui { get; set; }
    public string? maPhanMem { get; set; }
    public string? nhaMang { get; set; }
    public string MaHoSo { get; init; }
    public SMSRequest() { }
    public SMSRequest(string _soDienThoai, string _noiDungthamSo, string maHoSo)
    {
        soDienThoai = _soDienThoai;
        noiDungthamSo = _noiDungthamSo;
        MaHoSo = maHoSo;
    }
    public SMSRequest(string _soDienThoai, string _noiDungthamSo, string? _idMauTin, string? _gioGui, string? _maPhanMem, string? _nhaMang)
    {
        soDienThoai = _soDienThoai;
        noiDungthamSo = _noiDungthamSo;
        idMauTin = _idMauTin;
        gioGui = _gioGui;
        maPhanMem = _maPhanMem;
        nhaMang = _nhaMang;
    }
}
