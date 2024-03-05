namespace API.Entities
{
    //store Product with defined properties
    public class Product
    {
        //each of these will be column in table
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string PictureUrl { get; set; }
        public string Type { get; set; }
        public int LengthOverall { get; set; }
        public int QuantityInStock { get; set; }
    }
}