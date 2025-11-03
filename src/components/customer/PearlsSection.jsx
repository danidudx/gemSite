export default function PearlsSection() {
  const gemstones = [
    {
      name: "Green Emerald",
      image: "https://images.unsplash.com/photo-1605100804768-50e0b8d1e5a9?w=400&h=400&fit=crop"
    },
    {
      name: "Golden Topaz",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d3655e?w=400&h=400&fit=crop"
    },
    {
      name: "Blue Lapis",
      image: "https://images.unsplash.com/photo-1603561596112-c28dd9dffaf6?w=400&h=400&fit=crop"
    },
    {
      name: "Red Garnet",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1748529415102-d53cb0ca16dd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332")',
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm md:text-base uppercase tracking-widest mb-4 font-sans text-white/80">
          BEAUTIFUL RARE GEMSTONES
        </p>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 text-white" style={{ fontFamily: 'serif' }}>
          Joyful Jewelry Shared For Generations!
        </h2>
        
        <p className="text-base md:text-lg max-w-3xl mx-auto mb-12 leading-relaxed text-white/90" style={{ fontFamily: 'serif' }}>
          Embrace love and beauty with our unique and genuine silver jewelry. We focus on quality from choosing colors to crafting details, we rest at nothing but the best.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {gemstones.map((gemstone, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 mb-4 relative rounded-full bg-gray-100 p-2 shadow-lg overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src={gemstone.image}
                    alt={gemstone.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-base md:text-lg text-white" style={{ fontFamily: 'serif' }}>
                {gemstone.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
