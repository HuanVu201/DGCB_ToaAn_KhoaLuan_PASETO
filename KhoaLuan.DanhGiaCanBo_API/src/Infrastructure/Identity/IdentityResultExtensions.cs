﻿using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;

namespace TD.DanhGiaCanBo.Infrastructure.Identity;

internal static class IdentityResultExtensions
{
    public static List<string> GetErrors(this IdentityResult result, IStringLocalizer T) =>
        result.Errors.Select(e => T[e.Description].ToString()).ToList();
}