import { ArrowDown } from 'lucide-react'

export default function Hero() {
    const scrollToCollection = () => {
        document.getElementById('collection').scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop"
                    alt="Fashion"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-noir via-transparent to-noir" />
            </div>

            {/* Scan lines */}
            <div className="diagonal-line top-1/3" />
            <div className="diagonal-line top-2/3" style={{ animationDelay: '1.5s' }} />

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
                <p className="reveal-up text-electric text-sm tracking-[0.3em] uppercase mb-6 font-medium">
                    A/W 2026 Collection
                </p>

                <h1 className="reveal-up stagger-1 font-display text-6xl md:text-8xl lg:text-[10rem] font-bold mb-8 leading-[0.85] tracking-tighter glitch-text" data-text="DEFY">
                    DEFY<br />
                    <span className="outline-text">CONFORMITY</span>
                </h1>

                <p className="reveal-up stagger-2 text-silver text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                    Where brutalist architecture meets fluid fashion.
                    Unapologetically bold silhouettes for the modern provocateur.
                </p>

                <div className="reveal-up stagger-3 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={scrollToCollection}
                        className="btn-primary"
                        data-cursor="hover"
                    >
                        Explore Collection
                    </button>
                    <button className="btn-outline" data-cursor="hover">
                        View Lookbook
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
                <ArrowDown className="w-6 h-6 text-electric" />
            </div>
        </section>
    )
}