using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp.Queries;
using TD.DanhGiaCanBo.Application.Business.MauPhoiApp;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
public class GetUrlPhieuDanhGiaQueryHandler : IRequestHandler<GetUrlPhieuDanhGiaQuery, UrlPhieuDanhGiaDto>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly ICurrentUser _currentUser;
    private readonly IMediator _mediator;
    public GetUrlPhieuDanhGiaQueryHandler(IDapperRepository dapperRepository, ICurrentUser currentUser, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _currentUser = currentUser;
        _mediator = mediator;
    }

    public async Task<UrlPhieuDanhGiaDto> Handle(GetUrlPhieuDanhGiaQuery request, CancellationToken cancellationToken)
    {
        string sql = @"SELECT [UrlDocx], [UrlPdf]
                        FROM [Business].[DanhGias]
                        WHERE Id = @Id AND DeletedOn is null";

        var res = await _dapperRepository.QueryFirstOrDefaultAsync<UrlPhieuDanhGiaDto>(sql, new { Id = request.Id });

        return new UrlPhieuDanhGiaDto
        {
            UrlPdf = res.UrlPdf,
            UrlDocx = res.UrlDocx,
        };
    }
}