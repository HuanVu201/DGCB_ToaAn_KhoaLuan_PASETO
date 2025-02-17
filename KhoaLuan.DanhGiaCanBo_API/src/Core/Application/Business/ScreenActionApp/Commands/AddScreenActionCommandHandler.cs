using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.ScreenActionApp.Commands;

public class ScreenActionValidator : CustomValidator<AddScreenActionParams>
{
    public ScreenActionValidator()
    {
        RuleFor(x => x.ScreenId).NotEmpty().WithMessage("ScreenId không hợp lệ");
        RuleFor(x => x.ActionId).NotEmpty().WithMessage("ActionId không hợp lệ");
    }
}
public class AddScreenActionCommandValidator: CustomValidator<AddScreenActionCommand>
{
    public AddScreenActionCommandValidator()
    {
        RuleForEach(x => x.ScreenActions).SetValidator(new ScreenActionValidator());
    }
}

public class AddScreenActionCommandHandler : ICommandHandler<AddScreenActionCommand>
{
    private readonly IRepositoryWithEvents<ScreenAction> _repositoryWithEvents;
    public AddScreenActionCommandHandler(IRepositoryWithEvents<ScreenAction> repositoryWithEvents) => _repositoryWithEvents = repositoryWithEvents;

    public async Task<Result> Handle(AddScreenActionCommand request, CancellationToken cancellationToken)
    {
        var screenActions = new List<ScreenAction>();
        request.ScreenActions.ForEach(item =>
        {
            var screenAction = ScreenAction.Create(item.ScreenId, item.ActionId);
            screenActions.Add(screenAction);
        });
        await _repositoryWithEvents.AddRangeAsync(screenActions, cancellationToken);
        return (Result)Result.Success();
    }
}
