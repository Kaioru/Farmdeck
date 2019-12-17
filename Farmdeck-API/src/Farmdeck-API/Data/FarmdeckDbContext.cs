using Farmdeck_API.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Farmdeck_API.Data
{
    public class FarmdeckDbContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Indicator> Indicators { get; set; }

        public FarmdeckDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Account>()
                .HasIndex(a => a.Username)
                .IsUnique();
        }
    }
}