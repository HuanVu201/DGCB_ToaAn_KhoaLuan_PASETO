using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.DanhGiaCanBo.Application.Abstractions.Messaging;

namespace TD.DanhGiaCanBo.Application.Business.VetXuLyDanhGiaDonViApp.Commands;
public class AddVetXuLyDanhGiaDonViCommand : ICommand<Guid>
{
    public string? MaPhieu { get; set; }
    public string? MaPhongBan { get; set; }
    public string TenThaoTac { get; private set; }
    public string TenNguoiXuLy { get; private set; }
     public string TaiKhoanXuLy { get; private set; }


}