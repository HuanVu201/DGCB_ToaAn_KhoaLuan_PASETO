using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Infrastructure.Auth.PASETO;
public class SerializableClaim
{
    public string Type { get; set; }
    public string Value { get; set; }
    public string ValueType { get; set; }
    public string Issuer { get; set; }
    public string OriginalIssuer { get; set; }

    public static SerializableClaim FromClaim(Claim claim)
    {
        return new SerializableClaim
        {
            Type = claim.Type,
            Value = claim.Value,
            ValueType = claim.ValueType,
            Issuer = claim.Issuer,
            OriginalIssuer = claim.OriginalIssuer
        };
    }

    public Claim ToClaim()
    {
        return new Claim(Type, Value, ValueType, Issuer, OriginalIssuer);
    }
}