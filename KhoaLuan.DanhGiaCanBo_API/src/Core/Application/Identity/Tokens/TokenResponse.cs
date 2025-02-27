namespace TD.DanhGiaCanBo.Application.Identity.Tokens;

public record TokenResponse(string Token, string RefreshToken, DateTime RefreshTokenExpiryTime);
public record GuestInfoResponse(string guestId, string typeUser);