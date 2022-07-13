using API.ApiResponses;
using API.Data;
using API.Domain;
using API.Interfaces;
using FluentValidation.TestHelper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;

namespace API.Tests.Features.Teams;

public class Update
{
    private Mock<IUserAccessor> _userAccesorMock;
    private Mock<UserManager<AppUser>> _userManagerMock;
    private API.Features.Teams.Update.CommandValidator _validator;

    private readonly int _findableTeamId = 1;
    private readonly int _unfindableTeamId = 99;
    private readonly string _findableUserId = "1";
    private readonly string _correctName = "Team name";
    private readonly string _correctCity = "Team city";
    private readonly string _correctCoach = "Team coach";

    [SetUp]
    public void SetUp()
    {
        var store = new Mock<IUserStore<AppUser>>();
        _userManagerMock = new(store.Object, null, null, null, null, null, null, null, null);
        _userAccesorMock = new();
        _validator = new API.Features.Teams.Update.CommandValidator();
    }

    [Test]
    [TestCase(0)]
    [TestCase(-5)]
    public void ValidationFails_When_IdIsInvalid(int id)
    {
        // Arrange
        var request = new API.Features.Teams.Update.Command { Id = id };

        // Act
        var result = _validator.TestValidate(request);

        // Assert
        result.ShouldHaveValidationErrorFor(r => r.Id);
    }

    [Test]
    [TestCase(null)]
    [TestCase("")]
    [TestCase("aa")]
    public void ValidationFails_When_NameIsInvalid(string name)
    {
        // Arrange
        var request = new API.Features.Teams.Update.Command { Name = name };

        // Act
        var result = _validator.TestValidate(request);

        // Assert
        result.ShouldHaveValidationErrorFor(r => r.Name);
    }

    [Test]
    [TestCase(null)]
    [TestCase("")]
    public void ValidationFails_When_CityIsInvalid(string city)
    {
        // Arrange
        var request = new API.Features.Teams.Update.Command { City = city };

        // Act
        var result = _validator.TestValidate(request);

        // Assert
        result.ShouldHaveValidationErrorFor(r => r.City);
    }

    [Test]
    [TestCase(null)]
    [TestCase("")]
    [TestCase("a")]
    public void ValidationFails_When_CoachIsInvalid(string coach)
    {
        // Arrange
        var request = new API.Features.Teams.Update.Command { Coach = coach };

        // Act
        var result = _validator.TestValidate(request);

        // Assert
        result.ShouldHaveValidationErrorFor(r => r.Coach);
    }

    [Test]
    public void ThrowsNotFoundException_When_TeamIsNotFound()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApiDbContext>()
            .UseInMemoryDatabase(databaseName: "DB")
            .Options;

        var command = GetUpdateCommand(_unfindableTeamId);
        var handler = new API.Features.Teams.Update.Hander(new ApiDbContext(options), _userAccesorMock.Object, _userManagerMock.Object);
        _userAccesorMock.Setup(u => u.User).Returns(new System.Security.Claims.ClaimsPrincipal());
        _userManagerMock.Setup(u => u.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(new AppUser { Id = _findableUserId });

        // Act and assert
        Assert.ThrowsAsync<ApiObjectNotFoundException>(async () => await handler.Handle(command, new CancellationToken()));
    }

    [Test]
    public async Task ReturnsNewResult_When_UserIsUpdated()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApiDbContext>()
            .UseInMemoryDatabase(databaseName: "DB")
            .Options;

        using (var context = new ApiDbContext(options))
        {
            context.Teams.Add(GetFindableTeam());
            context.SaveChanges();
        }

        var command = GetUpdateCommand(_findableTeamId);
        var handler = new API.Features.Teams.Update.Hander(new ApiDbContext(options), _userAccesorMock.Object, _userManagerMock.Object);
        var ct = new CancellationToken();
        _userAccesorMock.Setup(u => u.User).Returns(new System.Security.Claims.ClaimsPrincipal());
        _userManagerMock.Setup(u => u.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(new AppUser { Id = _findableUserId });

        // Act
        var result = await handler.Handle(command, ct);

        // Assert
        Assert.That(result, Is.TypeOf<API.Features.Teams.Update.Result>());
    }

    private Team GetFindableTeam()
    {
        return new Team
        {
            Id = _findableTeamId,
            OrganizerId = _findableUserId
        };
    }

    private API.Features.Teams.Update.Command GetUpdateCommand(int id)
    {
        return new API.Features.Teams.Update.Command
        {
            Id = id,
            Name = _correctName,
            City = _correctCity,
            Coach = _correctCoach
        };
    }
}
