using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using TD.DanhGiaCanBo.Domain.Business;

namespace TD.DanhGiaCanBo.Application.Business.DanhGiaApp;

public class DataThongKeSLDGDto : IDto
{
        public string Ten { get; set; }
        public string GiaTri { get; set; }
}
