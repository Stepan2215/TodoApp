﻿using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TodoApp.Models;

namespace TodoApp.Data
{
    public class ApiDbContext : IdentityDbContext
    {
        public virtual DbSet<Todo> Items { get; set; }

        public ApiDbContext(DbContextOptions<ApiDbContext> options)
         : base(options)
        {

        }
    }

}
