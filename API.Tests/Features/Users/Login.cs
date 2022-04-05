using API.Domain;
using API.Interfaces;
using FluentValidation.TestHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Moq;
using NUnit.Framework;

namespace API.Tests.Features.Users;

public class Login
{
    private Mock<UserManager<AppUser>> _userManagerMock;
    private Mock<ITokenService> _tokenServiceMock;
    private API.Features.Users.Login.CommandValidator _validator;

    private readonly string _correctPassword = "Pa$$w0rd";
    private readonly string _correctEmail = "admin@gmail.com";
    private readonly string _token = "jwtToken";

    [SetUp]
    public void SetUp()
    {
        var store = new Mock<IUserStore<AppUser>>();
        _userManagerMock = new(store.Object, null, null, null, null, null, null, null, null);
        _tokenServiceMock = new();
        _validator = new API.Features.Users.Login.CommandValidator();
    }

    [Test]
    [TestCase("")]
    [TestCase(null)]
    [TestCase("invalidemail")]
    public void ValidationFails_When_EmailIsInvalid(string email)
    {
        // Arrange
        var request = new API.Features.Users.Login.Command { Email = email, Password = _correctPassword };

        // Act
        var result = _validator.TestValidate(request);

        // Assert
        result.ShouldHaveValidationErrorFor(r => r.Email);
        result.ShouldNotHaveValidationErrorFor(r => r.Password);
    }

    [Test]
    [TestCase("")]
    [TestCase(null)]
    [TestCase("short")]
    public void ValidationFails_When_PasswordIsInvalid(string password)
    {
        // Arrange
        var request = new API.Features.Users.Login.Command { Email = _correctEmail, Password = password };

        // Act
        var result = _validator.TestValidate(request);

        // Assert
        result.ShouldHaveValidationErrorFor(r => r.Password);
        result.ShouldNotHaveValidationErrorFor(r => r.Email);
    }

    [Test]
    public void ThrowsBadRequestException_When_UserNotFound()
    {
        // Arrange
        var handler = new API.Features.Users.Login.Handler(_userManagerMock.Object, _tokenServiceMock.Object);
        var command = new API.Features.Users.Login.Command();

        // Act and assert
        Assert.ThrowsAsync<BadHttpRequestException>(async () => await handler.Handle(command, new CancellationToken()));
    }

    [Test]
    public void ThrowsBadRequestException_When_PasswordIsInvalid()
    {
        // Arrange
        var handler = new API.Features.Users.Login.Handler(_userManagerMock.Object, _tokenServiceMock.Object);
        var command = new API.Features.Users.Login.Command
        {
            Email = _correctEmail,
            Password = _correctPassword
        };
        _userManagerMock.Setup(u => u.FindByEmailAsync(_correctEmail)).ReturnsAsync(new AppUser { Email = _correctEmail });

        // Act and assert
        Assert.ThrowsAsync<BadHttpRequestException>(async () => await handler.Handle(command, new CancellationToken()));
    }

    [Test]
    public async Task ReturnsCorrectResult_When_UserLoggedIn()
    {
        // Arrange
        var handler = new API.Features.Users.Login.Handler(_userManagerMock.Object, _tokenServiceMock.Object);
        var command = new API.Features.Users.Login.Command
        {
            Email = _correctEmail,
            Password = _correctPassword
        };
        _userManagerMock.Setup(u => u.FindByEmailAsync(_correctEmail)).ReturnsAsync(new AppUser { Email = _correctEmail });
        _userManagerMock.Setup(u => u.CheckPasswordAsync(It.IsAny<AppUser>(), _correctPassword)).ReturnsAsync(true);
        _tokenServiceMock.Setup(t => t.CreateToken(It.IsAny<AppUser>())).Returns("jwtToken");

        // Act
        var result = await handler.Handle(command, new CancellationToken());

        // Assert
        Assert.That(result, Is.TypeOf<API.Features.Users.Login.Result>());
        Assert.That(result, Has.Property("Email").EqualTo(_correctEmail));
        Assert.That(result, Has.Property("Token").EqualTo(_token));
    }
}
