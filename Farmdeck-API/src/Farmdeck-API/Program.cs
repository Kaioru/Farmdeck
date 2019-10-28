using System;
using System.Threading.Tasks;
using System.Linq;
using Newtonsoft.Json;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using MQTTnet;
using MQTTnet.Extensions.ManagedClient;
using MQTTnet.Client;
using MQTTnet.Client.Options;

namespace Farmdeck_API
{
   class Program
    {
        static IManagedMqttClient client = new MqttFactory().CreateManagedMqttClient();
        static void Main(string[] args)
        {

            // send message
            Task message = PublishAsync("allahu", "akbar");

            // receiving message
            if (client.IsConnected)
            {
                client.UseApplicationMessageReceivedHandler(e =>
                {
                    try
                    {
                        string topic = e.ApplicationMessage.Topic;

                        if (string.IsNullOrWhiteSpace(topic) == false)
                        {
                            string payload = Encoding.UTF8.GetString(e.ApplicationMessage.Payload);
                            Console.WriteLine($"Topic: {topic}. Message Received: {payload}");
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.Message, ex);
                    }
                });
            }

            Program prog = new Program();

        }

        Program()
        { 
            // connecting
            Task connectAsync = ConnectAsync();
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