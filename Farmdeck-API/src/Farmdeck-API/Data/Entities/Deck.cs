using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Farmdeck_API.Data.Entities
{
    public class Deck : IEntity
    {
        public int ID { get; set; }

        [Required] public Guid Token { get; set; }
        [Required] public Account Account { get; set; }

        public ICollection<Indicator> Indicators { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}