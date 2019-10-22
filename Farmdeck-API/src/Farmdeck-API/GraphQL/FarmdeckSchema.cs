using GraphQL;
using GraphQL.Types;

namespace Farmdeck_API.GraphQL
{
    public class FarmdeckSchema : Schema
    {
        public FarmdeckSchema(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<FarmdeckQuery>();
        }
    }
}