using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Application.Catalog.FileApp;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;


public class CopyTieuChiDanhGiaTuKhoQuery : IQuery<List<CopyTieuChiDanhGiaTuKhoDto>>
{
    public string Id { get; set; }
    public string FullCode { get; set; }
    public string? MaMauPhieuDanhGia { get; set; }
    public string? ParrentFullCode { get; set; }
    public bool? Removed { get; set; } = false;
}
