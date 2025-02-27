using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Infrastructure.Auth.PASETO;
public class PasetoSettings : IValidatableObject
{
    public string Key { get; set; } = string.Empty;

    public int TokenExpirationInMinutes { get; set; }

    public int RefreshTokenExpirationInDays { get; set; }
    public string PublicKeyDVC { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.IsNullOrEmpty(Key))
        {
            yield return new ValidationResult("No Key defined in PasetoSettings config", new[] { nameof(Key) });
        }
    }
}