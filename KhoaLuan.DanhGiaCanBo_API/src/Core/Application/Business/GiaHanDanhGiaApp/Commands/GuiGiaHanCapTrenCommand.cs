using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Business.GiaHanDanhGiaApp.Commands;
public class GuiGiaHanCapTrenCommand : IRequest<Result>
{
    public List<DefaultIdType> Ids { get; set; } = new List<DefaultIdType>();
}