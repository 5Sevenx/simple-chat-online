using Microsoft.EntityFrameworkCore;
using WebApplication1.dtos;
using System.Collections.Generic;
using System;

namespace WebApplication1.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}