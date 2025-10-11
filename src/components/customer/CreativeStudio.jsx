export default function CreativeStudio() {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-light mb-4">CREATIVE STUDIO</h2>
            <h3 className="text-4xl font-light mb-6">TAILOR-MADE BY YOU</h3>
            <p className="mb-6 text-gray-300">
              From classic bands to modern statement rings, we've created a
              curated collection of customizable jewelry so you can craft pieces
              that are uniquely yours at any price point.
            </p>
            <button className="border-2 border-white px-8 py-3 hover:bg-white hover:text-gray-900 transition">
              CREATE MY RING
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=300&fit=crop"
              alt="Ring 1"
              className="w-full h-48 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=300&fit=crop"
              alt="Ring 2"
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
