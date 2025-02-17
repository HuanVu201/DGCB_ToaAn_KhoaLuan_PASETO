using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;

public class UpdateLanhDaoDaXemDGDVQuery : PaginationFilter, IRequest<PaginationResponse<DanhGiaDonViDto>>
{
    [MaxLength(200)]
    public string ID { get; set; }
    [MaxLength(100)]
    public string DaXem { get; set; }
    [JsonIgnore]
    public bool? ReFetch { get; set; } = false;
    public new int PageSize { get; set; } = 10;
    public new int PageNumber { get; set; } = 1;
}
