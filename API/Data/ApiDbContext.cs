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




        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
