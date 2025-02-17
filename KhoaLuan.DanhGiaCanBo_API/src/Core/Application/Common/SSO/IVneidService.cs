namespace TD.DanhGiaCanBo.Application.Common.SSO;
public interface IVneidService : ITransientService
{
    public Task<string?> KiemTraNguoiDungVneidAsync(UserInfoVneidRequest request);
    public Task<string?> GetTokenAsync(string accessToken, string? ipAddress, string? device = null);
}
