namespace TD.DanhGiaCanBo.Infrastructure.Zalo;
public class ZaloSetting
{
    public string urlZaloAPI { get; set; }
    public string urlZaloGetUserAPI { get; set; }
    public string urlZaloGetToken { get; set; }

    public string urlHCC { get; set; }
    public string urlImageOA { get; set; }
    public string urlBackgroundOA { get; set; }
    public string urlHuongDanTraCuu { get; set; }
    public string urlLogoOA { get; set; }

    public string maCauHinh { get; set; }
    public string appId { get; set; }
    public string secretKey { get; set; }
    public string idTemplateTraCuuHoSo { get; set; }
    public bool usingTemplate { get; set; }
    public string ctaLinkHostName { get; set; }
    public bool enableRefreshToken { get; set; }
    public bool enable { get; set; } = false;
}

public class ZaloToken
{
    public string access_token { get; set; }
    public string refresh_token { get; set; }
    public string expires_in { get; set; }
}

public class GetZaloConfigSelect
{
    public string Content { get; set; }
}

public class GetUserIdZaloResponse
{
    public ZaloUserData data { get; set; }
    public int error { get; set; }
}

public class ZaloUserData
{
    public string user_id { get; set; }
}