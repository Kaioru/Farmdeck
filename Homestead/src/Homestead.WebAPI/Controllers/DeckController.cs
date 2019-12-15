using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Homestead.WebAPI.Contracts;
using Homestead.WebAPI.Entities;
using Homestead.WebAPI.Entities.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MQTTnet.Server;

namespace Homestead.WebAPI.Controllers
{
    [ApiController]
    [Route("decks")]
    public class DeckController : Controller
    {
        private IMqttServer _server;
        private DatabaseContext _context;

        public DeckController(IMqttServer server, DatabaseContext context)
        {
            _server = server;
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> Index()
        {
            var userId = Convert.ToInt32(
                HttpContext.User.Claims
                    .Single(c => c.Type == ClaimTypes.Sid)?.Value
            );
            var res = _context.Decks.Where(d => d.User.Id == userId);
            return Ok(res);
        }

        [Authorize]
        [HttpPost]
        [Route("")]
        public async Task<IActionResult> Create(DeckCreationContract contract)
        {
            var userId = Convert.ToInt32(
                HttpContext.User.Claims
                    .Single(c => c.Type == ClaimTypes.Sid)?.Value
            );
            var user = await _context.Users.FirstAsync(u => u.Id == userId);
            var guid = contract.Guid;

            if (await _context.Decks.CountAsync(d => d.Id == guid) != 0) return Forbid();

            var deck = new Deck
            {
                Id = guid,
                Name = contract.Name,
                DateCreated = DateTime.UtcNow,
                User = user
            };

            await _context.Decks.AddAsync(deck);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [Authorize]
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> Get(Guid id)
        {
            var userId = Convert.ToInt32(
                HttpContext.User.Claims
                    .Single(c => c.Type == ClaimTypes.Sid)?.Value
            );
            var deck = await _context.Decks.FirstAsync(d => d.Id == id && d.User.Id == userId);
            return Ok(deck);
        }

        [Authorize]
        [HttpPost]
        [Route("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userId = Convert.ToInt32(
                HttpContext.User.Claims
                    .Single(c => c.Type == ClaimTypes.Sid)?.Value
            );
            var deck = await _context.Decks.FirstAsync(d => d.Id == id && d.User.Id == userId);

            _context.Decks.Remove(deck);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpPost]
        [Route("{id}/toggle")]
        public async Task<IActionResult> ToggleComponent(Guid id, string type, int state)
        {
            var userId = Convert.ToInt32(
                HttpContext.User.Claims
                    .Single(c => c.Type == ClaimTypes.Sid)?.Value
            );
            await _context.Decks.FirstAsync(d => d.Id == id && d.User.Id == userId);
            await _server.PublishAsync(id.ToString(), type + "-" + state);
            return Ok();
        }
    }
}