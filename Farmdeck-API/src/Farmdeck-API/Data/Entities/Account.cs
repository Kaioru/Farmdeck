using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Farmdeck_API.Data.Entities
{
    public class Account : IEntity
    {
        public int ID { get; set; }

        [Required] public string Username { get; set; }
        [Required] public string Password { get; set; }

        public ICollection<Deck> Decks { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}