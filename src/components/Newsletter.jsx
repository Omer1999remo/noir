import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Newsletter() {
    const [submitted, setSubmitted] = useState(false)
    const containerRef = useScrollReveal()

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <section className="py-32 px-6 max-w-4xl mx-auto text-center" ref={containerRef}>
            <div className="reveal-up">
                <p className="text-electric text-sm tracking-widest mb-6">JOIN THE MOVEMENT</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                    GET 15% OFF<br />YOUR FIRST ORDER
                </h2>
                <p className="text-silver mb-12 max-w-lg mx-auto">
                    Subscribe for exclusive drops, early access to limited editions,
                    and insider-only content.
                </p>

                {submitted ? (
                    <p className="text-neon text-lg font-display tracking-widest animate-pulse">
                        WELCOME TO THE CLUB_
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="flex-1 bg-transparent border-b-2 border-silver/30 focus:border-electric px-0 py-4 text-cream placeholder-silver/50 outline-none transition-colors font-display text-lg"
                        />
                        <button type="submit" className="btn-primary" data-cursor="hover">
                            Subscribe
                        </button>
                    </form>
                )}
            </div>
        </section>
    )
}