using System.Threading.Tasks;
using dotnet_chat.dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        //=============================================================================REDISCACHE=============================================================================
        //Chaching temp
        private readonly ApplicationDbContext _context;
        private readonly IDistributedCache _cache;
        public ChatController(ApplicationDbContext context, IDistributedCache cache)
        {
            _context = context;
            _cache = cache;
        }
        //=============================================================================CREATEUSER=============================================================================
        //Creating user
        [HttpPost("create")]
        public async Task<ActionResult> Create(User dto)
        {
            // Check for valid nickname and password
            if (string.IsNullOrEmpty(dto.NickName) || string.IsNullOrEmpty(dto.Passwd))
            {
                return BadRequest("Nickname and Password are required.");
            }

            // Check if the user with the same nickname already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.NickName == dto.NickName);
            if (existingUser != null)
            {
                return BadRequest("User already exists.");
            }

            // Find the highest existing ID
            int newId = 1; // Default ID if no users exist
            if (await _context.Users.AnyAsync())
            {
                newId = (int)(await _context.Users.MaxAsync(u => u.Id) + 1);
            }

            // Create a new User entity with the next ID
            var newUser = new User
            {
                Id = newId,
                NickName = dto.NickName,
                Passwd = dto.Passwd,
                avatarUrl = dto.avatarUrl

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
        //=============================================================================PUSHERAPI=============================================================================
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
                    message = dto.Message,
                    avatar = dto.Avatar

                });

            return Ok(new string[] { });
        }
        //=============================================================================DELETUSER=============================================================================
        //Delete user
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            // found by id
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User does not exist.");
            }


            // User delete
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "User successfully deleted",
                DeletedUser = user
            });
        }

        //=============================================================================SEARCHFORNAME=============================================================================
        //Search for name
        [HttpPost("getname")]
        public async Task<ActionResult> GetByNickname([FromBody] User dto)
        {
            // verify if the name is gaven 
            if (string.IsNullOrEmpty(dto.NickName))
            {
                return BadRequest("Nickname of user required.");
            }

            // search for name
            var existingUser = await _context.Users
                                              .FirstOrDefaultAsync(u => u.NickName == dto.NickName);

            if (existingUser == null)
            {
                return NotFound("User not found.");
            }

            // Return user 
            return Ok(existingUser);
        }
        //=============================================================================UPDATEUSER=============================================================================
        //Update user
        [HttpPut("update/{id}")]
        public async Task<ActionResult> UpdateUser(int id, [FromBody] User user)
        {
            // Find the user by id
            var userToUpdate = await _context.Users.FindAsync(id);
            if (userToUpdate == null)
            {
                return NotFound("User not found");
            }

            // Update the user properties
            userToUpdate.NickName = user.NickName;
            

            // Save changes
            await _context.SaveChangesAsync();

            return Ok(userToUpdate);
        }

        //=============================================================================GETALL=============================================================================
        //Search for name adn passwd
        [HttpPost("getall")]
        public async Task<ActionResult> GetAll([FromBody] User dto)
        {
            if (string.IsNullOrEmpty(dto.NickName) || string.IsNullOrEmpty(dto.Passwd))
            {
                return BadRequest("Password and Nickname required");
            }
            // search for user with this name
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.NickName == dto.NickName);
            if (existingUser == null)
            {
                return BadRequest("User not found");
            }
           
            if (existingUser.Passwd != dto.Passwd)
            {
                return BadRequest("Password is incorrect");
            }

            return Ok(existingUser);
        }
        //=============================================================================GETUSER=============================================================================
        [HttpGet("getuser/{id}")]
        public async Task<ActionResult> GetUser(int id)
        {
            var existid = await _context.Users.FindAsync(id);
            if (existid == null) return NotFound("User not found by this ID");
            return Ok(existid);
        }
        //=============================================================================GETIMG=============================================================================
        [HttpGet("getimg/{id}")]
        public async Task<ActionResult> GetImg(int id)
        {
            var existuser = await _context.Users.FindAsync(id);
            if (existuser == null) return NotFound("User not found");

            if (string.IsNullOrEmpty(existuser.avatarUrl))
            {
                return Ok("User has default avatar");
            }
            return Ok(existuser.avatarUrl);
        }
        //=============================================================================EDITIMG=============================================================================
        [HttpPut("editimg/{id}")]
        public async Task<ActionResult> EditImg(int id, [FromBody] User img)
        {
            var existuser = await _context.Users.FindAsync(id);
            if (existuser == null) return NotFound("User not found");

            existuser.avatarUrl = img.avatarUrl; 

            await _context.SaveChangesAsync();

            return Ok("Avatar updated successfully");
        }


    }
}