using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Client.Receiving;
using MQTTnet.Extensions.ManagedClient;

namespace Farmdeck_API.MQTT
{
    public interface IMQTTHandler
    {
        Task Handle(IManagedMqttClient client, MqttApplicationMessageReceivedEventArgs message);
    }
}