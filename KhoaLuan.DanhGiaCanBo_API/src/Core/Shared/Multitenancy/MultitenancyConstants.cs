namespace TD.DanhGiaCanBo.Shared.Multitenancy;

public class MultitenancyConstants
{
    public static class Root
    {
        public const string Id = "root";
        public const string Name = "Root";
        public const string EmailAddress = "admin@root.com";
    }

    public const string DefaultPwd = "aaa";

    public const string TenantIdName = "root";
}