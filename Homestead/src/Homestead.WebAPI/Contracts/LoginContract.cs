using System.ComponentModel.DataAnnotations;

namespace Homestead.WebAPI.Contracts
{
    public class LoginContract
    {
        [Required] [MinLength(4)] public string Username { get; set; }
        [Required] [MinLength(5)] public string Password { get; set; }
    }
}