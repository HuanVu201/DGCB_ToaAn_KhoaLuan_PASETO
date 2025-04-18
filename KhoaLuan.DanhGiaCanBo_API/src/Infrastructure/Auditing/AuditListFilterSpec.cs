﻿using Ardalis.Specification;
using TD.DanhGiaCanBo.Application.Auditing;
using TD.DanhGiaCanBo.Application.Common.Specification;

namespace TD.DanhGiaCanBo.Infrastructure.Auditing;

public class AuditListFilterSpec : EntitiesByBaseFilterSpec<Trail>
{
    public AuditListFilterSpec(AuditListFilter request)
        : base(request)
    {
        DateTime? tmpFromDate = null;
        if (request.FromDate.HasValue)
        {
            tmpFromDate = GetDateZeroTime(request.FromDate.Value);
        }

        DateTime? tmpToDate = null;
        if (request.ToDate.HasValue)
        {
            tmpToDate = GetDateZeroTime(request.ToDate.Value.AddDays(1));
        }

        Query
           .Where(p => p.UserId == request.UserId, request.UserId.HasValue)
           .Where(p => p.DateTime >= tmpFromDate, tmpFromDate.HasValue)
           .Where(p => p.DateTime < tmpToDate, tmpToDate.HasValue)
       ;
    }

    public static DateTime GetDateZeroTime(DateTime date)
    {
        return new DateTime(date.Year, date.Month, date.Day, 0, 0, 0);
    }

}