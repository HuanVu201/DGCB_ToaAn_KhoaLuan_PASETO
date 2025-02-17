using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TD.DanhGiaCanBo.Infrastructure.Notifications;

[AllowAnonymous]
public class ServerStatusHub : Hub
{
    private static DateTime lastTime;
    private static TimeSpan lastTotalProcessorTime;
    private static DateTime curTime;
    private static TimeSpan curTotalProcessorTime;
    public async Task timerCallback()
    {
        var proc = Process.GetCurrentProcess();
        var mem = proc.WorkingSet64;
        var cpu = proc.TotalProcessorTime;

        await Clients.All.SendAsync("broadcastStatus", new
        {
            ram = mem / (1024 * 1024),
            cpu = CPUUsage(proc)
        });
    }

    public double CPUUsage(Process p)
    {
        if (lastTime == null || lastTime == new DateTime())
        {
            lastTime = DateTime.Now;
            lastTotalProcessorTime = p.TotalProcessorTime;
        }

        curTime = DateTime.Now;
        curTotalProcessorTime = p.TotalProcessorTime;

        double CPUUsage = (curTotalProcessorTime.TotalMilliseconds - lastTotalProcessorTime.TotalMilliseconds) / curTime.Subtract(lastTime).TotalMilliseconds / Convert.ToDouble(Environment.ProcessorCount);

        lastTime = curTime;
        lastTotalProcessorTime = curTotalProcessorTime;

        return CPUUsage * 100;

    }
}
