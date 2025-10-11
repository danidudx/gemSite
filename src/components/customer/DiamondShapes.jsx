export default function DiamondShapes() {
  const shapes = [
    "Round",
    "Princess",
    "Cushion",
    "Emerald",
    "Pear",
    "Oval",
    "Marquise",
    "Radiant",
    "Heart",
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="bg-gray-50 p-8">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=500&fit=crop"
            alt="Diamonds"
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-light mb-8">EXPLORE DIAMOND SHAPES</h2>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {shapes.map((shape) => (
              <div
                key={shape}
                className="text-center cursor-pointer hover:text-blue-600"
              >
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-300"></div>
                </div>
                <p className="text-xs">{shape}</p>
              </div>
            ))}
          </div>
          <button className="border-2 border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition">
            BUILD YOUR DIAMOND
          </button>
        </div>
      </div>
    </section>
  );
}
