export default function PersonalizedCollection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 text-center">
            <h3 className="text-2xl font-light mb-4">
              NEW: PERSONALIZED
              <br />
              GEMSTONE COLLECTION
            </h3>
            <button className="border-2 border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition">
              SHOP NOW
            </button>
          </div>
          <div className="h-64">
            <img
              src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop"
              alt="Gemstones"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
