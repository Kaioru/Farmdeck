using System.Threading.Tasks;
using Farmdeck_API.MQTT;
using Microsoft.AspNetCore.Mvc;
using MQTTnet;
using MQTTnet.Extensions.ManagedClient;

namespace Farmdeck_API.Controllers
{
    public class PanelController : Controller
    {
        private MQTTClientService _mqtt;

        public PanelController(MQTTClientService mqtt)
            => _mqtt = mqtt;

        [HttpPost]
        public async Task<IActionResult> ToggleComponent(string type)
        {
            await _mqtt.Client.PublishAsync(
                new MqttApplicationMessageBuilder()
                    .WithTopic("panel")
                    .WithPayload(type)
                    .Build()
            );

            return Ok();
        }
    }
}