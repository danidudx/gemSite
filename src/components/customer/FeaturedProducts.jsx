import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      name: "Engagement Rings",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
      category: "Engagement",
      price: "Starting at $500",
    },
    {
      id: 2,
      name: "Wedding Rings",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop",
      category: "Wedding",
      price: "Starting at $300",
    },
    {
      id: 3,
      name: "Diamonds",
      image:
        "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=400&h=400&fit=crop",
      category: "Diamonds",
      price: "Starting at $200",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
