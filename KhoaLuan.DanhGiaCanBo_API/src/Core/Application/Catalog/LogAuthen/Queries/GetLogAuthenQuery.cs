using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAuthen.Queries;

public class GetLogAuthenQuery : IRequest<LogAuthenDetailDto>
{
    [JsonIgnore]
    public Guid Id { get; set; }
}