using System;
using System.ComponentModel.DataAnnotations;

namespace Homestead.WebAPI.Contracts
{
    public class DeckCreationContract
    {
        [Required] public Guid Guid { get; set; }
        [Required] public string Name { get; set; }
    }
}