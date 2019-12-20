using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Extensions.ManagedClient;

namespace Homestead.WebAPI.MQTT
{
    public interface IMQTTHandler
    {
        Task Handle(IManagedMqttClient client, MqttApplicationMessageReceivedEventArgs message);
    }
}