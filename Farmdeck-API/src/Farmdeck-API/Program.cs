using System;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using MQTTnet;
using MQTTnet.Extensions.ManagedClient;
using MQTTnet.Client.Options;

namespace Farmdeck_API
{
   class Program
    {
        static void Main(string[] args)
        {
        }

        public static async Task ConnectAsync()
        {
            string clientId = Guid.NewGuid().ToString();
            string mqttURI =  "farmer.cloudmqtt.com";
            string mqttUser = "nalfywlt";
            string mqttPassword = "3kZymesJiHWk";
            int mqttPort = 14103;
            bool mqttSecure = false;
            var messageBuilder = new MqttClientOptionsBuilder()
                .WithClientId(clientId)
                .WithCredentials(mqttUser, mqttPassword)
                .WithTcpServer(mqttURI, mqttPort)
                .WithCleanSession();

            var options = mqttSecure
              ? messageBuilder
                .WithTls()
                .Build()
              : messageBuilder
                .Build();
            var managedOptions = new ManagedMqttClientOptionsBuilder()
              .WithAutoReconnectDelay(TimeSpan.FromSeconds(5))
              .WithClientOptions(options)
              .Build();

            var client = new MqttFactory().CreateManagedMqttClient();
            await client.StartAsync(managedOptions);
        }

        public static async Task PublishAsync(string topic, string payload, bool retainFlag = true, int qos = 1) =>

          await client.PublishAsync(new MqttApplicationMessageBuilder()
            .WithTopic(topic)
            .WithPayload(payload)
            .WithQualityOfServiceLevel((MQTTnet.Protocol.MqttQualityOfServiceLevel)qos)
            .WithRetainFlag(retainFlag)
            .Build());
    }
}