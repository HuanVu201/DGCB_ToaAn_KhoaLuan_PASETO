namespace TD.DanhGiaCanBo.Application.Common.Format;
public interface ICurrency: ITransientService
{
    string NumberToCurrencyText(int amoun);
    string GetCurrency(int value, string separate = ",");
}
