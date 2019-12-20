using System.ComponentModel.DataAnnotations;

namespace Homestead.WebAPI.Contracts
{
    public class DeckToggleContract
    {
        [Required] public string Type { get; set; }
        [Required] public int State { get; set; }
    }
}