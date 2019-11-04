using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Extensions.ManagedClient;

namespace Farmdeck_API.MQTT.Handlers
{
    public class IndicatorHandler : IMQTTHandler
    {
        public Task Handle(IManagedMqttClient client, MqttApplicationMessageReceivedEventArgs message)
        {
            throw new System.NotImplementedException();
        }
    }
}