using System.ComponentModel.DataAnnotations;

namespace TD.DanhGiaCanBo.Domain.Catalog;
public class Config : AuditableEntity<DefaultIdType>, IAggregateRoot
{
    [MaxLength(150)]
    public string Ten { get; private set; }

    public string Code { get; private set; }
    public int ThuTu { get; private set; } = 1;
    public bool Active { get; private set; } = true;
    public string Module { get; private set; }
    public string? Content { get; private set; }
    public string? Note { get; private set; }
    public Config() { }

    public Config(string ten, string code, int thuTu, bool active, string module, string? content, string? note)
    {
        Ten = ten;
        Code = code;
        ThuTu = thuTu;
        Active = active;
        Module = module;
        Content = content;
        Note = note;
    }

    public static Config Create(string ten, string code, int thuTu, bool active, string module, string? content, string? note)
    {
        return new(ten, code, thuTu, active, module, content, note);
    }

    public Config Update(string? ten, string? code, int? thuTu, bool? active, string? module, string? content, string? note)
    {
        if (!string.IsNullOrEmpty(ten) )
            Ten = ten;
        if (!string.IsNullOrEmpty(code))
            Code = code;
        if (thuTu != null)
            ThuTu = (int)thuTu;
        if (active != null)
            Active = (bool)active;
        if (!string.IsNullOrEmpty(module) )
            Module = module;
        if (!string.IsNullOrEmpty(content))
            Content = content;
        if (!string.IsNullOrEmpty(note) )
            Note = note;

        return this;
    }
    public Config SoftDelete()
    {
        DeletedOn = DateTime.UtcNow;
        return this;
    }

    public Config Restore()
    {
        DeletedOn = null;
        return this;
    }
}

public class ConfigConstant
{
    public const string FileConfig = "file_upload";
}
