import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, ArrowLeft, ArrowRight } from 'lucide-react'
import { getProducts } from '../lib/supabase'
import { useCart } from '../hooks/useCart'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function Arrivals() {
    const { addToCart } = useCart()
    const [products, setProducts] = useState([])
    const scrollRef = useRef(null)
    const headerRef = useScrollReveal()

    useEffect(() => {
        loadProducts()
    }, [])

    async function loadProducts() {
        const data = await getProducts()
        console.log('Loaded products:', data)
        setProducts(data)
    }

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction * 400, behavior: 'smooth' })
        }
    }

    return (
        <section id="arrivals" className="py-32 bg-charcoal">
            {/* Header */}
            <div className="px-6 max-w-7xl mx-auto mb-12 flex justify-between items-end" ref={headerRef}>
                <div className="reveal-up">
                    <p className="text-electric text-sm tracking-widest mb-4">NEW DROP</p>
                    <h2 className="font-display text-4xl md:text-6xl font-bold">ARRIVALS_</h2>
                </div>
                <div className="hidden md:flex gap-4 reveal-up stagger-1">
                    <button
                        onClick={() => scroll(-1)}
                        className="p-3 border border-silver/20 hover:border-electric transition-colors"
                        data-cursor="hover"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll(1)}
                        className="p-3 border border-silver/20 hover:border-electric transition-colors"
                        data-cursor="hover"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Horizontal scroll */}
            <div
                ref={scrollRef}
                className="horizontal-scroll px-6 max-w-7xl mx-auto"
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="scroll-card product-card group cursor-none"
                        data-cursor="hover"
                    >
                        <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-noir">
                            <Link to={`/product/${product.slug}`}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                />
                            </Link>
                            {product.tag && (
                                <span className="absolute top-4 left-4 bg-electric text-noir text-xs font-bold px-3 py-1 tracking-widest">
                                    {product.tag}
                                </span>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-60" />

                            <button
                                onClick={() => addToCart(product)}
                                className="absolute bottom-4 right-4 w-12 h-12 bg-electric text-noir flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                                data-cursor="hover"
                            >
                                <Plus className="w-6 h-6" />
                            </button>
                        </div>

                        <Link to={`/product/${product.slug}`}>
                            <h3 className="font-display text-xl font-bold mb-1 group-hover:text-electric transition-colors">
                                {product.name}
                            </h3>
                        </Link>
                        <p className="text-silver text-sm mb-2">{product.category}</p>
                        <p className="text-electric font-bold">${product.price}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}