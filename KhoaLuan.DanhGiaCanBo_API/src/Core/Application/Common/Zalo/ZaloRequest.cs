namespace TD.DanhGiaCanBo.Application.Common.Zalo;
public class ZaloRequest
{
    public string soDienThoaiChuHoSo { get; set; }
    public string NoiDung { get; set; }
    public string MaHoSo { get; set; }
    public ZaloRequest(string soDienThoaiChuHoSo, string noiDung, string maHoSo)
    {
        this.soDienThoaiChuHoSo = soDienThoaiChuHoSo;
        NoiDung = noiDung;
        MaHoSo = maHoSo;
    }
}


public class SendTemplateZalo
{
    public string? Banner { get; set; }
    public string SoDienThoai { get; set; }
    public string TenHoSo { get; set; }
    public string TenNguoiDan { get; set; }
    public string MaHoSo { get; set; }
    public string TrangThai { get; set; }
    public string TenDichVu { get; set; }
    public string LoiNhan { get; set; }
    public string CtaLink { get; set; }
    public string CtaIcon { get; set; }
    public string CtaText { get; set; }

    public SendTemplateZalo(string? banner, string soDienThoai, string tenHoSo, string tenNguoiDan, string maHoSo, string trangThai, string tenDichVu, string loiNhan, string ctaLink, string ctaIcon, string ctaText)
    {
        Banner = banner;
        SoDienThoai = soDienThoai;
        TenHoSo = tenHoSo;
        TenNguoiDan = tenNguoiDan;
        MaHoSo = maHoSo;
        TrangThai = trangThai;
        TenDichVu = tenDichVu;
        LoiNhan = loiNhan;
        CtaLink = ctaLink;
        CtaIcon = ctaIcon;
        CtaText = ctaText;
    }
}
public class Sender
{
    public string id { get; set; }
}
public class Recipient
{
    public string id { get; set; }
}
public class Message
{
    public List<Attachment> attachments { get; set; }
    public string text { get; set; }
    public string msg_id { get; set; }
}
public class Attachment
{
    public Payload payload { get; set; }
    public string type { get; set; }
}
public class Payload
{
    public string thumbnail { get; set; }
    public string url { get; set; }
    public Coordinates coordinates { get; set; }
    public string size { get; set; }
    public string name { get; set; }
    public string checksum { get; set; }
    public string type { get; set; }
}
public class Coordinates
{
    public string latitude { get; set; }
    public string longitude { get; set; }
}
public class Info
{
    public string address { get; set; }
    public long phone { get; set; }
    public string city { get; set; }
    public string district { get; set; }
    public string name { get; set; }
    public string ward { get; set; }
}
public class EventZalo
{
    public string event_name { get; set; }
    public string app_id { get; set; }
    public Sender sender { get; set; }
    public Recipient recipient { get; set; }
    public Message message { get; set; }
    public string timestamp { get; set; }
    public string user_id_by_app { get; set; }
    public Info info { get; set; }
}

public class SendRecipient
{
    public string user_id { get; set; }
    public SendRecipient()
    {
        this.user_id = string.Empty;
    }
    public SendRecipient(string user_id)
    {
        this.user_id = user_id;
    }
}
public class SendRecipientPhone
{
    public string phone { get; set; }
    public SendRecipientPhone()
    {
        this.phone = string.Empty;
    }
}
public class SendPayloadChild
{
    public string phone_code { get; set; }
    public SendPayloadChild()
    {
        this.phone_code = string.Empty;
    }
}
public class SendDefaultAction
{
    public string type { get; set; }
    public SendPayloadChild payload { get; set; }
    public SendDefaultAction()
    {
        this.payload = new SendPayloadChild();
        this.type = string.Empty;
    }

    public string url { get; set; }
}
public class SendTemplateData
{
    public string banner { get; set; }
    public string ten_nguoi_dan { get; set; }
    public string ma_ho_so { get; set; }
    public string trang_thai { get; set; }
    public string ten_dich_vu { get; set; }
    public string loi_nhan { get; set; }
    public string cta_link { get; set; }
    public string cta_icon { get; set; }
    public string cta_text { get; set; }
}
public class SendElement
{
    public string title { get; set; }
    public string subtitle { get; set; }
    public string image_url { get; set; }
    public string template_id { get; set; }
    public SendDefaultAction default_action { get; set; }
    public SendTemplateData template_data { get; set; }
    public string payload { get; set; }
    public SendElement()
    {
        this.default_action = new SendDefaultAction();
        this.title = string.Empty;
        this.subtitle = string.Empty;
        this.image_url = string.Empty;
    }
}

public class SendPayload
{
    public string template_type { get; set; }
    public List<SendElement> elements { get; set; }
    public SendPayload()
    {
        this.elements = new List<SendElement>();
        this.template_type = string.Empty;
    }
}

public class SendAttachment
{
    public string type { get; set; }
    public SendPayload payload { get; set; }
    public SendAttachment()
    {
        this.payload = new SendPayload();
        this.type = string.Empty;
    }
}

public class SendMessage
{
    public SendAttachment attachment { get; set; }
    public string text { get; set; }
    public SendMessage()
    {
        //this.attachment = new SendAttachment();
        this.text = string.Empty;
    }
    public SendMessage(string text)
    {
        this.text = text;
    }
    public SendMessage(SendAttachment attachment, string text)
    {
        this.attachment = attachment;
        this.text = text;
    }
}

public class SendZalo
{
    public SendRecipient recipient { get; set; }
    public SendMessage message { get; set; }
    public SendZalo()
    {
        this.recipient = new SendRecipient();
        this.message = new SendMessage();
    }
    public SendZalo(SendRecipient recipient, SendMessage message)
    {
        this.recipient = recipient;
        this.message = message;
    }
}
public class SendZaloPhone
{
    public SendRecipientPhone recipient { get; set; }
    public SendMessage message { get; set; }
    public SendZaloPhone()
    {
        this.recipient = new SendRecipientPhone();
        this.message = new SendMessage();
    }
}
public class SharedInfo
{
    public string address { get; set; }
    public string city { get; set; }
    public string district { get; set; }
    public string ward { get; set; }
    public long phone { get; set; }
    public string name { get; set; }
}

public class TagsAndNotesInfo
{
    public List<object> notes { get; set; }
    public List<object> tag_names { get; set; }
}

public class Data
{
    public string avatar { get; set; }
    public object avatars { get; set; }
    public int user_gender { get; set; }
    public string user_id { get; set; }
    public string user_id_by_app { get; set; }
    public string display_name { get; set; }
    public int birth_date { get; set; }
    public SharedInfo shared_info { get; set; }
    public TagsAndNotesInfo tags_and_notes_info { get; set; }
}

public class UserInfo
{
    public Data data { get; set; }
    public int error { get; set; }
    public string message { get; set; }
}

public class ZaloResponse
{
    public int error { get; set; }
    public string message { get; set; }
}



public class TokenZalo
{
    public string access_token { get; set; }
    public string refresh_token { get; set; }
    public string expires_in { get; set; }
}