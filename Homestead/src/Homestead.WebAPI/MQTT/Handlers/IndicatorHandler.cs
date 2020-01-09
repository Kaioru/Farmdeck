using System;
using System.Text;
using System.Threading.Tasks;
using Homestead.WebAPI.Entities;
using Homestead.WebAPI.Entities.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MQTTnet;
using MQTTnet.Extensions.ManagedClient;

namespace Homestead.WebAPI.MQTT.Handlers
{
    public class IndicatorHandler : IMQTTHandler
    {
        private readonly IConfiguration _configuration;

        public IndicatorHandler(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task Handle(IManagedMqttClient client, MqttApplicationMessageReceivedEventArgs message)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DbContext"));
            await using var context = new DatabaseContext(optionsBuilder.Options);

            var payload = message.ApplicationMessage.Payload;
            var split = Encoding.ASCII.GetString(payload).Split(":");

            var deckID = Guid.Parse(split[0]);
            var type = split[1];
            var value = float.Parse(split[2]);

            var deck = await context.Decks.FirstAsync(d => d.Id == deckID);
            var indicator = new DeckIndicator
            {
                Deck = deck,
                Type = Enum.Parse<DeckIndicatorType>(type, true),
                Value = value,
                DateCreated = DateTime.UtcNow
            };

            await context.DeckIndicators.AddAsync(indicator);
            await context.SaveChangesAsync();

            Console.WriteLine($"Created new indicator {indicator.Type} of value {indicator.Value} for {deckID}");
        }
    }
}