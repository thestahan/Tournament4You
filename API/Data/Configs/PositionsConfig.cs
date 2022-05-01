using API.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configs;

public class PositionsConfig : IEntityTypeConfiguration<Position>
{
    public void Configure(EntityTypeBuilder<Position> builder)
    {
        builder.HasData
        (
            new Position
            {
                Id = 1,
                Name = "Outside hitter",
                Abbreviation = "OH"
            },
            new Position
            {
                Id = 2,
                Name = "Right-side hitter",
                Abbreviation = "RH"
            },
            new Position
            {
                Id = 3,
                Name = "Middle blocker",
                Abbreviation = "MB"
            },
            new Position
            {
                Id = 4,
                Name = "Setter",
                Abbreviation = "S"
            },
            new Position
            {
                Id = 5,
                Name = "Libero",
                Abbreviation = "L"
            }
        );
    }
}
