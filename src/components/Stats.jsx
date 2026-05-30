import { useScrollReveal } from '../hooks/useScrollReveal'

const stats = [
    { value: '50K+', label: 'Global Customers' },
    { value: '120+', label: 'Design Awards' },
    { value: '15', label: 'Countries' },
    { value: '100%', label: 'Sustainable' },
]

export default function Stats() {
    const containerRef = useScrollReveal()

    return (
        <section className="py-24 border-y border-silver/10" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {stats.map((stat, i) => (
                    <div key={i} className={`reveal-up stagger-${i}`}>
                        <p className="font-display text-4xl md:text-5xl font-bold text-electric mb-2">
                            {stat.value}
                        </p>
                        <p className="text-silver text-sm tracking-widest uppercase">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}