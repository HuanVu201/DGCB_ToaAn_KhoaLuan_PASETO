using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Application.Identity.Tokens;
public interface IADService : ITransientService
{
    string ValidateCredentials(string username, string password);
    string ChangePassword(string userName, string oldPass, string newPass);
    string ResetPassword(string userName, string passWord);
    string AddUser(string ou, string userName, string passWord, string name);
    string CheckUser(string userName);
    string CheckPasswordExpiration(string userName);
    List<string> GetOuAD(string path);
}
