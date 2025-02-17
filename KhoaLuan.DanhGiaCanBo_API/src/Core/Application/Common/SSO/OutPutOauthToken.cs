using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Common.SSO;
public class OutPutOauthToken
{
    public string access_token { get; set; }
    public string refresh_token { get; set; }
    public string scope { get; set; }
    public string id_token { get; set; }
    public string token_type { get; set; }
    public string expires_in { get; set; }
}
