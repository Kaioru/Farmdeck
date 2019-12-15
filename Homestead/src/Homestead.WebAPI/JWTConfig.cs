namespace Homestead.WebAPI
{
    public class JWTConfig
    {
        public string TokenKey { get; set; }
        public string TokenIssuer { get; set; }
        public string TokenAudience { get; set; }
        public int TokenExpiry { get; set; }
    }
}