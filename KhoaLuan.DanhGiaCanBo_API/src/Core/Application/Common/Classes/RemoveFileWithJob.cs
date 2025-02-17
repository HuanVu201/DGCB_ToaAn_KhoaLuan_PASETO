using TD.DanhGiaCanBo.Application.Common.Minio;

namespace TD.DanhGiaCanBo.Application.Common.Classes;
public class RemoveFileWithJob
{
    public RemoveFileWithJob()
    {
        RemoveFiles = new List<string>();
    }

    public IReadOnlyList<string>? RemoveFiles { get; set; }
}

public class RemoveFileWithJobHandler
{
    public async Task DeleteFiles(IJobService jobService, IReadOnlyList<string>? removeFiles)
    {
        try
        {
            if (removeFiles != null && removeFiles.Count > 0)
            {
                jobService.Enqueue<IMinioService>(x => x.RemoveFilesByKeyAsync(null, removeFiles));
            }
        } catch(Exception ex)
        {
            
        }
    }
}
