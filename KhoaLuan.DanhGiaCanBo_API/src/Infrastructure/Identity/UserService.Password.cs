using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Common.Mailing;
using TD.DanhGiaCanBo.Application.Identity.Users.Password;
using Microsoft.AspNetCore.WebUtilities;
using TD.CitizenAPI.Application.Identity.Users.Password;
using System.Data;
using TD.DanhGiaCanBo.Domain.Catalog;
using TD.DanhGiaCanBo.Application.Common.Models;
using TD.DanhGiaCanBo.Domain.Identity;
using TD.DanhGiaCanBo.Shared.Authorization;
using Microsoft.IdentityModel.Tokens;
using TD.DanhGiaCanBo.Application.Common.Interfaces;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Application.Common.Business;
using DocumentFormat.OpenXml.Bibliography;
using System.Text;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;

internal partial class UserService
{
    public async Task<string> ForgotPasswordAsync(ForgotPasswordRequest request, string origin)
    {
        EnsureValidTenant();

        var user = await _userManager.FindByEmailAsync(request.Email.Normalize());
        if (user is null || !await _userManager.IsEmailConfirmedAsync(user))
        {
            // Don't reveal that the user does not exist or is not confirmed
            throw new InternalServerException(_t["An Error has occurred!"]);
        }

        // For more information on how to enable account confirmation and password reset please
        // visit https://go.microsoft.com/fwlink/?LinkID=532713
        string code = await _userManager.GeneratePasswordResetTokenAsync(user);
        const string route = "account/reset-password";
        var endpointUri = new Uri(string.Concat($"{origin}/", route));
        string passwordResetUrl = QueryHelpers.AddQueryString(endpointUri.ToString(), "Token", code);
        var mailRequest = new MailRequest(
            new List<string> { request.Email },
            _t["Reset Password"],
            _t[$"Your Password Reset Token is '{code}'. You can reset your password using the {endpointUri} Endpoint."]);
        _jobService.Enqueue(() => _mailService.SendAsync(mailRequest, CancellationToken.None));

        return _t["Password Reset Mail has been sent to your authorized Email."];
    }

    public async Task<string> ResetPasswordAsync(ResetPasswordRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email?.Normalize()!);

        // Don't reveal that the user does not exist
        _ = user ?? throw new InternalServerException(_t["An Error has occurred!"]);

        var result = await _userManager.ResetPasswordAsync(user, request.Token!, request.Password!);

        return result.Succeeded
            ? _t["Password Reset Successful!"]
            : throw new InternalServerException(_t["An Error has occurred!"]);
    }

    public async Task ChangePasswordAsync(ChangePasswordRequest model, string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        _ = user ?? throw new NotFoundException(_t["User Not Found."]);

        var result = await _userManager.ChangePasswordAsync(user, model.Password, model.NewPassword);

        if (!result.Succeeded)
        {
            throw new InternalServerException(_t["Change password failed"], result.GetErrors(_t));
        }
        else
        {
            // Cập nhật trường ForcePasswordChange để yêu cầu người dùng thay đổi mật khẩu trong lần đăng nhập tiếp theo
            user.ForcePasswordChange = false;  // Cập nhật trường ForcePasswordChange
            var updateResult = await _userManager.UpdateAsync(user);  // Lưu lại thay đổi

            if (!updateResult.Succeeded)
            {
                throw new InternalServerException("Không thể cập nhật yêu cầu thay đổi mật khẩu.");
            }
        }
    }
    public async Task<bool> AdminChangePasswordAsync(AdminResetPasswordRequest request)
    {
       
        if (string.IsNullOrWhiteSpace(request.UserName))
        {
            throw new InternalServerException("An Error has occurred!");
        }

        var account = await _userManager.FindByNameAsync(request.UserName);

        if (account == null) throw new InternalServerException($"No Accounts Registered.");
        string resetToken = await _userManager.GeneratePasswordResetTokenAsync(account);

        var result = await _userManager.ResetPasswordAsync(account, resetToken, request.Password);

        if (result.Succeeded)
        {
            return true;
        }
        else
        {
            throw new InternalServerException($"Error occured while reseting the password.");
        }
    }
    public async Task<Result> AdminResetPasswordAsync(string id)
    {
        Result res = new Result();
       
        if (string.IsNullOrEmpty(id))
        {
            throw new InternalServerException("An Error has occurred!");
        }

        var account = await _userManager.FindByIdAsync(id);

        if (account == null) throw new InternalServerException($"No Accounts Registered.");
        // get default password
        var defaultPassword = _commonServices.Get();
        if (defaultPassword == null && string.IsNullOrEmpty(defaultPassword.DefaultPassword)) throw new NoNullAllowedException($"default password is not founded!");
        
        string resetToken = await _userManager.GeneratePasswordResetTokenAsync(account);
        
        var result = await _userManager.ResetPasswordAsync(account, resetToken, defaultPassword.DefaultPassword);
        var unlock = await _userManager.SetLockoutEnabledAsync(account, true);
        if (result.Succeeded)
        {
            res.Succeeded = true;
            res.Message = defaultPassword.DefaultPassword;
            return res;
        }
        else
        {
            throw new InternalServerException($"Error occured while reseting the password.");
        }
    }

    public async Task<string> DeleteAsync(string id)
    {
        var user = await _userManager.FindByIdAsync(id);

        _ = user ?? throw new NotFoundException(_t["User Not Found"]);
        user.SoftDelete(_currentUser.GetUserId());
        await _userManager.UpdateAsync(user);
        //var currentTime = GetCurrentTime.Get(DateTime.UtcNow);
        //var currentUser = _currentUser.GetUserId();
        //await _events.PublishAsync(new ApplicationUserDeletedEvent(user.Id));
        //var log = new LogDeletedUser(Guid.Parse(user.Id), user.FullName,user.UserName, user.TypeUser, user.GroupCode, user.GroupName, user.OfficeCode, user.OfficeName, user.PositionCode, user.PositionName, user.SoDinhDanh,
        //    user.SoCMND, user.GioiTinh, user.DanToc, user.TonGiao, user.NgayThangNamSinh, user.NoiDangKyKhaiSinh, user.QueQuan, user.ThuongTru, user.NoiOHienTai, user.Cha, user.Me, user.VoChong,
        //    user.NguoiDaiDien, user.ChuHo, user.HoVaTen, user.SoSoHoKhau, user.MaDinhDanhOfficeCode, user.ChucDanh, currentTime, currentUser);
        //await _repositoryLogDeletedUser.AddAsync(log);

        return string.Format(_t["User {0} Deleted."], user.UserName);
    }

    public async Task<Result> AdminResetPasswordWithValidationAsync(PasswordResetOptions options)
    {
        Result res = new Result();

        // Kiểm tra tên người dùng
        if (string.IsNullOrWhiteSpace(options.UserName))
        {
            throw new InternalServerException("Tên người dùng không hợp lệ.");
        }

        // Tìm tài khoản người dùng theo tên
        var account = await _userManager.FindByNameAsync(options.UserName);
        if (account == null)
        {
            throw new InternalServerException($"Không tìm thấy tài khoản với tên người dùng {options.UserName}.");
        }

        // Nếu không có mật khẩu được cung cấp, tạo mật khẩu mới tự động

        // Sinh mật khẩu mới từ yêu cầu
        string newPassword = GenerateRandomPassword(options); // Tạo mật khẩu mới
        // Kiểm tra mật khẩu theo các yêu cầu

        //if (!IsValidPassword(newPassword, account.UserName, account.Email, options))
        //{
        //    throw new InternalServerException("Mật khẩu không hợp lệ theo yêu cầu bảo mật.");
        //}

        // Sinh token reset mật khẩu
        string resetToken = await _userManager.GeneratePasswordResetTokenAsync(account);

        // Tiến hành reset mật khẩu
        var result = await _userManager.ResetPasswordAsync(account, resetToken, newPassword);

        if (result.Succeeded)
        {
            // Cập nhật trường ForcePasswordChange để yêu cầu người dùng thay đổi mật khẩu trong lần đăng nhập tiếp theo
            account.ForcePasswordChange = true;  // Cập nhật trường ForcePasswordChange
            var updateResult = await _userManager.UpdateAsync(account);  // Lưu lại thay đổi

            if (!updateResult.Succeeded)
            {
                throw new InternalServerException("Không thể cập nhật yêu cầu thay đổi mật khẩu.");
            }

            // Đăng xuất người dùng khỏi tất cả các thiết bị (xóa token đăng nhập hiện tại)
            await _signInManager.SignOutAsync();  // Đảm bảo người dùng phải đăng nhập lại
            res.Succeeded = true;
            res.Message = $"{newPassword}";
            return res;
        }
        else
        {
            throw new InternalServerException($"Có lỗi xảy ra khi reset mật khẩu. {result}");
        }
    }
    private bool IsValidPassword(string password, string username, string email, PasswordResetOptions options)
    {
        // Kiểm tra độ dài tối thiểu
        if (password.Length < int.Parse(options.MinLength))
        {
            throw new ArgumentException($"Mật khẩu phải có ít nhất {options.MinLength} ký tự.");
        }

        // Kiểm tra chữ hoa
        if (options.RequireUppercase && !password.Any(char.IsUpper))
        {
            throw new ArgumentException("Mật khẩu phải chứa ít nhất một chữ hoa.");
        }

        // Kiểm tra chữ thường
        if (options.RequireLowercase && !password.Any(char.IsLower))
        {
            throw new ArgumentException("Mật khẩu phải chứa ít nhất một chữ thường.");
        }

        // Kiểm tra chữ số
        if (options.RequireDigit && !password.Any(char.IsDigit))
        {
            throw new ArgumentException("Mật khẩu phải chứa ít nhất một chữ số.");
        }

        // Kiểm tra ký tự đặc biệt
        if (options.RequireSpecialCharacter && !password.Any(ch => "!@#$%^&*()_+[]{}|;:,.<>?".Contains(ch)))
        {
            throw new ArgumentException("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");
        }

        // Kiểm tra không chứa tên người dùng trong mật khẩu
        if (options.DisallowUsernameInPassword && password.Contains(username, StringComparison.OrdinalIgnoreCase))
        {
            throw new ArgumentException("Mật khẩu không được chứa tên người dùng.");
        }

        // Kiểm tra không chứa email trong mật khẩu
        if (options.DisallowEmailInPassword && password.Contains(email, StringComparison.OrdinalIgnoreCase))
        {
            throw new ArgumentException("Mật khẩu không được chứa email.");
        }

        return true; // Nếu tất cả các kiểm tra đều hợp lệ
    }
    private string GenerateRandomPassword(PasswordResetOptions options)
    {
        const string upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const string lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
        const string specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
        const string digits = "0123456789";

        Random random = new Random();
        StringBuilder password = new StringBuilder();

        // Đảm bảo mật khẩu có các yếu tố bắt buộc
        if (options.RequireUppercase)
        {
            password.Append(upperCaseChars[random.Next(upperCaseChars.Length)]);
        }
        if (options.RequireLowercase)
        {
            password.Append(lowerCaseChars[random.Next(lowerCaseChars.Length)]);
        }
        if (options.RequireSpecialCharacter)
        {
            password.Append(specialChars[random.Next(specialChars.Length)]);
        }
        if (options.RequireDigit)
        {
            password.Append(digits[random.Next(digits.Length)]);
        }
        // Tạo phần còn lại của mật khẩu sao cho đủ dài theo yêu cầu
        int remainingLength = int.Parse(options.MinLength) - password.Length;
        string allChars = upperCaseChars + lowerCaseChars + specialChars + digits;
        for (int i = 0; i < remainingLength; i++)
        {
            password.Append(allChars[random.Next(allChars.Length)]);
        }

        // Xáo trộn mật khẩu để tránh trùng pattern (mật khẩu không bị predictable)
        return new string(password.ToString().ToCharArray().OrderBy(c => random.Next()).ToArray());
    }
}