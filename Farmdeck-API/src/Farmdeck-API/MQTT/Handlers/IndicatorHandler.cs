using System;
using System.Text;
using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Extensions.ManagedClient;

namespace Farmdeck_API.MQTT.Handlers
{
    public class IndicatorHandler : IMQTTHandler
    {
        public Task Handle(IManagedMqttClient client, MqttApplicationMessageReceivedEventArgs message)
        {
            var payload = message.ApplicationMessage.Payload;
            
            Console.WriteLine($"Indicator: {Encoding.ASCII.GetString(payload)}");
            return Task.CompletedTask;
        }
    }
}