using API.Entities;

namespace API.Data
{
    //populates db with products
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {


            //if there are ANY products, quit
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                // Sailing Yachts
                new Product { Name = "The Wind Whisperer", Description = "A sleek sailing yacht designed for those who love the thrill of harnessing the wind. Perfect for a serene sail or a competitive race.", Price = 2200000, PictureUrl = "/images/products/sailing-yacht-wind-whisperer.png", LengthOverall = 40, Type = "Sailing Yacht", QuantityInStock = 4 },
                new Product { Name = "The Sea Nomad", Description = "Designed for adventurers, The Sea Nomad is a robust sailing yacht ready to take you on long voyages across the oceans.", Price = 1800000, PictureUrl = "/images/products/sailing-yacht-sea-nomad.png", LengthOverall = 45, Type = "Sailing Yacht", QuantityInStock = 3 },
                
                // Motor Yachts
                new Product { Name = "The Ocean Sprinter", Description = "A powerful motor yacht built for speed and luxury. Experience the thrill of high-speed cruising in total comfort.", Price = 3000000, PictureUrl = "/images/products/motor-yacht-ocean-sprinter.png", LengthOverall = 50, Type = "Motor Yacht", QuantityInStock = 5 },
                new Product { Name = "The Voyager Elite", Description = "A state-of-the-art motor yacht that combines luxury and performance. The Voyager Elite is your floating palace.", Price = 4500000, PictureUrl = "/images/products/motor-yacht-voyager-elite.png", LengthOverall = 55, Type = "Motor Yacht", QuantityInStock = 2 },
                
                // Gulet Yachts
                new Product { Name = "The Aegean Queen", Description = "A traditional Gulet yacht with modern amenities. Perfect for a leisurely cruise along the coast with family and friends.", Price = 1600000, PictureUrl = "/images/products/gulet-yacht-aegean-queen.png", LengthOverall = 70, Type = "Gulet Yacht", QuantityInStock = 5 },
                new Product { Name = "The Mediterranean Spirit", Description = "Blending tradition with innovation, The Mediterranean Spirit is a Gulet yacht designed for unforgettable sailing experiences.", Price = 2500000, PictureUrl = "/images/products/gulet-yacht-mediterranean-spirit.png", LengthOverall = 65, Type = "Gulet Yacht", QuantityInStock = 4 },
                
                // Open, Cruiser, Cabin Cruiser, Express Cruiser Yachts
                new Product { Name = "The Sunset Chaser", Description = "An open yacht designed for those who seek adventure and leisure. Ideal for day trips and sun-soaked gatherings.", Price = 950000, PictureUrl = "/images/products/open-yacht-sunset-chaser.png", LengthOverall = 30, Type = "Open Yacht", QuantityInStock = 3 },
                new Product { Name = "The Coastal Voyager", Description = "A cruiser yacht that combines comfort and durability. Explore the coastline with ease and style.", Price = 1100000, PictureUrl = "/images/products/cruiser-yacht-coastal-voyager.png", LengthOverall = 35, Type = "Cruiser", QuantityInStock = 5 },
                
                // Luxury Yachts
                new Product { Name = "The Opulent Odyssey", Description = "A luxury yacht that redefines opulence with its sumptuous interiors and state-of-the-art technology.", Price = 7000000, PictureUrl = "/images/products/luxury-yacht-opulent-odyssey.png", LengthOverall = 80, Type = "Luxury Yacht", QuantityInStock = 2 },
                new Product { Name = "The Regal Realm", Description = "The pinnacle of luxury, The Regal Realm is designed for those who demand nothing but the best.", Price = 8500000, PictureUrl = "/images/products/luxury-yacht-regal-realm.png", LengthOverall = 90, Type = "Luxury Yacht", QuantityInStock = 1 },

                // Sports Yachts
                new Product { Name = "The Speed Demon", Description = "A sports yacht built for speed. Equipped with powerful motors for adrenaline-pumping adventures.", Price = 3200000, PictureUrl = "/images/products/sports-yacht-speed-demon.png", LengthOverall = 55, Type = "Sports Yacht", QuantityInStock = 5 },
                new Product { Name = "The Aquatic Arrow", Description = "Sleek design and high performance make The Aquatic Arrow the ideal choice for water sports enthusiasts.", Price = 2800000, PictureUrl = "/images/products/sports-yacht-aquatic-arrow.png", LengthOverall = 50, Type = "Sports Yacht", QuantityInStock = 4 },
                
                // Catamaran Yachts
                new Product { Name = "The Twin Tide", Description = "A catamaran yacht that offers stability and space, perfect for those seeking comfort and safety on the water.", Price = 2400000, PictureUrl = "/images/products/catamaran-yacht-twin-tide.png", LengthOverall = 42, Type = "Catamaran Yacht", QuantityInStock = 5 },
                new Product { Name = "The Sea Siamese", Description = "Combining speed and luxury, The Sea Siamese is a fiberglass catamaran yacht designed for optimal performance.", Price = 2600000, PictureUrl = "/images/products/catamaran-yacht-sea-siamese.png", LengthOverall = 45, Type = "Catamaran Yacht", QuantityInStock = 3 },

                // Additional Yacht Types
                new Product { Name = "The Oceanic Opus", Description = "A masterpiece of naval engineering, this yacht offers an unmatched sailing experience.", Price = 9500000, PictureUrl = "/images/products/luxury-sailing-yacht-oceanic-opus.png", LengthOverall = 100, Type = "Luxury Sailing Yacht", QuantityInStock = 2 },
                new Product { Name = "The Nautical Nirvana", Description = "For those who seek tranquility and luxury on the sea, The Nautical Nirvana provides an unparalleled escape.", Price = 6000000, PictureUrl = "/images/products/luxury-motor-yacht-nautical-nirvana.png", LengthOverall = 85, Type = "Luxury Motor Yacht", QuantityInStock = 3 },
                new Product { Name = "The Celestial Sailor", Description = "Navigate the stars with this state-of-the-art sailing yacht, featuring advanced navigation systems.", Price = 4000000, PictureUrl = "/images/products/sailing-yacht-celestial-sailor.png", LengthOverall = 60, Type = "Sailing Yacht", QuantityInStock = 5 },
                new Product { Name = "The Voyager's Vessel", Description = "A yacht designed for long voyages, offering robust performance and luxurious accommodations.", Price = 5100000, PictureUrl = "/images/products/motor-yacht-voyagers-vessel.png", LengthOverall = 70, Type = "Motor Yacht", QuantityInStock = 2 },
                new Product { Name = "The Gulet Gala", Description = "Experience the fusion of tradition and comfort with this beautifully designed Gulet yacht.", Price = 3000000, PictureUrl = "/images/products/gulet-yacht-gulet-gala.png", LengthOverall = 75, Type = "Gulet Yacht", QuantityInStock = 4 },
                new Product { Name = "The Cruiser's Choice", Description = "A versatile cruiser yacht that is as comfortable as it is capable, ideal for both day trips and longer journeys.", Price = 1200000, PictureUrl = "/images/products/cruiser-yacht-cruisers-choice.png", LengthOverall = 40, Type = "Cruiser", QuantityInStock = 3 },
                new Product { Name = "The Sportive Sprinter", Description = "A sports motor yacht designed for those who live for the thrill of high-speed cruising.", Price = 3500000, PictureUrl = "/images/products/sports-motor-yacht-sportive-sprinter.png", LengthOverall = 60, Type = "Sports Motor Yacht", QuantityInStock = 5 },
                new Product { Name = "The Dual Dream", Description = "A catamaran yacht that epitomizes the dream of luxurious and stable sailing, perfect for exotic adventures.", Price = 2700000, PictureUrl = "/images/products/catamaran-yacht-dual-dream.png", LengthOverall = 48, Type = "Catamaran Yacht", QuantityInStock = 4 },
            };

            //add photos based on name of photo
            int yachtImageNumber = 1; // Start from yacht1
            foreach (var product in products)
            {
                product.PictureUrl = $"/images/products/yacht{yachtImageNumber}.jpg";
                yachtImageNumber++;
                if (yachtImageNumber > 7) yachtImageNumber = 1; // Reset to yacht1 after yacht7
            }

            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }
    }
}