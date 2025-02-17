using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Infrastructure.Utilities;
public static class ProtectString
{
    /// <summary>
    /// Encrypts the given plaintext using a randomly generated salt and the provided entropy string.
    /// </summary>
    /// <param name="plainText">The plaintext to be encrypted.</param>
    /// <param name="entropyString">The entropy string to be used in the encryption process.</param>
    /// <returns>The encrypted text, which includes the salt and the encrypted data.</returns>
    public static string EncryptString(string plainText, string entropyString)
    {
        byte[] salt = new byte[16];
        using (RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider())
        {
            rng.GetBytes(salt);
        }

        byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);
        byte[] entropyBytes = Encoding.UTF8.GetBytes(entropyString);

        byte[] combinedBytes = new byte[salt.Length + entropyBytes.Length];
        salt.CopyTo(combinedBytes, 0);
        entropyBytes.CopyTo(combinedBytes, salt.Length);

        byte[] encryptedBytes = ProtectedData.Protect(plainBytes, combinedBytes, DataProtectionScope.LocalMachine);
        string saltBase64 = Convert.ToBase64String(salt);
        string encryptedText = $"{saltBase64}:{Convert.ToBase64String(encryptedBytes)}";
        return encryptedText;
    }
    /// <summary>
    /// Decrypts a string that was encrypted using the ProtectedData class.
    /// </summary>
    /// <param name="encryptedText">The encrypted string.</param>
    /// <param name="entropyString">The entropy string used during encryption.</param>
    /// <returns>The decrypted string.</returns>
    public static string DecryptString(string encryptedText, string entropyString)
    {
        // Split the encrypted string into its parts.
        string[] parts = encryptedText.Split(':');
        string saltBase64 = parts[0];
        string encryptedBytesBase64 = parts[1];

        // Decode the salt and encrypted bytes.
        byte[] salt = Convert.FromBase64String(saltBase64);
        byte[] encryptedBytes = Convert.FromBase64String(encryptedBytesBase64);

        // Get the entropy bytes.
        byte[] entropyBytes = Encoding.UTF8.GetBytes(entropyString);

        // Combine the salt and entropy bytes.
        byte[] combinedBytes = new byte[salt.Length + entropyBytes.Length];
        Array.Copy(salt, 0, combinedBytes, 0, salt.Length);
        Array.Copy(entropyBytes, 0, combinedBytes, salt.Length, entropyBytes.Length);

        // Decrypt the data.
        byte[] plainBytes = ProtectedData.Unprotect(encryptedBytes, combinedBytes, DataProtectionScope.LocalMachine);

        // Convert the decrypted bytes to a string.
        string plainText = Encoding.UTF8.GetString(plainBytes);

        return plainText;
    }
}
