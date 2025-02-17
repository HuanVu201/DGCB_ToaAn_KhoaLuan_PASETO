using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using TD.DanhGiaCanBo.Domain.Common.Contracts;
using Dapper;
using System.Data;

namespace TD.LienThongDichVuCong.Application.Common.Persistence;
public static class DapperRepositoryExtensions
{
    
}

public class DateTimeHandler : SqlMapper.TypeHandler<DateTime>
{
    public override void SetValue(IDbDataParameter parameter, DateTime value)
    {
        parameter.Value = DateTime.SpecifyKind(value, DateTimeKind.Utc);
    }

    public override DateTime Parse(object value)
    {
        return DateTime.SpecifyKind((DateTime)value, DateTimeKind.Utc);
    }
}