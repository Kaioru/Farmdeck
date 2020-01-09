using System;
using System.ComponentModel.DataAnnotations;
using Homestead.WebAPI.Entities;

namespace Homestead.WebAPI.Contracts
{
    public class DeckIndicatorContract
    {
        [Required] public DeckIndicatorType Type { get; set; }
        [Required] public float Value { get; set; }
        [Required] public DateTime DateCreated { get; set; }
    }
}