using Newtonsoft.Json;
using System.Xml;

namespace TD.DanhGiaCanBo.Application.Common.Business;
public class Xml2Json
{
    public static T Parse<T>(string xml)
    {
        XmlDocument doc = new XmlDocument();
        doc.LoadXml(xml);
        string jsonText = JsonConvert.SerializeXmlNode(doc);
        jsonText = jsonText.Replace("soapenv:", "");
        jsonText = jsonText.Replace("ns1:", "");
        jsonText = jsonText.Replace("xmlns:", "");
        return JsonConvert.DeserializeObject<T>(jsonText);
    }
    private static void AddJsonArrayAttr(XmlDocument xmlDocument, List<string> nodes)
    {
        nodes.ForEach((node) =>
        {
            var property = xmlDocument.GetElementsByTagName(node);
            if (property.Count == 1)
            {
                var attribute = xmlDocument.CreateAttribute("json", "Array", "http://james.newtonking.com/projects/json");
                attribute.InnerText = "true";
                (property.Item(0) as XmlElement).Attributes.Append(attribute);
            }
        });
    }
    public static T Parse<T>(string xml, List<string> forceArrayProperties)
    {
        XmlDocument doc = new XmlDocument();
        doc.LoadXml(xml);
        AddJsonArrayAttr(doc, forceArrayProperties);
        string jsonText = JsonConvert.SerializeXmlNode(doc);
        jsonText = jsonText.Replace("soapenv:", "");
        jsonText = jsonText.Replace("ns1:", "");
        jsonText = jsonText.Replace("xmlns:", "");
        return JsonConvert.DeserializeObject<T>(jsonText);
    }
}
