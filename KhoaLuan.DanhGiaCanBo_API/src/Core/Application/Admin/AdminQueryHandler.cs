using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Admin;
public class AdminQueryHandler : IRequestHandler<AdminQueryRequest,object>
{
    public Task<object> Handle(AdminQueryRequest request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
