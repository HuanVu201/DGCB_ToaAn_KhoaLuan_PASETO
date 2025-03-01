﻿using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using TD.DanhGiaCanBo.Application.Common.Persistence;
using TD.DanhGiaCanBo.Domain.Common.Contracts;
using TD.DanhGiaCanBo.Infrastructure.Persistence.Context;
using Mapster;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;

namespace TD.DanhGiaCanBo.Infrastructure.Persistence.Repository;

// Inherited from Ardalis.Specification's RepositoryBase<T>
public class ApplicationDbRepository<T> : RepositoryBase<T>, IReadRepository<T>, IRepository<T>
    where T : class, IAggregateRoot
{
    public ApplicationDbRepository(ApplicationDbContext dbContext)
        : base(dbContext)
    {
    }

    public Task AddAsync(PostTieuChiTheoDoiTuongQuery request)
    {
        throw new NotImplementedException();
    }

    // We override the default behavior when mapping to a dto.
    // We're using Mapster's ProjectToType here to immediately map the result from the database.
    // This is only done when no Selector is defined, so regular specifications with a selector also still work.
    protected override IQueryable<TResult> ApplySpecification<TResult>(ISpecification<T, TResult> specification) =>
        specification.Selector is not null
            ? base.ApplySpecification(specification)
            : ApplySpecification(specification, false)
                .ProjectToType<TResult>();
}