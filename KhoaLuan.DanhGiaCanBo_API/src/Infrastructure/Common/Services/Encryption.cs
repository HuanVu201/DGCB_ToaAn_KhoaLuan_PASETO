using System.Security.Cryptography;
using System.Text;

namespace TD.DanhGiaCanBo.Infrastructure.Common.Services;
public class Encryption
{
    public static string Crypt(string text)
    {
#pragma warning disable CA1416 // Validate platform compatibility
        return Convert.ToBase64String(ProtectedData.Protect(Encoding.Unicode.GetBytes(text), null, DataProtectionScope.LocalMachine));
#pragma warning restore CA1416 // Validate platform compatibility
    }

    public static string Decrypt(string text)
    {
#pragma warning disable CA1416 // Validate platform compatibility
        return Encoding.Unicode.GetString(ProtectedData.Unprotect(Convert.FromBase64String(text), null, DataProtectionScope.LocalMachine));
#pragma warning restore CA1416 // Validate platform compatibility
    }
}
