using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Homestead.WebAPI.MQTT.Handlers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MQTTnet.Extensions.ManagedClient;

namespace Homestead.WebAPI.MQTT
{
    public class MQTTClientService : IHostedService
    {
        private readonly IManagedMqttClientOptions _options;
        private readonly IDictionary<string, IMQTTHandler> _handlers;
        
        public IManagedMqttClient Client { get; set; }

        public MQTTClientService(
            IManagedMqttClient client,
            IManagedMqttClientOptions options,
            IServiceProvider services)
        {
            Client = client;
            _options = options;
            _handlers = new Dictionary<string, IMQTTHandler>
            {
                ["indicator"] = services.GetService<IndicatorHandler>()
            };
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            Client.UseConnectedHandler(async a =>
            {
                Console.WriteLine("Connected");

                await Client.SubscribeAsync("indicator");
            });
            Client.UseDisconnectedHandler(a => Console.WriteLine(a.Exception));
            Client.UseApplicationMessageReceivedHandler(a =>
            {
                if (_handlers.ContainsKey(a.ApplicationMessage.Topic))
                    _handlers[a.ApplicationMessage.Topic].Handle(Client, a);
            });
            return Client.StartAsync(_options);
        }

        public Task StopAsync(CancellationToken cancellationToken)
            => Client.StopAsync();
    }
}