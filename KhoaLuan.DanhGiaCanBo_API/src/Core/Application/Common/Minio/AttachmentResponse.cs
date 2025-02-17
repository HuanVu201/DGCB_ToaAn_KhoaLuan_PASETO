namespace TD.DanhGiaCanBo.Application.Common.Minio;

public class AttachmentResponse
{
    public string Name { get; set; }
    public string? Type { get; set; }
    public string? Url { get; set; }
    public decimal? Size { get; set; }
}

public class StreamDataFile
{
    public Stream StreamData{ get; set; }
    public string ContentType{ get; set; }
}

public class GetDataSignatureResponse
{
    public string Name { get; set; }
    public DateTime Date { get; set; }
    public string SubjectDN { get; set; }
    public string IssuerDN { get; set; }
}

public class Base64DataFile
{
    public string Name { get; set; }
    public string Base64 { get; set; }
    public Stream StreamData { get; set; }
    public string ContentType { get; set; }

}

public class VerifyDigitalSinatureResponse
{
    public bool HasDigitalSinature { get; set; }
    public IReadOnlyList<string> DigitalSignatureFiles { get; set; }
    public IReadOnlyList<string> NormalFiles { get; set; }
}

public class FileRes
{
    public string FileName { get; set; }
    public byte[] ByteRes { get; set; }
    public string ContentType { get; set; }
}