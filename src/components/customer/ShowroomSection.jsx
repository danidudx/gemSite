export default function ShowroomSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-gray-100 p-8 text-center">
        <h2 className="text-3xl font-light mb-4">SHOWROOMS & STORES</h2>
        <h3 className="text-4xl font-light mb-6">VISIT US IN STORE</h3>
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop"
          alt="Store"
          className="w-full h-64 object-cover mb-6"
        />
        <button className="border-2 border-gray-900 px-8 py-3 hover:bg-gray-900 hover:text-white transition">
          FIND A SHOWROOM
        </button>
      </div>
    </section>
  );
}
