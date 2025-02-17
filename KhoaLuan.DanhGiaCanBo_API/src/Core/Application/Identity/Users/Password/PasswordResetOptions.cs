namespace TD.CitizenAPI.Application.Identity.Users.Password;

public class PasswordResetOptions
{
    public string UserName { get; set; } // Tên người dùng
    public string? Password { get; set; } // Mật khẩu mới

    // Các yêu cầu mật khẩu
    public string MinLength { get; set; }  // Độ dài tối thiểu
    public bool RequireUppercase { get; set; } = false; // Chứa chữ hoa
    public bool RequireLowercase { get; set; } = false;// Chứa chữ thường
    public bool RequireDigit { get; set; } = false;// Chứa chữ số
    public bool RequireSpecialCharacter { get; set; } = false; // Chứa ký tự đặc biệt
    public bool DisallowUsernameInPassword { get; set; } = false; // Không chứa tên tài khoản trong mật khẩu
    public bool DisallowEmailInPassword { get; set; } = false;// Không chứa email trong mật khẩu

    public bool DisallowFullNameInPassword { get; set; } = false; // Không chứ full name trong pass

    public bool DisallowDateOfBirthInPassword { get; set; } = false;// Không chứ sinh nhật

    public bool DisallowNumberPhoneInPassword { get; set; } = false; // Không chứa sdt

    public string maxFailedLoginAttempts { get; set; }  // số lần đăng nhập sai liên tiếp sẽ khóa tài khoản

    public string passwordExpiryTime { get; set; } // thời gian yêu cầu phải thay đổi mật khẩu

    public bool passwordNotEqualToOld { get; set; } = false;// mật khẩu mới không trùng mật khẩu cũ
}