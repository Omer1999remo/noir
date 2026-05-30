import { useState, useEffect, useRef } from 'react'
import { Search, X, ArrowUpRight } from 'lucide-react'
import { products } from '../data/products'

const trendingSearches = [
    'Oversized Blazers',
    'Cargo Pants',
    'Tech Wear',
    'Limited Edition'
]

export default function SearchOverlay({ isOpen, onClose, onQuickView }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const inputRef = useRef(null)

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 300)
        }
    }, [isOpen])

    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            return
        }

        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
    }, [query])

    const quickSearch = (term) => {
        setQuery(term)
    }

    return (
        <div className={`search-overlay ${isOpen ? 'active' : ''}`}>
            <button
                onClick={onClose}
                className="absolute top-8 right-8 p-4 hover:text-electric transition-colors"
                data-cursor="hover"
            >
                <X className="w-8 h-8" />
            </button>

            <div className="flex-1 flex flex-col justify-center px-6 md:px-20 max-w-5xl mx-auto w-full pt-32">
                <div className="relative mb-12">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search products..."
                        className="search-input-dark"
                    />
                    <Search className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 text-silver/50" />
                </div>

                {results.length > 0 ? (
                    <div className="space-y-4 max-h-[50vh] overflow-y-auto custom-scrollbar">
                        <p className="text-silver/50 text-xs tracking-widest uppercase mb-4">
                            {results.length} Results
                        </p>
                        {results.map(product => (
                            <div
                                key={product.id}
                                onClick={() => onQuickView(product)}
                                className="flex gap-4 p-4 border border-silver/10 hover:border-electric transition-colors cursor-pointer group"
                            >
                                <img src={product.image} className="w-24 h-24 object-cover grayscale group-hover:grayscale-0 transition-all" />
                                <div className="flex-1">
                                    <h4 className="font-display font-bold mb-1 group-hover:text-electric transition-colors">
                                        {product.name}
                                    </h4>
                                    <p className="text-silver text-xs mb-2">{product.category}</p>
                                    <p className="text-electric font-bold">${product.price}</p>
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-silver/30 group-hover:text-electric transition-colors" />
                            </div>
                        ))}
                    </div>
                ) : query ? (
                    <div className="text-center py-12 text-silver/50">
                        <p className="font-display text-lg">No results found</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div>
                            <p className="text-silver/50 text-xs tracking-widest uppercase mb-4">Trending Now</p>
                            <div className="flex flex-wrap gap-3">
                                {trendingSearches.map(term => (
                                    <button
                                        key={term}
                                        onClick={() => quickSearch(term)}
                                        className="px-6 py-3 border border-silver/20 text-cream hover:border-electric hover:text-electric transition-all text-sm tracking-wider"
                                        data-cursor="hover"
                                    >
                                        {term.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-auto pb-12 text-center">
                    <p className="text-silver/30 text-sm">
                        Press <span className="text-electric">ESC</span> to close
                    </p>
                </div>
            </div>
        </div>
    )
}