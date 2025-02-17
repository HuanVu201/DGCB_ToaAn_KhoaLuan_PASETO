using TD.DanhGiaCanBo.Application.Common.Mailing;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using Microsoft.Extensions.Configuration;
using TD.DanhGiaCanBo.Application.Common.ServiceLogger;
using Newtonsoft.Json;
using TD.DanhGiaCanBo.Infrastructure.SMS;
using TD.DanhGiaCanBo.Domain.Common.Contracts;
using Microsoft.AspNetCore.Html;
using System.Text.RegularExpressions;
using TD.DanhGiaCanBo.Domain.Business;
using System.Reflection;

namespace TD.DanhGiaCanBo.Infrastructure.Mailing;

public class SmtpMailService : IMailService
{
    private readonly MailSettingsList _settings;
    private readonly ILogger<SmtpMailService> _logger;
    private readonly IServiceLogger _serviceLogger;

    public SmtpMailService(IOptions<MailSettingsList> settings, ILogger<SmtpMailService> logger, IServiceLogger serviceLogger)
    {
        //_settings = settings.Value;
        _settings = settings.Value;
        _logger = logger;
        _serviceLogger = serviceLogger;
    }
    public string FormatContentWithEntity(object entity, string content)
    {
        string pattern = @"#(\w+)";

        // Use Regex.Replace to replace matches with corresponding values from the HoSo object
        string formattedHtml = Regex.Replace(content, pattern, match =>
        {
            // Get the matched entity name
            string entityNameWithSlash = match.Value;
            string entityName = entityNameWithSlash.Replace("#", "");
            PropertyInfo property = entity.GetType().GetProperty(entityName);
            if (property != null)
            {
                string propertyValue = property.GetValue(entity)?.ToString() ?? "";
                return propertyValue;
            }
            else
            {
                // If no corresponding property found, return the original match
                return match.Value;
            }
        });

        return formattedHtml;
    }
    public async Task SendAsync(MailRequest request, CancellationToken cancellationToken = default)
    {
        try
        {
            var email = new MimeMessage();
            Random random = new Random();
            
            int randomIndex = random.Next(0, _settings.MailSettings.Count);

            // Lấy cấu hình email ngẫu nhiên
            MailSettings selectedMailSettings = _settings.MailSettings[randomIndex];

            // From
            email.From.Add(new MailboxAddress(selectedMailSettings.DisplayName, request.From ?? selectedMailSettings.From));

            // To
            foreach (string address in request.To)
                email.To.Add(MailboxAddress.Parse(address));

            // Reply To
            if (!string.IsNullOrEmpty(request.ReplyTo))
                email.ReplyTo.Add(new MailboxAddress(request.ReplyToName, request.ReplyTo));

            // Bcc
            if (request.Bcc != null)
            {
                foreach (string address in request.Bcc.Where(bccValue => !string.IsNullOrWhiteSpace(bccValue)))
                    email.Bcc.Add(MailboxAddress.Parse(address.Trim()));
            }

            // Cc
            if (request.Cc != null)
            {
                foreach (string? address in request.Cc.Where(ccValue => !string.IsNullOrWhiteSpace(ccValue)))
                    email.Cc.Add(MailboxAddress.Parse(address.Trim()));
            }

            // Headers
            if (request.Headers != null)
            {
                foreach (var header in request.Headers)
                    email.Headers.Add(header.Key, header.Value);
            }

            // Content
            var builder = new BodyBuilder();
            email.Sender = new MailboxAddress(request.DisplayName ?? selectedMailSettings.DisplayName, request.From ?? selectedMailSettings.From);
            email.Subject = request.Subject;
            builder.HtmlBody = request.Body;

            // Create the file attachments for this e-mail message
            if (request.AttachmentData != null)
            {
                foreach (var attachmentInfo in request.AttachmentData)
                    builder.Attachments.Add(attachmentInfo.Key, attachmentInfo.Value);
            }

            email.Body = builder.ToMessageBody();

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(selectedMailSettings.Host, selectedMailSettings.Port, SecureSocketOptions.StartTls, cancellationToken);
            await smtp.AuthenticateAsync(selectedMailSettings.UserName, selectedMailSettings.Password, cancellationToken);
            await smtp.SendAsync(email, cancellationToken);

            await smtp.DisconnectAsync(true, cancellationToken);
            await _serviceLogger.LogAsync<SmtpMailService>(new ServiceLoggerRequestParams()
            {
                MaHoSo = request.MaHoSo,
                isSucceed = true,
                Receiver = String.Join(", ", request.To),
                Sender = null,
                Request = JsonConvert.SerializeObject(request),
                Response = null,
                Service = ServiceLoggerServiceType.Email,
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            await _serviceLogger.LogAsync<SmtpMailService>(new ServiceLoggerRequestParams()
            {
                MaHoSo = request.MaHoSo,
                isSucceed = false,
                Receiver = String.Join(", ", request.To),
                Sender = null,
                Request = JsonConvert.SerializeObject(request),
                Response = ex.ToString(),
                Service = ServiceLoggerServiceType.Email,
            });
        }
    }
}