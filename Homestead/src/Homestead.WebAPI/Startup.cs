using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Homestead.WebAPI.Entities.Context;
using Homestead.WebAPI.MQTT;
using Homestead.WebAPI.MQTT.Handlers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using MQTTnet;
using MQTTnet.AspNetCore;
using MQTTnet.Client.Options;
using MQTTnet.Extensions.ManagedClient;

namespace Homestead.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddDbContext<DatabaseContext>(options
                => options.UseNpgsql(Configuration.GetConnectionString("DbContext")));

            var jwtConfig = new JWTConfig();

            Configuration.Bind("JWT", jwtConfig);

            services.AddSingleton<JWTConfig>(jwtConfig);
            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    var signingKey = Convert.FromBase64String(jwtConfig.TokenKey);

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = !string.IsNullOrEmpty(jwtConfig.TokenIssuer),
                        ValidateAudience = !string.IsNullOrEmpty(jwtConfig.TokenAudience),
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtConfig.TokenIssuer,
                        ValidAudience = jwtConfig.TokenAudience,
                        IssuerSigningKey = new SymmetricSecurityKey(signingKey)
                    };
                });

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
            services.AddSingleton<MQTTClientService>(s =>
            {
                var service = new MQTTClientService(client, managedOptions, s);

                service.StartAsync(CancellationToken.None);
                return service;
            });
            // services.AddHostedMqttServer(builder => builder.WithDefaultEndpointPort(1883));
            // services.AddMqttTcpServerAdapter();
            // services.AddMqttWebSocketServerAdapter();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            // app.UseMqttEndpoint();
        }
    }
}