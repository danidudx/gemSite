export default function WhyJwellco() {
  const features = [
    {
      title: "EXPERT GUIDANCE",
      description:
        "Get personalized advice from our jewelry experts, available 24/7",
      image:
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=300&fit=crop",
    },
    {
      title: "INTEGRITY OF SERVICE",
      description:
        "Every diamond and gemstone comes with a certificate of authenticity",
      image:
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=300&fit=crop",
    },
    {
      title: "EXCEPTIONAL VALUE",
      description:
        "High-quality jewelry at exceptional prices with transparent pricing",
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light text-center mb-12">WHY JWELLCO</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="h-48 mb-4 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
