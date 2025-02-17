

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Application.Business.ActionApp;

namespace TD.DanhGiaCanBo.Application.Business.BoTieuChuanApp;


public class ReviewExtentionsDto : IDto
{
    public Guid Id { get; set; }
    public string LoaiThoiGian { get; set; }

    public string ThoiGian { get; set; }
    public string MaDonVi { get; set; }
    public string? ExtendStartDay { get; set; }
    public string? ExtendEndDay { get; set; }
    public string? Month { get; set; }
    public string? MonthTo { get; set; }

    [JsonIgnore] 
    public int TotalCount { get; set; }
    // Constructor mặc định
    public ReviewExtentionsDto() { }
    public void ProcessThoiGian()
    {
        if (string.IsNullOrEmpty(ThoiGian)) return;

        // Nếu có "##", tức là có Tháng và Ngày
        if (ThoiGian.Contains("##"))
        {
            //11##1-10
            //12-1##28-3
            var parts = ThoiGian.Split("##");
            if (parts.Length >= 2)
            {
                if (parts[0].Contains('-'))
                {
                    var dateMonth= parts[0];
                    var dateLstMonth = dateMonth.Split('-');
                    if (dateLstMonth.Length == 2)
                    {
                        Month = dateLstMonth[0];  // Thang bắt đầu
                        MonthTo = dateLstMonth[1];    // Thang kết thúc
                    }
                    var dateRange = parts[1];
                    // Tách ngày từ "10-20"
                    var dateParts = dateRange.Split('-');
                    if (dateParts.Length == 2)
                    {
                        ExtendStartDay = dateParts[0];  // Ngày bắt đầu
                        ExtendEndDay = dateParts[1];    // Ngày kết thúc
                    }
                }
                else
                {
                    Month = parts[0];  // Tháng
                    var dateRange = parts[1];

                    // Tách ngày từ "10-20"
                    var dateParts = dateRange.Split('-');
                    if (dateParts.Length == 2)
                    {
                        ExtendStartDay = dateParts[0];  // Ngày bắt đầu
                        ExtendEndDay = dateParts[1];    // Ngày kết thúc
                    }
                }
               
            }
        }
        else
        {
            // Nếu không có "##", chỉ có "1-31" dạng "StartDay-EndDay"
            var dateParts = ThoiGian.Split('-');
            if (dateParts.Length == 2)
            {
                ExtendStartDay = dateParts[0];  // Ngày bắt đầu
                ExtendEndDay = dateParts[1];    // Ngày kết thúc
            }
        }
    }
}
