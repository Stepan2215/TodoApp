using System;
using System.ComponentModel.DataAnnotations;

namespace TodoApp.IdentityService
{
    public class UserLoginRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
