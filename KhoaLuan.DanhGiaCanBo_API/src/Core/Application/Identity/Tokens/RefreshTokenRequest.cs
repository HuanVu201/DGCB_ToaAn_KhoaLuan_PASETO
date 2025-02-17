namespace TD.DanhGiaCanBo.Application.Identity.Tokens;

public record RefreshTokenRequest(string Token, string RefreshToken);

public record class RefreshUserGroupTokenRequest : RefreshTokenRequest
{
    public DefaultIdType UserGroupId { get; init; }
    public RefreshUserGroupTokenRequest(string Token, string RefreshToken, DefaultIdType userGroupId) : base(Token, RefreshToken)
    {
        UserGroupId = userGroupId;
    }
}