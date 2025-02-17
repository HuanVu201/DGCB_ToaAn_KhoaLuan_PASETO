using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Catalog;

namespace TD.DanhGiaCanBo.Application.Catalog.TaiLieuHDSDApp.Queries;
public sealed record GetTaiLieuHDSDQuery(DefaultIdType Id) : IQuery<TaiLieuHDSD>;

