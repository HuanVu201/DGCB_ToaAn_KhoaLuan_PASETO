﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.GiaHanDanhGiaApp.Queries;
public sealed record GetGiaHanDanhGiaQuery(Guid Id) : IQuery<GiaHanDanhGia>;