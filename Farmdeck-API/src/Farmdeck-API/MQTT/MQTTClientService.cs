using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Farmdeck_API.MQTT.Handlers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MQTTnet.Extensions.ManagedClient;

namespace Farmdeck_API.MQTT
{
    public class MQTTClientService : IHostedService
    {
        private readonly IManagedMqttClientOptions _options;
        private readonly IManagedMqttClient _client;
        private readonly IDictionary<string, IMQTTHandler> _handlers;

        public MQTTClientService(
            IManagedMqttClient client,
            IManagedMqttClientOptions options,
            IServiceProvider services)
        {
            _client = client;
            _options = options;
            _handlers = new Dictionary<string, IMQTTHandler>
            {
                ["indicator"] = services.GetService<IndicatorHandler>()
            };
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _client.UseConnectedHandler(a => Console.WriteLine("Connected"));
            _client.UseDisconnectedHandler(a => Console.WriteLine(a.Exception));
            _client.UseApplicationMessageReceivedHandler(a =>
            {
                if (_handlers.ContainsKey(a.ApplicationMessage.Topic))
                    _handlers[a.ApplicationMessage.Topic].Handle(_client, a);
            });
            return _client.StartAsync(_options);
        }

        public Task StopAsync(CancellationToken cancellationToken)
            => _client.StopAsync();
    }
}