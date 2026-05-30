import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Filter, Heart, Plus, X } from 'lucide-react'
import { getProducts } from '../lib/supabase'
import { useCart } from '../hooks/useCart'
import { useWishlist } from '../hooks/useWishlist'
import { useScrollReveal } from '../hooks/useScrollReveal'

const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Knitwear', 'Footwear', 'Accessories']

export default function ShopPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const containerRef = useScrollReveal()

  useEffect(() => {
    loadProducts()
  }, [selectedCategory, sortBy])

  async function loadProducts() {
    setLoading(true)
    const category = selectedCategory === 'All' ? null : selectedCategory
    let data = await getProducts({ category })

    if (sortBy === 'price-low') {
      data = [...data].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      data = [...data].sort((a, b) => b.price - a.price)
    }

    setProducts(data)
    setLoading(false)
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div ref={containerRef}>
        <div className="reveal-up mb-12">
          <p className="text-electric text-sm tracking-widest mb-4">COLLECTION</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold">
            ALL PRODUCTS_
          </h1>
        </div>

        <div className="reveal-up stagger-1 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <p className="text-silver">{products.length} items</p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-silver/20 hover:border-electric transition-colors md:hidden"
              data-cursor="hover"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-silver/20 px-4 py-2 text-sm focus:border-electric outline-none cursor-none"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className={`md:flex gap-4 mb-8 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-electric text-noir font-bold'
                    : 'border border-silver/20 hover:border-electric'
                }`}
                data-cursor="hover"
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-electric border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div
                key={product.id}
                className={`reveal-up stagger-${(i % 4) + 1} product-card group cursor-none`}
                data-cursor="hover"
              >
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-charcoal">
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

                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`w-10 h-10 flex items-center justify-center transition-colors ${
                        isInWishlist(product.id)
                          ? 'bg-electric text-noir'
                          : 'bg-noir/80 text-cream hover:text-electric'
                      }`}
                      data-cursor="hover"
                    >
                      <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

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
                <div className="flex items-center gap-2">
                  <p className="text-electric font-bold">${product.price}</p>
                  {product.original_price && (
                    <p className="text-silver/50 line-through text-sm">${product.original_price}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
