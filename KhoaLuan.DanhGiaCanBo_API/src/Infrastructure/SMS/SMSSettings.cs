namespace TD.DanhGiaCanBo.Infrastructure.SMS;
public class SMSSettings
{
    public List<string> Viettel { get; set; }
    public List<string> VinaPhone { get; set; }
    public List<string> MobilePhone { get; set; }
    public string UrlSendMessage { get; set; }
    public string TokenSendMessage { get; set; }
    public string TemplateId { get; set; }
}

