namespace API.Helpers;

public static class NumberHelpers
{
    public static int GetTheAmountOfTimesIntCanBeDividedByN(int number, int n) =>
        (int)Math.Floor(Math.Log(number, n));
}
