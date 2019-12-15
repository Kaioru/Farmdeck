using System;
using System.ComponentModel.DataAnnotations;

namespace Homestead.WebAPI.Entities
{
    public class DeckIndicator
    {
        [Key] public int Id { get; set; }
        
        public Deck Deck { get; set; }

        public DeckIndicatorType Type { get; set; }
        public float Value { get; set; }

        public DateTime DateCreated { get; set; }
    }
}