using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.KhieuNaiDanhGiaApp.Queries;
public sealed record GetKhieuNaiDanhGiaQuery(Guid Id) : IQuery<KhieuNaiDanhGia>;