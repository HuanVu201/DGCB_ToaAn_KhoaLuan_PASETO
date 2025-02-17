using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Commands;
using TD.DanhGiaCanBo.Application.Business.DanhGiaApp.Queries;
using TD.DanhGiaCanBo.Application.Business.TrangThaiDanhGiaApp;
using TD.DanhGiaCanBo.Application.Identity.UserGroups;
using TD.DanhGiaCanBo.Application.Identity.Users.Dtos;
using TD.DanhGiaCanBo.Application.Identity.Users.UsersQueries;
using TD.DanhGiaCanBo.Application.Identity.VetXuLyDanhGia;
using TD.DanhGiaCanBo.Domain.Business;
using TD.DanhGiaCanBo.Domain.Constant;

namespace TD.DanhGiaCanBo.Application.Business.GiaHanDanhGiaApp.Commands;
public class GuiGiaHanCapTrenCommandHandler : IRequestHandler<GuiGiaHanCapTrenCommand, Result>
{
    private readonly IDapperRepository _dapperRepository;
    private readonly IVetXuLyDanhGiaService _vetXuLyDanhGiaService;
    private readonly ICurrentUser _currentUser;
    private readonly IRepositoryWithEvents<DanhGia> _repositoryWithEvents;
    private readonly IUserGroupService _userGroupService;
    private readonly IMediator _mediator;

    public GuiGiaHanCapTrenCommandHandler(IDapperRepository dapperRepository, IVetXuLyDanhGiaService vetXuLyDanhGiaService, ICurrentUser currentUser, IRepositoryWithEvents<DanhGia> repositoryWithEvents, IUserGroupService userGroupService, IMediator mediator)
    {
        _dapperRepository = dapperRepository;
        _vetXuLyDanhGiaService = vetXuLyDanhGiaService;
        _currentUser = currentUser;
        _repositoryWithEvents = repositoryWithEvents;
        _userGroupService = userGroupService;
        _mediator = mediator;
    }

    public async Task<Result> Handle(GuiGiaHanCapTrenCommand request, CancellationToken cancellationToken)
    {
        if (request.Ids.Count == 0)
        {
            return (Result)Result.Fail("Không có thông tin ID khiếu nại để gửi!");
        }

        try
        {
            var idList = string.Join(",", request.Ids.Select(id => $"'{id}'"));
            string sql = $@"
                UPDATE [Business].[GiaHanDanhGias]
                SET TrangThai = N'Chờ xử lý', LastModifiedBy = '{_currentUser.GetUserGroupId().ToString()}', LastModifiedOn = '{DateTime.Now}' 
                WHERE Id IN ({idList})
            ";

            await _dapperRepository.ExcuteAsync(sql);
        }
        catch (Exception ex)
        {
            throw new Exception("Lỗi gửi gia hạn: " + ex.Message);
        }

        return (Result)Result.Success(message: "Gửi cấp trên thành công!");
    }
}
