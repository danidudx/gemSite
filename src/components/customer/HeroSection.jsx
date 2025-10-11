export default function HeroSection() {
  return (
    <section className="relative h-96 md:h-[500px] bg-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=600&fit=crop"
        alt="Hero"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4">
        <p className="text-sm mb-2 tracking-widest">JEWELRY & GIFTS</p>
        <h2 className="text-4xl md:text-5xl font-light mb-6">
          STYLE THAT FEELS
          <br />
          TRULY YOURS
        </h2>
        <div className="flex gap-4">
          <button className="bg-white text-gray-900 px-8 py-3 hover:bg-gray-100 transition">
            SHOP ENGAGEMENT
          </button>
          <button className="bg-transparent border-2 border-white px-8 py-3 hover:bg-white hover:text-gray-900 transition">
            SHOP JEWELRY
          </button>
        </div>
      </div>
    </section>
  );
}
