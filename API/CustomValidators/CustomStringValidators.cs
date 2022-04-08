using FluentValidation;
using System.Text.RegularExpressions;

namespace API.CustomValidators;

public static class CustomStringValidators
{
    public static IRuleBuilderOptions<T, string> AllowOnlyLetters<T>(this IRuleBuilder<T, string> ruleBuilder)
    {
        return ruleBuilder.Must(s => Regex.Match(s, "^[a-zA-Z]*$").Success).WithMessage("'{PropertyName}' should only contain letters");
    }
}
