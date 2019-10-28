using Farmdeck_API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Farmdeck_API.Data
{
    public class FarmdeckDbContext : DbContext
    {
        public DbSet<Indicator> Indicators { get; set; }

        public FarmdeckDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}