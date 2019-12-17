using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Farmdeck_API.Contracts;
using Farmdeck_API.Data;
using Farmdeck_API.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Farmdeck_API.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : Controller
    {
        private IServiceProvider _provider;
        private IConfiguration _configuration;

        public AuthController(IServiceProvider provider, IConfiguration configuration)
        {
            _provider = provider;
            _configuration = configuration.GetSection("Token");
        }

        private TokenContract GetToken(Account account)
        {
            var signingKey = Convert.FromBase64String(_configuration.GetValue<string>("Key"));
            var expiryDuration = _configuration.GetValue<int>("Expiry");
            var now = DateTime.UtcNow;
            var expire = now.AddMinutes(expiryDuration);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration.GetValue<string>("Issuer"),
                Audience = _configuration.GetValue<string>("Audience"),
                IssuedAt = now,
                NotBefore = now,
                Expires = expire,
                Subject = new ClaimsIdentity(new List<Claim>
                {
                    new Claim(ClaimTypes.Name, account.ID.ToString())
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
            await using var store = _provider.GetService<FarmdeckDbContext>();
            var account = await store
                .Accounts
                .FirstOrDefaultAsync(a => a.Username == contract.Username);

            if (account == null || !BCrypt.Net.BCrypt.Verify(contract.Password, account.Password))
                return Unauthorized("Failed to authenticate");

            return Ok(GetToken(account));
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterContract contract)
        {
            await using var store = _provider.GetService<FarmdeckDbContext>();
            var account = await store
                .Accounts
                .FirstOrDefaultAsync(a => a.Username == contract.Username);

            if (account != null)
                return Unauthorized("Account already exists");

            account = new Account
            {
                Username = contract.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(contract.Password)
            };

            store.Accounts.Add(account);
            store.SaveChanges();

            return Ok(GetToken(account));
        }

        [Authorize]
        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> Refresh()
        {
            await using var store = _provider.GetService<FarmdeckDbContext>();
            var accountID = Convert.ToInt32(
                HttpContext.User.Claims
                    .Single(c => c.Type == ClaimTypes.Name)?.Value
            );
            var account = await store
                .Accounts
                .FirstAsync(a => a.ID == accountID);
            return Ok(GetToken(account));
        }
    }
}