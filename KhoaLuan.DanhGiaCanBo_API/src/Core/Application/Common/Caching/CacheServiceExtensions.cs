using Newtonsoft.Json;

namespace TD.DanhGiaCanBo.Application.Common.Caching;

public static class CacheServiceExtensions
{
    public static T? GetOrSet<T>(this ICacheService cache, string key, Func<T?> getItemCallback, TimeSpan? slidingExpiration = null)
    {
        T? value = cache.Get<T>(key);

        if (value is not null)
        {
            return value;
        }

        value = getItemCallback();

        if (value is not null)
        {
            cache.Set(key, value, slidingExpiration);
        }

        return value;
    }

    public static async Task<T?> GetOrSetAsync<T>(this ICacheService cache, object key, Func<Task<T>> getItemCallback, TimeSpan? slidingExpiration = null, CancellationToken cancellationToken = default)
    {
        string keyStr = JsonConvert.SerializeObject(key);
        var reFetch = key.HasPropWithValue("ReFetch");
        var check = false;
        if (reFetch != null)
        {
            check = (bool)reFetch;
        }

        if (!check)
        {
            T? value = await cache.GetAsync<T>(keyStr, cancellationToken);
            if (value is not null && !check)
            {
                return value;
            }
            value = await getItemCallback();
            if (value is not null)
            {
                await cache.SetAsync(keyStr, value, slidingExpiration, cancellationToken);
            }
            return value;

        }
        else
        {
            T? value = await getItemCallback();

            if (value is not null)
            {
                await cache.SetAsync(keyStr, value, slidingExpiration, cancellationToken);
            }
            return value;

        }
    }

    public static async Task<string> GetOrSetWithKeyValueAsync(this ICacheService cache, string key, string? valueInto, TimeSpan? slidingExpiration = null, CancellationToken cancellationToken = default)
    {
        string keyStr = JsonConvert.SerializeObject(key);
        var reFetch = key.HasPropWithValue("ReFetch");
        var check = false;
        if (reFetch != null)
        {
            check = (bool)reFetch;
        }

        if (!check)
        {
            string valueReturn = await cache.GetAsync<string>(keyStr, cancellationToken);
            if (valueReturn is not null && !check)
            {
                return valueReturn;
            }
            await cache.SetAsync(keyStr, valueInto, slidingExpiration, cancellationToken);
            return "setMeroryCache";

        }
        else
        {
            if (valueInto is not null)
            {
                await cache.SetAsync(keyStr, valueInto, slidingExpiration, cancellationToken);
            }
            return "setMeroryCache";

        }
    }

    public static object? HasPropWithValue(this object objectToCheck, string methodName)
    {
        var type = objectToCheck.GetType();
        var prop = type.GetProperty(methodName);
        bool propExits = prop != null;
        if (propExits)
        {
            var value = prop.GetValue(objectToCheck, null);
            return value;
        }

        return null;
    }
}