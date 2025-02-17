using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Catalog.GroupApp.Queries;
public sealed record GetByCodeQuery(string groupCode) : IQuery<GroupDto>;

