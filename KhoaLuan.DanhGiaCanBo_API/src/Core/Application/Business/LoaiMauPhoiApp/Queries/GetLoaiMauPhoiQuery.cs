using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.LoaiMauPhoiApp.Queries;
public sealed record GetLoaiMauPhoiQuery(Guid Id) : IQuery<LoaiMauPhoi>;