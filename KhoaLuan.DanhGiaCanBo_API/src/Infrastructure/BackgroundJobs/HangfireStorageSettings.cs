namespace TD.DanhGiaCanBo.Infrastructure.BackgroundJobs;

public class HangfireStorageSettings
{
    public string? StorageProvider { get; set; }
    public string? ConnectionString { get; set; }
}
public class HangfireSettings
{
    public bool? Enable { get; set; }
    public bool? EnableJobsDefault { get; set; }

}