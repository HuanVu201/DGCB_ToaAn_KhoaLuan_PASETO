using TD.DanhGiaCanBo.Infrastructure.Multitenancy;

namespace TD.DanhGiaCanBo.Infrastructure.Persistence.Initialization;

internal interface IDatabaseInitializer
{
    Task InitializeDatabasesAsync(CancellationToken cancellationToken);
    Task InitializeApplicationDbForTenantAsync(TDTenantInfo tenant, CancellationToken cancellationToken);
}