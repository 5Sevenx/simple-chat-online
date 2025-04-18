# Project Setup

<h3>Requirements:</h3>

### 1. **Backend**  
- **Technology**: Built with **C# .NET**.  
- **Configuration**:  
  - **Redis**:  
    Add the following JSON configuration:  
    ```json
    {
      "Redis": "ip.ip.ip.ip:port,password=passwd"
    }
    ```
    In `Startup.cs`, configure Redis as follows (example from the project):  
    ```csharp
    builder.Services.AddStackExchangeRedisCache(options =>
    {
        options.Configuration = builder.Configuration.GetConnectionString("Redis");
    });
    ```

  - **Database**:  
    Add the following JSON configuration:  
    ```json
    {
      "DefaultConnection": "Server=ip.ip.ip.ip;Database=DataBaseName;Uid=root;Pwd=your_password;"
    }
    ```
    In `Startup.cs`, configure the database connection:  
    ```csharp
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    {
        string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
    });
    ```

- **Steps to Setup**:  
  - **1.** Apply migrations:  
    ```bash
    Add-Migration initial
    ```
  - **2.** Run the application:  
    ```bash
    Update-Database
    ```

      ### Example Configuration File (`appsettings.json`):  
      ```json
      {
        "ConnectionStrings": {
          "Redis": "ip.ip.ip.ip:port,password=passwd",
          "DefaultConnection": "Server=ip.ip.ip.ip;Database=DataBaseName;Uid=root;Pwd=your_password;"
        },
        "Logging": {
          "LogLevel": {
            "Default": "Information",
            "Microsoft.AspNetCore": "Warning"
          }
        },
        "AllowedHosts": "*"
      }
      ```
---

### 2. **Frontend**  
- **Technology**: Developed using **Angular**.  
- **Steps to Setup**:  
  - **1.** Clone the frontend repository.
  - **2.** Install dependencies using:
    ```bash
    npm install
    ```
  - **3.** Run the development server with:
    ```bash
    ng serve
    ```
  - **4.** Open the application in your browser at:
    `http://localhost:4200`.

---

### 3. **Redis**  
- **Technology**: Provides caching memory.  
- **Steps to Setup**:  
  - **1.** Install **WSL** via **CLI** (This step is not required if you are on Linux).
  - **2.** Register on Redis and create an account associated with a server.
  - **3.** Run the development server with the following command:
    ```bash
    redis-cli -h ip.ip.ip.ip -p port -a passwd
    ```

---
### 4. **Pusher**  
- **Technology**: Provides real-time communication service between users.  
- **Documentation**: [Pusher](https://pusher.com/).
---



> [!IMPORTANT]
> <h2>Packages needed</h2>

- **Microsoft.EntityFrameworkCore**  ```V:8.0.7```
- **Microsoft.EntityFrameworkCore.Tools** ```V:8.0.7```
- **Microsoft.Extensions.Caching.StackExchangeRedis** ```V:9.0.0```
- **StackExchange.Redis** ```V:2.8.16```
- **Pomelo.EntityFrameworkCore.MySql** ```V:8.0.2```
- **Swashbuckle.AspNetCore** ```V:7.0.0```
- **Newtonsoft.Json** ```V:13.0.3```
- **PusherServer** ```V:5.0.0```

---

> [!Warning]
> All Microsoft packages must be below version 9. If they are not, they could cause errors in the code.

---

> [!TIP]
> I've always had my own abbreviations that are easier for me to use to mark something. I'll include the meaning for each abbreviation I've used here.
> 
> 1.**Ss** - Snapshot State
> 
> 2.**W** - Worknig
>
> 3.**Wn** - Not working
>
> 4.**fF** - Full functionality
>
> 5.**Ctd** - Completed
>
> 6.**CtdF** - Full completed

---

> [!NOTE]
> The group chat version `[fF/CtdF]`:
> 
> [Groupchat](https://github.com/21Sec0nds/simple-chat-online/tree/Public-chat)

