using NUnit.Framework;

namespace API.Tests.Helpers.NumberHelpers;

public class GetTheAmountOfTimesIntCanBeDivided
{
    [Test]
    [TestCase(2, 2, ExpectedResult = 1)]
    [TestCase(4, 2, ExpectedResult = 2)]
    [TestCase(8, 2, ExpectedResult = 3)]
    [TestCase(16, 2, ExpectedResult = 4)]
    [TestCase(32, 2, ExpectedResult = 5)]
    public int Returns_CorrectValues(int number, int n)
    {
        // Arrange and act
        int num = API.Helpers.NumberHelpers.GetTheAmountOfTimesIntCanBeDividedByN(number, n);

        // Assert
        return num;
    }
}
