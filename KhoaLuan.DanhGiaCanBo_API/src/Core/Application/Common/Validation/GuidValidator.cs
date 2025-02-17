namespace TD.DanhGiaCanBo.Application.Common.Validation;
public class GuidValidator : CustomValidator<Guid>
{
    public GuidValidator()
    {
        RuleFor(x => x).NotEmpty().NotNull();
    }
}
