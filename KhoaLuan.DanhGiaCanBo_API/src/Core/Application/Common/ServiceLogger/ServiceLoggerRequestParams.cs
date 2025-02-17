namespace TD.DanhGiaCanBo.Application.Common.ServiceLogger;
public class ServiceLoggerRequestParams
{
    public string Service { get; set; }
    public string? Sender { get; set; }
    public string? Receiver { get; set; }
    public bool isSucceed { get; set; }
    public string Request { get; set; }
    public string? Response { get; set; }
    public string MaHoSo { get; set; }
}


public static class ServiceLoggerServiceType
{
    public static string Email = "Email";
    public static string SMS = "SMS";
    public static string EMC = "EMC";
    public static string Zalo = "Zalo";
    public static string TBKM = "TBKM";
}