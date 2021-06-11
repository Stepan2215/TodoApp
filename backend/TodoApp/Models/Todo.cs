using System;
namespace TodoApp.Models
{
    public class Todo
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int DueIn { get; set; }

        public DateTime DueDate { get; set; }

        public bool IsDone { get; set; }

        public string Email { get; set; }
    }
}