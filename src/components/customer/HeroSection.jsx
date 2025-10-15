export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden" style={{backgroundColor: 'var(--bg-primary)'}}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10"></div>
      
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/src/assets/1011(1).mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4" style={{color: 'var(--text-primary)'}}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium tracking-widest mb-4 bg-glass backdrop-blur-sm">
              LUXURY GEMS & JEWELRY
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6" style={{fontFamily: 'var(--font-secondary)', fontWeight: 'var(--font-thin)', lineHeight: '1.1'}}>
            <span className="block">Timeless</span>
            <span className="block text-gradient" style={{paddingBottom: '0.2em'}}>
              Elegance
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed" style={{color: 'var(--text-secondary)', fontFamily: 'var(--font-primary)'}}>
            Discover our exquisite collection of handcrafted jewelry, featuring rare gems and precious metals that tell your unique story.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-glow" style={{background: 'var(--gradient-primary)', color: 'var(--color-black)', fontFamily: 'var(--font-primary)', fontWeight: 'var(--font-semibold)'}}>
              <span className="relative z-10">Explore Collection</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'var(--gradient-primary)'}}></div>
            </button>
            
            <button className="group px-8 py-4 border-2 rounded-full font-semibold hover:scale-105 transition-all duration-300 bg-glass backdrop-blur-sm" style={{borderColor: 'var(--border-secondary)', color: 'var(--text-primary)', fontFamily: 'var(--font-primary)'}}>
              <span className="flex items-center gap-2">
                Custom Design
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
          
          <div className="mt-16 flex items-center justify-center space-x-8 text-sm" style={{color: 'var(--text-tertiary)', fontFamily: 'var(--font-primary)'}}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--color-primary)'}}></div>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--color-primary)'}}></div>
              <span>Lifetime Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{backgroundColor: 'var(--color-primary)'}}></div>
              <span>Expert Craftsmanship</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: 'var(--text-tertiary)'}}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
