using System.Text.RegularExpressions;
using TD.DanhGiaCanBo.Application.Common.Format;

namespace TD.DanhGiaCanBo.Infrastructure.Common.Extensions;
public class Currency : ICurrency
{

    public string GetCurrency(int value, string separate = ",")
    {
        return Regex.Replace(value.ToString(), @"(?<=\d)(?=(\d{3})+$)", separate);
    }

    public string NumberToCurrencyText(int number)
    {
        string[] units = { "", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ" };
        string[] ones = { "", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín" };
        string[] tens = { "", "mười", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi" };

        string ConvertGroupOfThree(int num)
        {
            string text = "";
            int hundred = num / 100;
            int ten = (num % 100) / 10;
            int one = num % 10;

            if (hundred > 0)
            {
                text += ones[hundred] + " trăm ";
            }

            if (ten == 0 && one == 0)
            {
                return text.Trim();
            }

            if (ten == 0)
            {
                if (hundred != 0)
                {
                    text += "linh ";
                }
            }
            else if (ten == 1)
            {
                text += "mười ";
            }
            else
            {
                text += tens[ten] + " ";
            }

            if (ten != 1 && one != 0)
            {
                text += ones[one] + " ";
            }

            return text.Trim();
        }

        if (number == 0)
        {
            return "Không đồng";
        }

        string text = "";
        int groupIndex = 0;
        bool hasValue = false;

        while (number > 0)
        {
            int group = number % 1000;
            string groupText = ConvertGroupOfThree(group);

            if (groupText != "")
            {
                hasValue = true;
                text = groupText + " " + units[groupIndex] + " " + text;
            }

            number = number / 1000;
            groupIndex++;
        }

        if (!hasValue)
        {
            return "không đồng";
        }

        return char.ToUpper(text[0]) + text.Substring(1).Trim() + " đồng";
    }
}
