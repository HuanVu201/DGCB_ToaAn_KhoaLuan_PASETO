using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Catalog.LogAuthen.Queries;

public class DeleteLogAuThenQuery : IRequest<Result>
{
    [JsonIgnore]
    public Guid Id { get; set; }
}