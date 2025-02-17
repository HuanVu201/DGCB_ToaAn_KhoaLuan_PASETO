using System.Text.RegularExpressions;

namespace TD.DanhGiaCanBo.Application.Common.Extensions;

public static class RegexExtensions
{
    private static readonly Regex Whitespace = new(@"\s+");
    private static readonly Regex SpecialCharacter = new(@"[^a-zA-Z0-9_.]+");


    public static string ReplaceWhitespace(this string input, string replacement)
    {
        return Whitespace.Replace(input, replacement);
    }

    public static string RemoveSpecialCharacters(this string input, string replacement)
    {
        //return Regex.Replace(str, "[^a-zA-Z0-9_.]+", string.Empty, RegexOptions.Compiled);
        return SpecialCharacter.Replace(input, replacement);
    }

    public static string RemoveDiacritics(this string input)
    {
        string[] diacritics = new string[]
        {
            "áàảãạâấầẩẫậăắằẳẵặ",
            "éèẻẽẹêếềểễệ",
            "íìỉĩị",
            "óòỏõọôốồổỗộơớờởỡợ",
            "úùủũụưứừửữự",
            "ýỳỷỹỵ",
            "đ",
            "ÁÀẢÃẠÂẤẦẨẪẬĂẮẰẲẴẶ",
            "ÉÈẺẼẸÊẾỀỂỄỆ",
            "ÍÌỈĨỊ",
            "ÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢ",
            "ÚÙỦŨỤƯỨỪỬỮỰ",
            "ÝỲỶỸỴ",
            "Đ"
        };

        string[] noDiacritics = new string[]
        {
            "a",
            "e",
            "i",
            "o",
            "u",
            "y",
            "d",
            "A",
            "E",
            "I",
            "O",
            "U",
            "Y",
            "D"
        };
        for (int i = 0; i < diacritics.Length; i++)
        {
            input = Regex.Replace(input, $"[{diacritics[i]}]", noDiacritics[i]);
        }
        return input;
    }
}