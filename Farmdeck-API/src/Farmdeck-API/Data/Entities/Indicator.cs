using System;

namespace Farmdeck_API.Data.Entities
{
    public class Indicator : IEntity
    {
        public int ID { get; set; }

        public IndicatorType Type { get; set; }
        public float Value { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }

        public Indicator()
        {
            var now = DateTime.UtcNow;

            DateCreated = now;
            DateUpdated = now;
        }
    }
}