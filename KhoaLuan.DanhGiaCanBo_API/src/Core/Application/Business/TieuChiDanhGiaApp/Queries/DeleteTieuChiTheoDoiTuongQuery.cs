using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp.Queries;
public class DeleteTieuChiTheoDoiTuongQuery : IQuery<TieuChiDanhGia>
{
     public Guid Id { get; set; }

}
