import { Heart } from 'lucide-react'
import { featuredProduct } from '../data/products'
import { useCart } from '../hooks/useCart'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Spotlight({ onQuickView }) {
    const { addToCart } = useCart()
    const containerRef = useScrollReveal()

    return (
        <section className="py-32 px-6 max-w-7xl mx-auto" ref={containerRef}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Image */}
                <div className="reveal-up relative">
                    <div className="absolute -inset-4 bg-electric/20 blur-3xl rounded-full" />
                    <img
                        src={featuredProduct.image}
                        alt="Featured"
                        className="relative z-10 w-full aspect-[3/4] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-electric animate-pulse-glow" />
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-electric/10 backdrop-blur" />
                </div>

                {/* Content */}
                <div className="reveal-up stagger-1">
                    <p className="text-electric text-sm tracking-widest mb-6">FEATURED ITEM</p>
                    <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        THE OVERSIZED<br />STRUCTURED BLAZER
                    </h3>
                    <p className="text-silver text-lg mb-8 leading-relaxed">
                        {featuredProduct.description}
                    </p>

                    <div className="flex items-center gap-8 mb-8">
                        <div>
                            <p className="text-3xl font-display font-bold text-electric">
                                ${featuredProduct.price}
                            </p>
                            <p className="text-silver text-sm line-through">
                                ${featuredProduct.originalPrice}
                            </p>
                        </div>
                        <div className="h-12 w-px bg-silver/20" />
                        <div className="text-sm text-silver">
                            <p className="text-cream font-medium">Only 12 left</p>
                            <p>Sizes: XS, S, M, L, XL</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => addToCart(featuredProduct)}
                            className="btn-primary flex-1"
                            data-cursor="hover"
                        >
                            Add to Cart
                        </button>
                        <button
                            className="btn-outline px-4"
                            data-cursor="hover"
                        >
                            <Heart className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}