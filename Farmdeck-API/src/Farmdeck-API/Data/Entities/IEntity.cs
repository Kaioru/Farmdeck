using System;

namespace Farmdeck_API.Data.Entities
{
    public interface IEntity
    {
        DateTime DateCreated { get; set; }
        DateTime DateUpdated { get; set; }
    }
}