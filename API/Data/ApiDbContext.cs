using API.Data.Configs;
using API.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ApiDbContext : IdentityDbContext<AppUser>
    {
        public ApiDbContext(DbContextOptions<ApiDbContext> options) : base(options)
        {
        }

        public DbSet<Match> Matches => Set<Match>();
        public DbSet<Player> Players => Set<Player>();
        public DbSet<Position> Positions => Set<Position>();
        public DbSet<Team> Teams => Set<Team>();
        public DbSet<Tournament> Tournaments => Set<Tournament>();
        public DbSet<Round> Rounds => Set<Round>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Match>()
                .HasOne(m => m.Team1)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Match>()
                .HasOne(m => m.Team2)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Tournament>()
                .HasMany(t => t.Teams)
                .WithMany(t => t.Tournaments);

            builder.Entity<Tournament>()
                .HasOne(t => t.WinnerTeam)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            builder.ApplyConfiguration(new PositionsConfig());
        }
    }
}
