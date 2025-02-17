using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Drawing.Printing;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.TieuChiDanhGiaApp;

namespace TD.DanhGiaCanBo.Application.Business.MauPhieuDanhGiaApp;
public class MauPhieuDanhGiaHistoryDto : IDto
{
    public Guid Id { get; set; }
    // ID người thực hiện hành động
    public Guid UserId { get; set; }

    // Loại hành động (INSERT, UPDATE, DELETE)
    public string Type { get; set; }

    // Tên bảng bị tác động
    public string TableName { get; set; }

    // Ngày và giờ thực hiện hành động
    public DateTime DateTime { get; set; }

    // Giá trị cũ của các trường bị thay đổi (được lưu dưới dạng chuỗi JSON hoặc tương tự)
    public string OldValues { get; set; }

    // Giá trị mới của các trường bị thay đổi (được lưu dưới dạng chuỗi JSON hoặc tương tự)
    public string NewValues { get; set; }

    // Danh sách các cột bị ảnh hưởng (có thể là chuỗi JSON)
    public string AffectedColumns { get; set; }

    // Khóa chính của bản ghi bị thay đổi
    public string PrimaryKey { get; set; }

    public string TenantId { get; set; }

    public string UserFullName { get; set; }
    public string UserUserName { get; set; }
    [JsonIgnore]
    public int TotalCount { get; set; }
}
