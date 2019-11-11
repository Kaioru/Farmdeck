using System.Threading.Tasks;
using Farmdeck_API.MQTT;
using Microsoft.AspNetCore.Mvc;
using MQTTnet;
using MQTTnet.Extensions.ManagedClient;

namespace Farmdeck_API.Controllers
{
    [Route("panel")]
    public class PanelController : Controller
    {
        private MQTTClientService _mqtt;

        public PanelController(MQTTClientService mqtt)
            => _mqtt = mqtt;
        
        [HttpPost]
        [Route("toggle")]
        public async Task<IActionResult> ToggleComponent(string type, int state)
        {
            await _mqtt.Client.PublishAsync("panel", type + "-" + state);

            return Ok();
        }
    }
}