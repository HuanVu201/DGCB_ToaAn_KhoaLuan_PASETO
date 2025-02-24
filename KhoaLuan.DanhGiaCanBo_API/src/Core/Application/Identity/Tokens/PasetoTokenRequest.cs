using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Identity.Tokens;
public record PasetoTokenRequest(string? UserName, string? Email, string Password, string? SecurityCode);

public class PasetoTokenRequestValidator : CustomValidator<PasetoTokenRequest>
{
    public PasetoTokenRequestValidator(IStringLocalizer<PasetoTokenRequestValidator> T)
    {

        RuleFor(p => p).Must(x => !string.IsNullOrEmpty(x.UserName) || !string.IsNullOrEmpty(x.Email))
               .WithMessage(T["Username or Email is required."]);

        RuleFor(p => p.Email).Cascade(CascadeMode.Stop)
            .NotEmpty().When(x => !string.IsNullOrEmpty(x.Email))
            .EmailAddress()
                .WithMessage(T["Invalid Email Address."]);

        RuleFor(p => p.Password).Cascade(CascadeMode.Stop)
            .NotEmpty();
    }
}