using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Farmdeck_API.Data
{
    public class DesignDbContext : IDesignTimeDbContextFactory<FarmdeckDbContext>
    {
        public FarmdeckDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<FarmdeckDbContext>();
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environment}.json", optional: true)
                .AddEnvironmentVariables()
                .Build();

            optionsBuilder.UseNpgsql(configuration.GetConnectionString("DbContext"));
            return new FarmdeckDbContext(optionsBuilder.Options);
        }
    }
}