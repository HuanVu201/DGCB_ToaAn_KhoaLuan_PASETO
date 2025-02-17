using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;

public class XoaDanhGiaChonQuery : ICommand
{
    public List<string> Ids { get; set; }
}
