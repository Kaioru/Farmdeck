using System;

namespace Farmdeck_API.Entities
{
    public class Indicator : IEntity
    {
        public int ID { get; set; }

        public IndicatorType Type { get; set; }
        public float Value { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}