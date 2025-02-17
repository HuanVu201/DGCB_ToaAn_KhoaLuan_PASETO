using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Catalog.FileApp;
public class GetPublicFileRequest
{
    public string Path { get; set; }
    public string AccessKey { get; set; }
}

public class GetPublicFileSLDRequest
{
    public string Path { get; set; }
}

public class GetSignatureData
{
    public string FilePath { get; set; }
}