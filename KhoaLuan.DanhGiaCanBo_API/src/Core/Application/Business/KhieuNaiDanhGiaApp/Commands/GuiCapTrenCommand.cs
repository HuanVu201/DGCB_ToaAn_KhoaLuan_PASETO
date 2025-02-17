using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Commands;
public class GuiCapTrenCommand : IRequest<Result>
{
    public List<DefaultIdType> Ids { get; set; } = new List<DefaultIdType>();
}