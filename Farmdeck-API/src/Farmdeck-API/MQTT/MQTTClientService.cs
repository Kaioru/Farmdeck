using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using MQTTnet;
using MQTTnet.Extensions.ManagedClient;

namespace Farmdeck_API.MQTT
{
    public class MQTTClientService : IHostedService
    {
        private readonly IManagedMqttClientOptions _options;
        private readonly IManagedMqttClient _client;

        public MQTTClientService(IManagedMqttClient client, IManagedMqttClientOptions options)
        {
            _client = client;
            _options = options;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _client.UseConnectedHandler(a => Console.WriteLine("Connected"));
            _client.UseDisconnectedHandler(a => Console.WriteLine(a.Exception));
            return _client.StartAsync(_options);
        }

        public Task StopAsync(CancellationToken cancellationToken)
            => _client.StopAsync();
    }
}