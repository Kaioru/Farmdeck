using System;
using Farmdeck_API.Data;
using Farmdeck_API.GraphQL;
using Farmdeck_API.MQTT;
using Farmdeck_API.MQTT.Handlers;
using GraphQL;
using GraphQL.Server;
using GraphQL.Server.Ui.GraphiQL;
using GraphQL.Server.Ui.Playground;
using GraphQL.Server.Ui.Voyager;
using GraphQL.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using MQTTnet.Extensions.ManagedClient;

namespace Farmdeck_API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));
            services.AddSingleton<ISchema, FarmdeckSchema>();

            services.AddDbContext<FarmdeckDbContext>(options
                => options.UseNpgsql(Configuration.GetConnectionString("DbContext")));

            var mqttConfiguration = Configuration.GetSection("MQTT");
            var mqttOptions = new MqttClientOptionsBuilder()
                .WithClientId(Guid.NewGuid().ToString())
                .WithCredentials(mqttConfiguration["User"], mqttConfiguration["Password"])
                .WithTcpServer(mqttConfiguration["URI"], mqttConfiguration.GetValue<int>("Port"))
                .WithCleanSession()
                .Build();
            var managedOptions = new ManagedMqttClientOptionsBuilder()
                .WithAutoReconnectDelay(TimeSpan.FromSeconds(5))
                .WithClientOptions(mqttOptions)
                .Build();
            var client = new MqttFactory().CreateManagedMqttClient();

            services.AddSingleton<IndicatorHandler>();
            services.AddHostedService<MQTTClientService>(s =>
                new MQTTClientService(client, managedOptions, s)
            );

            services.AddControllers();

            services
                .AddGraphQL()
                .AddGraphTypes()
                .AddDataLoader()
                .AddWebSockets();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();

            app.UseRouting();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            app.UseGraphQL<ISchema>();
            app.UseGraphQLWebSockets<ISchema>();
            app.UseGraphiQLServer(new GraphiQLOptions());
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions());
            app.UseGraphQLVoyager(new GraphQLVoyagerOptions());
        }
    }
}