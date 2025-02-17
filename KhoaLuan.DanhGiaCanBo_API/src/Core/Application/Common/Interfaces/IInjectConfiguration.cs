namespace TD.DanhGiaCanBo.Application.Common.Interfaces;
public interface IInjectConfiguration : ITransientService
{
    public T? GetValue<T>(string key);
}
