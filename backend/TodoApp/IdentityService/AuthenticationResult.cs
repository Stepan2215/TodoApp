using System;
using System.Collections.Generic;

namespace TodoApp.IdentityService
{
    public abstract class AuthenticationResult
    {
        public string Token { get; set; }
        public bool Result { get; set; }
        public List<string> Errors { get; set; }
    }
}
