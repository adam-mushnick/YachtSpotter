//class for shopping cart basket, iteracts with DB
namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; } //basket Id
        public string BuyerId { get; set; }
        //initialize empty list of BasketItems
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        //add item to basket
        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
                return;
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        //remove quantity of item from basket
        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }

    }
}