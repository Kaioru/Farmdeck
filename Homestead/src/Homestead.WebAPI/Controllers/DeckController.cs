using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Homestead.WebAPI.Entities.Context;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MQTTnet.Server;

namespace Homestead.WebAPI.Controllers
{
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
        [HttpPost]
        [Route("{id}/toggle")]
        public async Task<IActionResult> ToggleComponent(Guid id, string type, int state)
        {
            var userId = Convert.ToInt32(
                HttpContext.User.Claims
                    .Single(c => c.Type == ClaimTypes.Sid)?.Value
            );
            await _context.Decks.FirstAsync(d => d.User.Id == userId);
            await _server.PublishAsync(id.ToString(), type + "-" + state);
            return Ok();
        }
    }
}