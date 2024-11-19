using System.Threading.Tasks;
using dotnet_chat.dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using PusherServer;
using WebApplication1.Data;
using WebApplication1.dtos;

namespace dotnet_chat.Controllers
{
    [Route("api")]
    [ApiController]
    public class ChatController : Controller
    {
        //Chaching temp
        private readonly ApplicationDbContext _context;
        private readonly IDistributedCache _cache;
        public ChatController(ApplicationDbContext context, IDistributedCache cache)
        {
            _context = context;
            _cache = cache;
        }
        //Chaching temp

        //Creating user
        [HttpPut("update")]
        public async Task<ActionResult> Update(User dto)
        {
            // Check for valid nickname and password
            if (string.IsNullOrEmpty(dto.NickName) || string.IsNullOrEmpty(dto.Passwd))
            {
                return BadRequest("Nickname and Password are required.");
            }
            // Create a new User entity
            var newUser = new User
            {
                NickName = dto.NickName,
                Passwd = dto.Passwd
            };
            // Add the user to the database
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            // Cache the user data (serialize it to JSON)
            var userJson = JsonConvert.SerializeObject(newUser);
            await _cache.SetStringAsync($"User_{newUser.Id}", userJson);
            // Return the response with cached user
            return Ok(new
            {
                Message = "User successfully created",
                User = newUser
            });
        }


        //Messages sender + API
        [HttpPost("messages")]
        public async Task<ActionResult> Message(MessageDTO dto)
        {
            var options = new PusherOptions
            {
                Cluster = "eu",
                Encrypted = true
            };

            var pusher = new Pusher(
                "1897639",
                "de0d85dfc195bed6c21c",
                "ffb71c2ffea8dd12c287",
                options);

            await pusher.TriggerAsync(
                "chat",
                "message",
                new
                {
                    username = dto.Username,
                    message = dto.Message
                });

            return Ok(new string[] { });
        }
    }
}