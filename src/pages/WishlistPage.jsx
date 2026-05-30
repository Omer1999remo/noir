import { Link } from 'react-router-dom'
import { Heart, Plus, Trash2 } from 'lucide-react'
import { useWishlist } from '../hooks/useWishlist'
import { useCart } from '../hooks/useCart'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const containerRef = useScrollReveal()

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div ref={containerRef}>
        <div className="reveal-up mb-12">
          <p className="text-electric text-sm tracking-widest mb-4">SAVED</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold">
            WISHLIST_
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="reveal-up stagger-1 text-center py-24">
            <Heart className="w-16 h-16 mx-auto mb-6 text-silver/30" />
            <h2 className="font-display text-2xl font-bold mb-4">YOUR WISHLIST IS EMPTY</h2>
            <p className="text-silver mb-8">Save your favorite items for later.</p>
            <Link to="/shop" className="btn-primary" data-cursor="hover">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product, i) => (
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

                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-noir/80 flex items-center justify-center hover:bg-electric hover:text-noir transition-colors opacity-0 group-hover:opacity-100"
                    data-cursor="hover"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

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
        )}
      </div>
    </div>
  )
}
