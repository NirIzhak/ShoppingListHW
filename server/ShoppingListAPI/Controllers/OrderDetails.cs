using Newtonsoft.Json.Linq;

namespace ShoppingListAPI.Controllers
{
    public class OrderDetails
    {
        public string UserName { get; set; }
        public string Address { get; set; }
        public string Mail { get; set; }
        public JArray Items { get; set; }
    }


}
