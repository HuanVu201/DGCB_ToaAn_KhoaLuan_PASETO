using Microsoft.Extensions.Options;
using System.DirectoryServices;
using System.DirectoryServices.AccountManagement;
using TD.DanhGiaCanBo.Application.Identity.Tokens;
using TD.DanhGiaCanBo.Infrastructure.Ldap;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;
internal class ADServices : IADService
{
    private readonly LDAPSettings ldapSettings;
    public ADServices(IOptions<LDAPSettings> _ldapSettings)
    {
        ldapSettings = _ldapSettings.Value;
    }

    public string ValidateCredentials(string username, string password)
    {
        string result = string.Empty;

        using (var adContext = new PrincipalContext(ContextType.Domain, ldapSettings.Domain))
        {
            bool res = adContext.ValidateCredentials(username, password);
            if (res)
                result = "1";
            else
                result = "0";
        }

        return result;
    }

    public string ChangePassword(string userName, string oldPass, string newPass)
    {
        string result = "";
        if (ldapSettings.ListUserCanNotChangePass.Split('#').Contains(userName))
            return "2";
        var domainContext = new PrincipalContext(ContextType.Domain, ldapSettings.Domain, ldapSettings.Username, ldapSettings.Password);
        var user = UserPrincipal.FindByIdentity(domainContext, IdentityType.SamAccountName, userName);
        if (user != null)
        {
            if (ldapSettings.PassNeverExpires)
                user.PasswordNeverExpires = true;
            user.ChangePassword(oldPass, newPass);
            user.Save();
            result += "1";
        }
        else
        {
            result = "-1";
        }

        return result;
    }

    public string ResetPassword(string userName, string passWord)
    {
        string result = string.Empty;

        if (ldapSettings.ListUserCanNotChangePass.Split('#').Contains(userName))
            return "2";
        var domainContext = new PrincipalContext(ContextType.Domain, ldapSettings.Domain, ldapSettings.Username, ldapSettings.Password);
        var user = UserPrincipal.FindByIdentity(domainContext, IdentityType.SamAccountName, userName);
        if (user != null)
        {
            if (user.Enabled == false)
                user.Enabled = true;
            if (ldapSettings.PassNeverExpires)
                user.PasswordNeverExpires = true;
            user.SetPassword(passWord);
            user.Save();
            result += "1";
        }
        else
        {
            result = "-1";
        }

        return result;
    }

    public string AddUser(string ou, string userName, string passWord, string name)
    {
        string result = string.Empty;

        var domainContext = new PrincipalContext(ContextType.Domain, ldapSettings.Domain, ou, ldapSettings.Username, ldapSettings.Password);
        UserPrincipal user = new UserPrincipal(domainContext, userName, passWord, true)
        {
            GivenName = name ?? userName,
            Surname = name,
            Enabled = true,
            UserPrincipalName = userName + ldapSettings.Domain
        };
        // force the user to change password at next logon
        if (ldapSettings.PassNeverExpires)
            user.PasswordNeverExpires = true;

        // save the user to the directory
        user.Save();
        result += "1";
        return result;
    }

    public string CheckUser(string userName)
    {
        var domainContext = new PrincipalContext(ContextType.Domain, ldapSettings.Domain, ldapSettings.Username, ldapSettings.Password);
        var user = UserPrincipal.FindByIdentity(domainContext, IdentityType.SamAccountName, userName);
        string result;
        if (user != null)
            result = "1";
        else
            result = "-1";
        return result;
    }

    public string CheckPasswordExpiration(string userName)
    {
        string result = string.Empty;

        using (var context = new PrincipalContext(ContextType.Domain, ldapSettings.Domain, ldapSettings.Username, ldapSettings.Password))
        {
            using (var user = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, userName))
            {
                if (user != null)
                {
                    var groups = user.GetAuthorizationGroups();
                    var lastPasswordSet = user.LastPasswordSet ?? DateTime.MinValue;
                    var passwordAge = DateTime.Now - lastPasswordSet;
                    var maxPasswordAge = TimeSpan.FromTicks(user.AccountExpirationDate.Value.Ticks);
                    if (passwordAge > maxPasswordAge)
                    {
                        result = "-1"; //AccountExpirationDate
                    }
                    else
                    {
                        result = "1";
                    }
                }
            }
        }
        return result;
    }

    public List<string> GetOuAD(string path)
    {
        List<string> orgUnits = new List<string>();

        DirectoryEntry startingPoint = new DirectoryEntry(path, ldapSettings.Username, ldapSettings.Password);
        DirectorySearcher searcher = new DirectorySearcher(startingPoint);
        searcher.Filter = "(objectCategory=organizationalUnit)";

        foreach (SearchResult res in searcher.FindAll())
        {
            orgUnits.Add(res.Path);
        }

        return orgUnits;
    }
}
