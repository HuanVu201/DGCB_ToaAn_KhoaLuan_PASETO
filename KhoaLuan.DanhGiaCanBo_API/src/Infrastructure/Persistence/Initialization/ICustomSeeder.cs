namespace TD.DanhGiaCanBo.Infrastructure.Persistence.Initialization;

public interface ICustomSeeder
{
    Task InitializeAsync(CancellationToken cancellationToken);
}