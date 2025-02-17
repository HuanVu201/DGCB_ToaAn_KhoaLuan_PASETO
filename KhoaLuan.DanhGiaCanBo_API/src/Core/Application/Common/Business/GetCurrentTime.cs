namespace TD.DanhGiaCanBo.Application.Common.Business;
public class GetCurrentTime
{
    public static DateTime Get(DateTime time)
    {
        TimeZoneInfo vietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
        DateTime currentTime = TimeZoneInfo.ConvertTimeFromUtc(time, vietnamTimeZone);
        return currentTime;
    }
}
