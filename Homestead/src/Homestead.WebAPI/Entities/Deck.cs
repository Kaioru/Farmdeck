using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Homestead.WebAPI.Entities
{
    public class Deck
    {
        [Key] public Guid Id { get; set; }

        public User User { get; set; }

        public string Name { get; set; }
        public ICollection<DeckIndicator> Indicators { get; set; }

        public DateTime DateCreated { get; set; }
    }
}