using System;

namespace Homestead.WebAPI.Contracts
{
    public class TokenContract
    {
        public string DisplayName { get; set; }
        public string DisplayPicture { get; set; }

        public string Username { get; set; }

        public string Token { get; set; }
        public DateTime Expire { get; set; }
    }
}