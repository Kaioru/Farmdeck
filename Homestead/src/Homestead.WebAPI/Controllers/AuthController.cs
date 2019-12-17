using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Homestead.WebAPI.Contracts;
using Homestead.WebAPI.Entities;
using Homestead.WebAPI.Entities.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Homestead.WebAPI.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : Controller
    {
        private JWTConfig JwtConfig { get; }
        private DatabaseContext DatabaseContext { get; }

        public AuthController(JWTConfig jwtConfig, DatabaseContext databaseContext)
        {
            JwtConfig = jwtConfig;
            DatabaseContext = databaseContext;
        }

        private TokenContract GetToken(User user)
        {
            var signingKey = Convert.FromBase64String(JwtConfig.TokenKey);
            var expiryDuration = JwtConfig.TokenExpiry;
            var now = DateTime.UtcNow;
            var expire = now.AddMinutes(expiryDuration);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = JwtConfig.TokenIssuer,
                Audience = JwtConfig.TokenAudience,
                IssuedAt = now,
                NotBefore = now,
                Expires = expire,
                Subject = new ClaimsIdentity(new List<Claim>
                {
                    new Claim(ClaimTypes.Sid, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username)
                }),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(signingKey),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = jwtTokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            var token = jwtTokenHandler.WriteToken(jwtToken);

            return new TokenContract
            {
                Token = token,
                Expire = expire
            };
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginContract contract)
        {
            var user = await DatabaseContext.Users
                .FirstOrDefaultAsync(a => a.Username == contract.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(contract.Password, user.Password))
                return Unauthorized("Failed to authenticate");

            return Ok(GetToken(user));
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterContract contract)
        {
            var user = await DatabaseContext.Users
                .FirstOrDefaultAsync(a => a.Username == contract.Username);

            if (user != null)
                return Unauthorized("Account already exists");

            user = new User
            {
                DisplayName = contract.Username,
                Username = contract.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(contract.Password)
            };

            await DatabaseContext.Users.AddAsync(user);
            await DatabaseContext.SaveChangesAsync();

            return Ok(GetToken(user));
        }

        [Authorize]
        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> Refresh()
        {
            var id = Convert.ToInt32(
                HttpContext.User.Claims
                    .Single(c => c.Type == ClaimTypes.Sid)?.Value
            );
            var user = await DatabaseContext.Users
                .FirstAsync(a => a.Id == id);
            return Ok(GetToken(user));
        }
    }
}