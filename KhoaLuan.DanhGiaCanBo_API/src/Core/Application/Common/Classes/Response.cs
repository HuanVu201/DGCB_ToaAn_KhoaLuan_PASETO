namespace TD.DanhGiaCanBo.Application.Common.Classes;
public class Result
{
    public string userMessage { get; set; }
    public string internalMessage { get; set; }
    public int code { get; set; }
    public Result()
    {
        this.userMessage = string.Empty;
        this.internalMessage = string.Empty;
        this.code = 200;
    }
    public Result(int code, string userMessage, string internalMessage)
    {
        this.userMessage = userMessage;
        this.internalMessage = internalMessage;
        this.code = code;
    }
}