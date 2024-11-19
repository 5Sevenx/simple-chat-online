using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WebApplication1.Data;
using StackExchange.Redis;

namespace dotnet_chat
{

    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Redis Setup
            string redisConnection = Configuration.GetConnectionString("Redis");
            services.AddStackExchangeRedisCache(options =>
            {
                options.Configuration = redisConnection;
            });

            var redisConfiguration = ConfigurationOptions.Parse("10.30.0.2:9537,password=Alex");
            IConnectionMultiplexer redis = null;
            try
            {
                redis = ConnectionMultiplexer.Connect(redisConfiguration);
                services.AddSingleton(redis);
            }
            catch (RedisConnectionException ex)
            {
                Console.WriteLine($"Redis Connection Error: {ex.Message}");
            }

            // MySQL DbContext Setup
            services.AddDbContext<ApplicationDbContext>(options =>
            {
                string connectionString = Configuration.GetConnectionString("DefaultConnection");
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            });

            // Adding other services
            services.AddCors();
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors(options => options
                .WithOrigins(
                    new string[]
                    {
                        "http://localhost:3000", "http://localhost:8080", "http://localhost:4200",
                        "http://localhost:5000"
                    })
                .AllowAnyHeader()
                .AllowAnyMethod()
            );

            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
