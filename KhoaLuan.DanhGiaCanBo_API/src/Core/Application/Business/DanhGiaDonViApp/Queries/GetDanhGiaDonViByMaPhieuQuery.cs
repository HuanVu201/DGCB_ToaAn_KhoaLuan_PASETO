using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaDonViApp.Queries;
public sealed record GetDanhGiaDonViByMaPhieuQuery(Guid maPhieu) : IQuery<DanhGiaDonVi>;