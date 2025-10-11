export default function PearlsSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop"
            alt="Pearl Jewelry"
            className="w-full h-96 object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm mb-2 tracking-widest">PEARLS FOR HER</h3>
          <h2 className="text-4xl font-light mb-6">AKOYA PEARLS</h2>
          <button className="border-2 border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition">
            SHOP NOW
          </button>
        </div>
      </div>
    </section>
  );
}
