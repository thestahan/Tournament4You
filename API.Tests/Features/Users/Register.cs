using API.Domain;
using AutoMapper;
using FluentValidation.TestHelper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Moq;
using NUnit.Framework;

namespace API.Tests.Features.Users;

public class Register
{
    private Mock<UserManager<AppUser>> _userManagerMock;
    private Mock<IMapper> _mapperMock;
    private API.Features.Users.Register.CommandValidator _validator;

    private readonly string _correctPassword = "Pa$$w0rd";
    private readonly string _correctEmail = "admin@gmail.com";

    [SetUp]
    public void SetUp()
    {
        var store = new Mock<IUserStore<AppUser>>();
        _userManagerMock = new(store.Object, null, null, null, null, null, null, null, null);
        _mapperMock = new();
        _validator = new API.Features.Users.Register.CommandValidator();
    }

    [Test]
    [TestCase("")]
    [TestCase(null)]
    [TestCase("invalidemail")]
    public void ValidationFails_When_EmailIsInvalid(string email)
    {
        // Arrange
        var request = new API.Features.Users.Register.Command { Email = email, Password = _correctPassword };

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
        var request = new API.Features.Users.Register.Command { Email = _correctEmail, Password = password };

        // Act
        var result = _validator.TestValidate(request);

        // Assert
        result.ShouldHaveValidationErrorFor(r => r.Password);
        result.ShouldNotHaveValidationErrorFor(r => r.Email);
    }

    [Test]
    public void ThrowsBadRequestException_When_EmailExists()
    {
        // Arrange
        var handler = new API.Features.Users.Register.Handler(_userManagerMock.Object, _mapperMock.Object);
        var command = new API.Features.Users.Register.Command { Email = _correctEmail };
        _userManagerMock.Setup(u => u.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(new AppUser());

        // Act and assert
        Assert.ThrowsAsync<BadHttpRequestException>(async () => await handler.Handle(command, new CancellationToken()));
    }

    [Test]
    public void ThrowsBadRequestException_When_CreateFailed()
    {
        // Arrange
        var handler = new API.Features.Users.Register.Handler(_userManagerMock.Object, _mapperMock.Object);
        var command = new API.Features.Users.Register.Command { Email = _correctEmail, Password = _correctPassword };
        _mapperMock.Setup(m => m.Map<AppUser>(It.IsAny<API.Features.Users.Register.Command>())).Returns(new AppUser { Email = _correctEmail });
        _userManagerMock.Setup(u => u.CreateAsync(It.IsAny<AppUser>(), It.IsAny<string>())).ReturnsAsync(new IdentityResult());

        // Act and assert
        Assert.ThrowsAsync<BadHttpRequestException>(async () => await handler.Handle(command, new CancellationToken()));
    }

    [Test]
    public async Task ReturnsCorrectResult_When_UserIsCreated()
    {
        // Arrange
        var handler = new API.Features.Users.Register.Handler(_userManagerMock.Object, _mapperMock.Object);
        var command = new API.Features.Users.Register.Command { Email = _correctEmail, Password = _correctPassword };
        _mapperMock.Setup(m => m.Map<AppUser>(It.IsAny<API.Features.Users.Register.Command>())).Returns(new AppUser { Email = _correctEmail });
        _userManagerMock.Setup(u => u.CreateAsync(It.IsAny<AppUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);

        // Act
        var result = await handler.Handle(command, new CancellationToken());

        // Assert
        Assert.That(result, Is.TypeOf<API.Features.Users.Register.Result>());
        Assert.That(result, Has.Property("Email").EqualTo(_correctEmail));
    }
}
