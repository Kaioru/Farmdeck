using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Homestead.WebAPI.Entities
{
    public class User
    {
        [Key] public int Id { get; set; }

        public string DisplayName { get; set; }
        public string DisplayPicture { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }

        public ICollection<Deck> Decks { get; set; }
    }
}