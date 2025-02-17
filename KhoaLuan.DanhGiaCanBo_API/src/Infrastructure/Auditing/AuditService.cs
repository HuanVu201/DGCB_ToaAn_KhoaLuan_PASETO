using TD.DanhGiaCanBo.Application.Auditing;
using TD.DanhGiaCanBo.Infrastructure.Persistence.Context;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Ardalis.Specification.EntityFrameworkCore;
using TD.DanhGiaCanBo.Application.Common.Exceptions;
using TD.DanhGiaCanBo.Application.Common.Models;

namespace TD.DanhGiaCanBo.Infrastructure.Auditing;

public class AuditService : IAuditService
{
    private readonly ApplicationDbContext _context;

    public AuditService(ApplicationDbContext context) => _context = context;

    public async Task<List<AuditDto>> GetUserTrailsAsync(Guid userId)
    {
        var trails = await _context.AuditTrails
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.DateTime)
            .Take(250)
            .ToListAsync();

        return trails.Adapt<List<AuditDto>>();
    }

    public async Task<PaginationResponse<AuditDto>> SearchAsync(AuditListFilter filter, CancellationToken cancellationToken)
    {

        var spec = new AuditListPaginationFilterSpec(filter);
        var specc = new AuditListFilterSpec(filter);

        var users = await _context.AuditTrails
            .WithSpecification(spec)
            .ProjectToType<AuditDto>()
            .ToListAsync(cancellationToken);
        int count = await _context.AuditTrails
            .WithSpecification(specc)
            .CountAsync(cancellationToken);

        return new PaginationResponse<AuditDto>(users, count, filter.PageNumber, filter.PageSize);
    }

    public async Task<bool> DeleteAsync(Guid? id, CancellationToken cancellationToken)
    {
        var item = await _context.AuditTrails
           .AsNoTracking()
           .Where(u => u.Id == id)
           .FirstOrDefaultAsync(cancellationToken);

        _ = item ?? throw new NotFoundException("Audit Not Found.");

        _context.AuditTrails.Remove(item);
        await _context.SaveChangesAsync(cancellationToken);

        return true;

    }
}