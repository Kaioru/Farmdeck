using System;

namespace Homestead.WebAPI.Contracts
{
    public class TokenContract
    {
        public string Token { get; set; }
        public DateTime Expire { get; set; }
    }
}