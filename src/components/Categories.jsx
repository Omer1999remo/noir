import { useScrollReveal } from '../hooks/useScrollReveal'

const categories = [
    {
        id: 1,
        title: 'MENSWEAR',
        number: '01',
        image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop',
        description: 'Architectural cuts meet street sensibility'
    },
    {
        id: 2,
        title: 'WOMENSWEAR',
        number: '02',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
        description: 'Power dressing redefined for the new era'
    },
    {
        id: 3,
        title: 'ACCESSORIES',
        number: '03',
        image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1000&auto=format&fit=crop',
        description: 'Statement pieces that complete the narrative'
    }
]

export default function Categories() {
    const containerRef = useScrollReveal()

    return (
        <section id="collection" className="py-32 px-6 max-w-7xl mx-auto" ref={containerRef}>
            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                <div className="reveal-up">
                    <h2 className="font-display text-5xl md:text-7xl font-bold leading-none">
                        CURATED<br />
                        <span className="text-electric">EXCLUSIVES</span>
                    </h2>
                </div>
                <div className="reveal-up stagger-1 flex items-end">
                    <p className="text-silver text-lg leading-relaxed max-w-md">
                        Each piece is a statement. Designed in Berlin, crafted in Milan,
                        worn by those who dare to stand apart.
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((cat, i) => (
                    <div
                        key={cat.id}
                        className={`reveal-up stagger-${i + 1} group relative h-[500px] md:h-[600px] overflow-hidden cursor-none`}
                        data-cursor="hover"
                    >
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent opacity-80" />

                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <p className="text-electric text-xs tracking-widest mb-2">{cat.number}</p>
                            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">{cat.title}</h3>
                            <p className="text-silver text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {cat.description}
                            </p>
                            <span className="text-electric text-sm tracking-widest group-hover:translate-x-2 transition-transform inline-block">
                                EXPLORE →
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}